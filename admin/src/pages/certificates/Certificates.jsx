import { useCallback, useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import { useToast } from '../../contexts/ToastContext';
import { buildAssetUrl } from '../../services/api';
import {
  deleteCertificate,
  getCertificates,
  uploadCertificate,
} from '../../services/certificateService';

const Certificates = () => {
  const toast = useToast();
  const [certificates, setCertificates] = useState([]);
  const [form, setForm] = useState({ title: '', issuer: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  const loadCertificates = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCertificates();
      setCertificates(data || []);
    } catch (error) {
      toast(error.message || 'Failed to load certificates', 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadCertificates();
  }, [loadCertificates]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) return toast('Certificate title is required', 'error');
    if (!file) return toast('Please choose a certificate image', 'error');

    const formData = new FormData();
    formData.append('title', form.title.trim());
    formData.append('issuer', form.issuer.trim());
    formData.append('image', file);

    setSaving(true);
    try {
      await uploadCertificate(formData);
      setForm({ title: '', issuer: '' });
      setFile(null);
      toast('Certificate uploaded successfully', 'success');
      await loadCertificates();
    } catch (error) {
      toast(error.message || 'Failed to upload certificate', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteCertificate(id);
      toast('Certificate deleted successfully', 'success');
      await loadCertificates();
    } catch (error) {
      toast(error.message || 'Failed to delete certificate', 'error');
    } finally {
      setDeletingId('');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="animate-fade-up" style={{ display: 'grid', gap: '1.5rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Certificates</h1>
          <p className="page-subtitle">Manage up to 5 certificates for the client gallery</p>
        </div>
      </div>

      <div className="glass" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f4f4f5', marginBottom: '0.5rem' }}>
          Upload Certificate
        </h2>
        <p style={{ color: '#71717a', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
          {certificates.length}/5 uploaded. Each new certificate appears on the client instantly.
        </p>

        <form onSubmit={handleUpload} style={{ display: 'grid', gap: '1rem', maxWidth: 720 }}>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <label style={{ display: 'grid', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#a1a1aa' }}>Title</span>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="React Certificate"
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, padding: '0.7rem 1rem', color: '#f4f4f5', fontSize: '0.875rem' }}
              />
            </label>
            <label style={{ display: 'grid', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#a1a1aa' }}>Issuer</span>
              <input
                name="issuer"
                value={form.issuer}
                onChange={handleChange}
                placeholder="Internshala / Coursera / TCS"
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, padding: '0.7rem 1rem', color: '#f4f4f5', fontSize: '0.875rem' }}
              />
            </label>
          </div>

          <label style={{ display: 'grid', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#a1a1aa' }}>Certificate Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
              style={{ color: '#d4d4d8', fontSize: '0.875rem' }}
            />
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button type="button" variant="secondary" onClick={loadCertificates}>
              Refresh
            </Button>
            <Button type="submit" loading={saving} disabled={certificates.length >= 5}>
              Upload Certificate
            </Button>
          </div>
        </form>
      </div>

      <div className="glass" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f4f4f5' }}>Uploaded Certificates</h2>
          <span style={{ fontSize: '0.8rem', color: '#71717a' }}>Delete any certificate by its id-backed record</span>
        </div>

        {certificates.length === 0 ? (
          <p style={{ color: '#71717a', fontSize: '0.9rem' }}>No certificates uploaded yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                  minWidth: 0,
                }}
              >
                <img
                  src={buildAssetUrl(certificate.image)}
                  alt={certificate.title}
                  style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '1rem', display: 'grid', gap: '0.5rem' }}>
                  <div>
                    <p style={{ color: '#f4f4f5', fontWeight: 600, fontSize: '0.92rem' }}>{certificate.title}</p>
                    <p style={{ color: '#71717a', fontSize: '0.78rem', marginTop: '0.25rem' }}>{certificate.issuer || 'Issuer not provided'}</p>
                  </div>
                  <p style={{ color: '#52525b', fontSize: '0.72rem', wordBreak: 'break-all' }}>ID: {certificate.id}</p>
                  <Button
                    type="button"
                    variant="danger"
                    loading={deletingId === certificate.id}
                    onClick={() => handleDelete(certificate.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
