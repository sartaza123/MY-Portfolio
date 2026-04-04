import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAddLine, RiSearchLine } from 'react-icons/ri';
import DataTable from '../../components/table/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { TechChip } from '../../components/ui/Badge';
import { useToast } from '../../contexts/ToastContext';
import { buildAssetUrl } from '../../services/api';
import { deleteProject, getProjects } from '../../services/projectService';
import { truncate } from '../../utils/helper';

const AllProjects = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      setProjects(await getProjects());
    } catch (error) {
      toast(error.message || 'Failed to load projects', 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return projects;
    return projects.filter((project) => [project.title, project.description, project.techStack].some((value) => value?.toLowerCase().includes(query)));
  }, [projects, search]);

  const confirmDelete = async () => {
    if (!selected) return;
    setDeleting(true);
    try {
      await deleteProject(selected.id);
      setSelected(null);
      toast('Project deleted successfully', 'success');
      await loadProjects();
    } catch (error) {
      toast(error.message || 'Failed to delete project', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [{ header: 'Project', accessor: 'title' }, { header: 'Tech Stack', accessor: 'techStack' }, { header: 'Live Link', accessor: 'liveLink' }];

  const renderCell = (col, row) => {
    if (col.accessor === 'title') {
      return <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>{row.image && <img src={buildAssetUrl(row.image)} alt={row.title} style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }} />}<div><p style={{ fontWeight: 600, color: '#f4f4f5', fontSize: '0.85rem' }}>{row.title}</p><p style={{ fontSize: '0.72rem', color: '#52525b' }}>{truncate(row.description, 65)}</p></div></div>;
    }
    if (col.accessor === 'techStack') return <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>{(row.techStack || '').split(',').filter(Boolean).slice(0, 4).map((item) => <TechChip key={item} label={item.trim()} />)}</div>;
    if (col.accessor === 'liveLink') return row.liveLink ? <a href={row.liveLink} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} style={{ fontSize: '0.78rem', color: '#6366f1', textDecoration: 'none' }}>Visit {'->'}</a> : '—';
    return row[col.accessor] || '—';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade-up">
      <div className="page-header"><div><h1 className="page-title">Projects</h1><p className="page-subtitle">{projects.length} total project{projects.length === 1 ? '' : 's'}</p></div><Button onClick={() => navigate('/projects/add')} icon={<RiAddLine />}>Add Project</Button></div>
      <div style={{ position: 'relative', maxWidth: 340 }}><RiSearchLine style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#52525b' }} size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects or tech..." style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', borderRadius: 10, outline: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#f4f4f5', fontSize: '0.85rem' }} /></div>
      <DataTable columns={columns} data={filtered} loading={loading} onEdit={(row) => navigate(`/projects/edit/${row.id}`, { state: row })} onDelete={(row) => setSelected(row)} renderCell={renderCell} emptyTitle="No projects found" />
      <Modal isOpen={Boolean(selected)} onClose={() => setSelected(null)} title="Delete Project" footer={<><Button variant="secondary" onClick={() => setSelected(null)}>Cancel</Button><Button variant="danger" loading={deleting} onClick={confirmDelete}>Delete</Button></>}><p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Delete <strong style={{ color: '#f4f4f5' }}>{selected?.title}</strong>? This cannot be undone.</p></Modal>
    </div>
  );
};

export default AllProjects;
