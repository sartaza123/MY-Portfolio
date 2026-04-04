import { useCallback, useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import { useToast } from '../../contexts/ToastContext';
import { buildAssetUrl } from '../../services/api';
import { deleteResume, getResume, uploadResume } from '../../services/resumeService';

const Resume = () => {
  const toast = useToast();
  const [resume, setResume] = useState(null);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadResume = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getResume();
      setResume(data || null);
      setTitle(data?.title || '');
    } catch (error) {
      toast(error.message || 'Failed to load resume', 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadResume();
  }, [loadResume]);

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!title.trim()) return toast('Resume title is required', 'error');
    if (!file) return toast('Please choose a PDF file', 'error');

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('file', file);

    setSaving(true);
    try {
      const data = await uploadResume(formData);
      setResume(data);
      setFile(null);
      toast('Resume uploaded successfully', 'success');
    } catch (error) {
      toast(error.message || 'Failed to upload resume', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!resume?.id) return;
    setDeleting(true);
    try {
      await deleteResume(resume.id);
      setResume(null);
      setTitle('');
      setFile(null);
      toast('Resume deleted successfully', 'success');
    } catch (error) {
      toast(error.message || 'Failed to delete resume', 'error');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="animate-fade-up" style={{ display: 'grid', gap: '1.5rem' }}>
      <div className="glass" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f4f4f5', marginBottom: '0.5rem' }}>Upload Resume</h2>
        <p style={{ color: '#71717a', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Upload a PDF and the client site will use it instantly for the download button.</p>
        <form onSubmit={handleUpload} style={{ display: 'grid', gap: '1rem', maxWidth: 640 }}>
          <div style={{ display: 'grid', gap: '0.35rem' }}><label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#a1a1aa' }}>Resume Title</label><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Senior MERN Developer Resume" style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, padding: '0.7rem 1rem', color: '#f4f4f5', fontSize: '0.875rem' }} /></div>
          <div style={{ display: 'grid', gap: '0.35rem' }}><label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#a1a1aa' }}>PDF File</label><input type="file" accept="application/pdf" onChange={(event) => setFile(event.target.files?.[0] || null)} style={{ color: '#d4d4d8', fontSize: '0.875rem' }} /><p style={{ color: '#52525b', fontSize: '0.75rem' }}>Use FormData only. The browser will attach the multipart content type automatically.</p></div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}><Button type="button" variant="secondary" onClick={loadResume}>Refresh</Button><Button type="submit" loading={saving}>Upload Resume</Button></div>
        </form>
      </div>

      <div className="glass" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}><div><h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f4f4f5' }}>Active Resume</h2><p style={{ color: '#71717a', fontSize: '0.875rem', marginTop: '0.35rem' }}>Only one active resume is served publicly at a time.</p></div>{resume && <Button variant="danger" loading={deleting} onClick={handleDelete}>Delete</Button>}</div>
        {!resume ? <p style={{ color: '#71717a', fontSize: '0.9rem' }}>No resume uploaded yet.</p> : <div style={{ display: 'grid', gap: '0.75rem' }}><div style={{ padding: '1rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}><p style={{ fontSize: '1rem', fontWeight: 600, color: '#f4f4f5' }}>{resume.title}</p><p style={{ fontSize: '0.8rem', color: '#71717a', marginTop: '0.35rem' }}>{resume.file}</p></div><div style={{ display: 'flex', gap: '0.75rem' }}><Button type="button" onClick={() => window.open(buildAssetUrl(resume.file), '_blank')}>Preview PDF</Button><Button type="button" variant="secondary" onClick={() => window.open(buildAssetUrl(resume.file), '_blank')}>Open in New Tab</Button></div></div>}
      </div>
    </div>
  );
};

export default Resume;
