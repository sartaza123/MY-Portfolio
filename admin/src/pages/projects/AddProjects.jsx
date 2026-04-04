import { useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../contexts/ToastContext';
import { createProject } from '../../services/projectService';

const AddProject = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({ title: '', description: '', techStack: '', liveLink: '', sourceCodeLink: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim() || !form.techStack.trim()) {
      toast('Title, description, and tech stack are required', 'error');
      return;
    }

    const payload = new FormData();
    payload.append('title', form.title.trim());
    payload.append('description', form.description.trim());
    payload.append('techStack', form.techStack.trim());
    if (form.liveLink.trim()) payload.append('liveLink', form.liveLink.trim());
    if (form.sourceCodeLink.trim()) payload.append('sourceCodeLink', form.sourceCodeLink.trim());
    if (image) payload.append('image', image);

    setSaving(true);
    try {
      await createProject(payload);
      toast('Project created successfully', 'success');
      navigate('/projects');
    } catch (error) {
      toast(error.message || 'Failed to create project', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fade-up" style={{ maxWidth: 720 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Add Project</h1>
          <p className="page-subtitle">Create a new portfolio project entry</p>
        </div>
        <Button variant="secondary" icon={<RiArrowLeftLine />} onClick={() => navigate('/projects')}>Back</Button>
      </div>

      <form onSubmit={handleSubmit} className="glass" style={{ padding: '2rem', display: 'grid', gap: '1.25rem' }}>
        <Input label="Project Title" name="title" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} required />
        <Input label="Description" name="description" value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} as="textarea" rows={4} required />
        <Input label="Tech Stack" name="techStack" value={form.techStack} onChange={(event) => setForm((prev) => ({ ...prev, techStack: event.target.value }))} placeholder="React, Express, MongoDB" required />
        <Input label="Live Link" name="liveLink" value={form.liveLink} onChange={(event) => setForm((prev) => ({ ...prev, liveLink: event.target.value }))} placeholder="https://example.com" />
        <Input label="Source Code Link" name="sourceCodeLink" value={form.sourceCodeLink} onChange={(event) => setForm((prev) => ({ ...prev, sourceCodeLink: event.target.value }))} placeholder="https://github.com/..." />

        <div style={{ display: 'grid', gap: '0.35rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#a1a1aa' }}>Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const nextFile = event.target.files?.[0] || null;
              setImage(nextFile);
              setPreview(nextFile ? URL.createObjectURL(nextFile) : '');
            }}
            style={{ color: '#d4d4d8', fontSize: '0.875rem' }}
          />
        </div>

        {preview && <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }} />}

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button type="button" variant="secondary" onClick={() => navigate('/projects')}>Cancel</Button>
          <Button type="submit" loading={saving}>Save Project</Button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
