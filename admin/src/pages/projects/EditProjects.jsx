import { useEffect, useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Loader from '../../components/ui/Loader';
import { useToast } from '../../contexts/ToastContext';
import { buildAssetUrl } from '../../services/api';
import { getProject, updateProject } from '../../services/projectService';

const EditProject = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState(state || null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(state?.image ? buildAssetUrl(state.image) : '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (form) return;
    getProject(id).then((data) => {
      setForm(data);
      setPreview(data?.image ? buildAssetUrl(data.image) : '');
    }).catch((error) => toast(error.message || 'Failed to load project', 'error'));
  }, [form, id, toast]);

  if (!form) return <Loader />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    payload.append('title', form.title.trim());
    payload.append('description', form.description.trim());
    payload.append('techStack', form.techStack.trim());
    payload.append('liveLink', form.liveLink?.trim() || '');
    payload.append('sourceCodeLink', form.sourceCodeLink?.trim() || '');
    if (image) payload.append('image', image);

    setSaving(true);
    try {
      await updateProject(id, payload);
      toast('Project updated successfully', 'success');
      navigate('/projects');
    } catch (error) {
      toast(error.message || 'Failed to update project', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fade-up" style={{ maxWidth: 720 }}>
      <div className="page-header"><div><h1 className="page-title">Edit Project</h1><p className="page-subtitle">{form.title}</p></div><Button variant="secondary" icon={<RiArrowLeftLine />} onClick={() => navigate('/projects')}>Back</Button></div>
      <form onSubmit={handleSubmit} className="glass" style={{ padding: '2rem', display: 'grid', gap: '1.25rem' }}>
        <Input label="Project Title" name="title" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} required />
        <Input label="Description" name="description" value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} as="textarea" rows={4} required />
        <Input label="Tech Stack" name="techStack" value={form.techStack} onChange={(event) => setForm((prev) => ({ ...prev, techStack: event.target.value }))} required />
        <Input label="Live Link" name="liveLink" value={form.liveLink || ''} onChange={(event) => setForm((prev) => ({ ...prev, liveLink: event.target.value }))} placeholder="https://example.com" />
        <Input label="Source Code Link" name="sourceCodeLink" value={form.sourceCodeLink || ''} onChange={(event) => setForm((prev) => ({ ...prev, sourceCodeLink: event.target.value }))} placeholder="https://github.com/..." />
        <div style={{ display: 'grid', gap: '0.35rem' }}><label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#a1a1aa' }}>Replace Image</label><input type="file" accept="image/*" onChange={(event) => { const nextFile = event.target.files?.[0] || null; setImage(nextFile); setPreview(nextFile ? URL.createObjectURL(nextFile) : (form.image ? buildAssetUrl(form.image) : '')); }} style={{ color: '#d4d4d8', fontSize: '0.875rem' }} /></div>
        {preview && <img src={preview} alt={form.title} style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }} />}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}><Button type="button" variant="secondary" onClick={() => navigate('/projects')}>Cancel</Button><Button type="submit" loading={saving}>Update Project</Button></div>
      </form>
    </div>
  );
};

export default EditProject;
