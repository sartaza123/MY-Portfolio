import { useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../contexts/ToastContext';
import { updateSkill } from '../../services/skillService';

const EditSkill = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({
    title: state?.title || '',
    para: state?.para || '',
    pointsText: (state?.points || []).join('\n'),
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const points = form.pointsText.split('\n').map((item) => item.trim()).filter(Boolean);

    if (!form.title.trim() || !form.para.trim() || points.length < 3 || points.length > 4) {
      toast('Please add title, paragraph, and 3 to 4 points', 'error');
      return;
    }

    setSaving(true);
    try {
      await updateSkill(id, { title: form.title.trim(), para: form.para.trim(), points });
      toast('Skill updated successfully', 'success');
      navigate('/skills');
    } catch (error) {
      toast(error.message || 'Failed to update skill', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fade-up" style={{ maxWidth: 520 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Skill</h1>
          <p className="page-subtitle">Update the skill content</p>
        </div>
        <Button variant="secondary" icon={<RiArrowLeftLine />} onClick={() => navigate('/skills')}>Back</Button>
      </div>

      <form onSubmit={handleSubmit} className="glass" style={{ padding: '2rem', display: 'grid', gap: '1.25rem' }}>
        <Input label="Skill Title" name="title" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} required />
        <Input label="Skill Paragraph" name="para" value={form.para} onChange={(event) => setForm((prev) => ({ ...prev, para: event.target.value }))} as="textarea" rows={3} required />
        <Input label="Skill Points" name="pointsText" value={form.pointsText} onChange={(event) => setForm((prev) => ({ ...prev, pointsText: event.target.value }))} as="textarea" rows={4} placeholder="One point per line (3 to 4 lines)" required />
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button type="button" variant="secondary" onClick={() => navigate('/skills')}>Cancel</Button>
          <Button type="submit" loading={saving}>Update Skill</Button>
        </div>
      </form>
    </div>
  );
};

export default EditSkill;
