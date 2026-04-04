import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAddLine, RiSearchLine } from 'react-icons/ri';
import DataTable from '../../components/table/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { useToast } from '../../contexts/ToastContext';
import { deleteSkill, getSkills } from '../../services/skillService';

const AllSkills = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadSkills = useCallback(async () => {
    setLoading(true);
    try {
      setSkills(await getSkills());
    } catch (error) {
      toast(error.message || 'Failed to load skills', 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return skills;
    return skills.filter((skill) => [skill.title, skill.para, ...(skill.points || [])].some((value) => value?.toLowerCase().includes(query)));
  }, [search, skills]);

  const confirmDelete = async () => {
    if (!selected) return;
    setDeleting(true);
    try {
      await deleteSkill(selected.id);
      setSelected(null);
      toast('Skill removed', 'success');
      await loadSkills();
    } catch (error) {
      toast(error.message || 'Failed to delete skill', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade-up">
      <div className="page-header"><div><h1 className="page-title">Skills</h1><p className="page-subtitle">{skills.length} skill{skills.length === 1 ? '' : 's'} in your stack</p></div><Button onClick={() => navigate('/skills/add')} icon={<RiAddLine />}>Add Skill</Button></div>
      <div style={{ position: 'relative', maxWidth: 340 }}><RiSearchLine style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#52525b' }} size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search skill content..." style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', borderRadius: 10, outline: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#f4f4f5', fontSize: '0.85rem' }} /></div>
      <DataTable columns={[{ header: 'Skill Title', accessor: 'title' }, { header: 'Paragraph', accessor: 'para' }, { header: 'Points', accessor: 'points' }]} data={filtered} loading={loading} onEdit={(row) => navigate(`/skills/edit/${row.id}`, { state: row })} onDelete={(row) => setSelected(row)} renderCell={(col, row) => { if (col.accessor === 'title') return <span style={{ fontWeight: 600, color: '#f4f4f5' }}>{row.title}</span>; if (col.accessor === 'para') return <span style={{ color: '#a1a1aa' }}>{row.para}</span>; if (col.accessor === 'points') return <span style={{ color: '#71717a' }}>{(row.points || []).join(' • ')}</span>; return row[col.accessor] || '—'; }} emptyTitle="No skills yet" />
      <Modal isOpen={Boolean(selected)} onClose={() => setSelected(null)} title="Remove Skill" footer={<><Button variant="secondary" onClick={() => setSelected(null)}>Cancel</Button><Button variant="danger" loading={deleting} onClick={confirmDelete}>Remove</Button></>}><p style={{ color: '#a1a1aa' }}>Remove <strong style={{ color: '#f4f4f5' }}>{selected?.title}</strong> from your stack?</p></Modal>
    </div>
  );
};

export default AllSkills;
