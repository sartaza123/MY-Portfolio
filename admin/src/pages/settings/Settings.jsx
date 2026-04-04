import { useEffect, useMemo, useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import { getSettings, updatePortfolioContent, updateProfile, changePassword } from '../../services/settingsService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../contexts/ToastContext';
import { buildAssetUrl } from '../../services/api';
import { RiLockPasswordLine, RiPaletteLine, RiUser3Line } from 'react-icons/ri';

const Section = ({ icon, title, description, children }) => (
  <div className="glass" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <span style={{ color: '#6366f1' }}>{icon}</span>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f4f4f5' }}>{title}</h3>
          {description && <p style={{ fontSize: '0.78rem', color: '#71717a', marginTop: '0.25rem' }}>{description}</p>}
        </div>
      </div>
    </div>
    {children}
  </div>
);

const toMultiline = (items, keys) =>
  (items || [])
    .map((item) => keys.map((key) => item?.[key] || '').join(' | '))
    .join('\n');

const fromMultiline = (value, keys) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const values = line.split('|').map((item) => item.trim());
      return keys.reduce((acc, key, index) => {
        acc[key] = values[index] || '';
        return acc;
      }, {});
    });

const Settings = () => {
  const toast = useToast();
  const { updateUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [content, setContent] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [heroImageFile, setHeroImageFile] = useState(null);

  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [savingPw, setSavingPw] = useState(false);
  const [pwError, setPwError] = useState('');

  useEffect(() => {
    getSettings()
      .then(({ profile: profileData, content: contentData }) => {
        setProfile({
          name: profileData?.name || '',
          email: profileData?.email || '',
        });
        setContent({
          brandName: contentData?.brandName || '',
          heroOutlineTitle: contentData?.heroOutlineTitle || '',
          heroScriptTitle: contentData?.heroScriptTitle || '',
          heroDescription: contentData?.heroDescription || '',
          heroImage: contentData?.heroImage || '',
          aboutLabel: contentData?.aboutLabel || '',
          aboutOutlineTitle: contentData?.aboutOutlineTitle || '',
          aboutScriptTitle: contentData?.aboutScriptTitle || '',
          aboutHeading: contentData?.aboutHeading || '',
          aboutDescription: contentData?.aboutDescription || '',
          contactHeading: contentData?.contactHeading || '',
          contactSubheading: contentData?.contactSubheading || '',
          contactEmail: contentData?.contactEmail || '',
          location: contentData?.location || '',
          githubUrl: contentData?.githubUrl || '',
          linkedinUrl: contentData?.linkedinUrl || '',
          educationText: toMultiline(contentData?.education, ['title', 'institute', 'completeBy']),
          experienceText: toMultiline(contentData?.experience, ['type', 'role', 'organization', 'duration']),
          personalSkillsText: (contentData?.personalSkills || []).join('\n'),
          marqueeItemsText: (contentData?.marqueeItems || []).join('\n'),
        });
      })
      .catch((error) => {
        toast(error.message || 'Failed to load settings', 'error');
      });
  }, [toast]);

  const heroPreview = useMemo(() => {
    if (heroImageFile) return URL.createObjectURL(heroImageFile);
    return content?.heroImage ? buildAssetUrl(content.heroImage) : '';
  }, [content?.heroImage, heroImageFile]);

  useEffect(() => () => {
    if (heroPreview?.startsWith('blob:')) {
      URL.revokeObjectURL(heroPreview);
    }
  }, [heroPreview]);

  const changeProfileField = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const changeContentField = (event) => {
    const { name, value } = event.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const changePw = (event) => {
    const { name, value } = event.target;
    setPwForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setSavingProfile(true);
    try {
      const updated = await updateProfile(profile);
      updateUser({ name: updated.name, email: updated.email });
      toast('Admin profile updated', 'success');
    } catch (error) {
      toast(error.message || 'Failed to update profile', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  const saveContent = async (event) => {
    event.preventDefault();
    if (!content) return;

    const formData = new FormData();
    [
      'brandName',
      'heroOutlineTitle',
      'heroScriptTitle',
      'heroDescription',
      'aboutLabel',
      'aboutOutlineTitle',
      'aboutScriptTitle',
      'aboutHeading',
      'aboutDescription',
      'contactHeading',
      'contactSubheading',
      'contactEmail',
      'location',
      'githubUrl',
      'linkedinUrl',
    ].forEach((key) => formData.append(key, content[key] || ''));

    formData.append('education', JSON.stringify(fromMultiline(content.educationText, ['title', 'institute', 'completeBy'])));
    formData.append('experience', JSON.stringify(fromMultiline(content.experienceText, ['type', 'role', 'organization', 'duration'])));
    formData.append('personalSkills', content.personalSkillsText || '');
    formData.append('marqueeItems', content.marqueeItemsText || '');

    if (heroImageFile) {
      formData.append('heroImage', heroImageFile);
    }

    setSavingContent(true);
    try {
      const updated = await updatePortfolioContent(formData);
      setContent((prev) => ({
        ...prev,
        heroImage: updated.heroImage || prev.heroImage,
      }));
      setHeroImageFile(null);
      toast('Portfolio content updated', 'success');
    } catch (error) {
      toast(error.message || 'Failed to update content', 'error');
    } finally {
      setSavingContent(false);
    }
  };

  const savePassword = async (event) => {
    event.preventDefault();
    setPwError('');

    if (pwForm.newPassword.length < 6) {
      setPwError('Password must be at least 6 characters.');
      return;
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwError('Passwords do not match.');
      return;
    }

    setSavingPw(true);
    try {
      await changePassword(pwForm.currentPassword, pwForm.newPassword);
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast('Password changed successfully', 'success');
    } catch (error) {
      setPwError(error.message || 'Failed to update password');
    } finally {
      setSavingPw(false);
    }
  };

  if (!profile || !content) return <Loader fullScreen />;

  return (
    <div className="animate-fade-up" style={{ display: 'grid', gap: '1.5rem' }}>
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage the admin account and the public portfolio content from one place.</p>
      </div>

      <Section icon={<RiUser3Line size={18} />} title="Admin Account" description="Used for protected admin login and profile details.">
        <form onSubmit={saveProfile} style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <Input label="Full Name" name="name" value={profile.name} onChange={changeProfileField} />
            <Input label="Email" name="email" type="email" value={profile.email} onChange={changeProfileField} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" loading={savingProfile}>Save Account</Button>
          </div>
        </form>
      </Section>

      <Section icon={<RiPaletteLine size={18} />} title="Portfolio Content" description="Everything here powers the Home, About, Certificates, Contact, and Footer sections on the client.">
        <form onSubmit={saveContent} style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <Input label="Brand Name" name="brandName" value={content.brandName} onChange={changeContentField} />
            <Input label="Hero Outline Title" name="heroOutlineTitle" value={content.heroOutlineTitle} onChange={changeContentField} />
            <Input label="Hero Script Title" name="heroScriptTitle" value={content.heroScriptTitle} onChange={changeContentField} />
            <Input label="About Label" name="aboutLabel" value={content.aboutLabel} onChange={changeContentField} />
            <Input label="About Outline Title" name="aboutOutlineTitle" value={content.aboutOutlineTitle} onChange={changeContentField} />
            <Input label="About Script Title" name="aboutScriptTitle" value={content.aboutScriptTitle} onChange={changeContentField} />
          </div>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            <Input label="Contact Email" name="contactEmail" type="email" value={content.contactEmail} onChange={changeContentField} />
            <Input label="Location" name="location" value={content.location} onChange={changeContentField} />
            <Input label="GitHub URL" name="githubUrl" value={content.githubUrl} onChange={changeContentField} />
            <Input label="LinkedIn URL" name="linkedinUrl" value={content.linkedinUrl} onChange={changeContentField} />
          </div>

          <Input label="Hero Description" name="heroDescription" value={content.heroDescription} onChange={changeContentField} as="textarea" rows={4} />
          <Input label="About Heading" name="aboutHeading" value={content.aboutHeading} onChange={changeContentField} />
          <Input label="About Description" name="aboutDescription" value={content.aboutDescription} onChange={changeContentField} as="textarea" rows={5} />
          <Input label="Contact Heading" name="contactHeading" value={content.contactHeading} onChange={changeContentField} />
          <Input label="Contact Subheading" name="contactSubheading" value={content.contactSubheading} onChange={changeContentField} as="textarea" rows={3} />

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'start' }}>
            <Input label="Education" name="educationText" value={content.educationText} onChange={changeContentField} as="textarea" rows={5} placeholder="B.Tech, CSE | MITM | 2025" />
            <Input label="Experience" name="experienceText" value={content.experienceText} onChange={changeContentField} as="textarea" rows={5} placeholder="internship | Full Stack Developer Intern | Internshala | 3 Months" />
          </div>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <Input label="Personal Skills" name="personalSkillsText" value={content.personalSkillsText} onChange={changeContentField} as="textarea" rows={5} placeholder="UI/UX\nCommunication\nDebugging" />
            <Input label="Marquee Items" name="marqueeItemsText" value={content.marqueeItemsText} onChange={changeContentField} as="textarea" rows={5} placeholder="Responsive Design\nProblem Solving\nDeployment" />
          </div>

          <div className="glass" style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f4f4f5' }}>Hero Image</p>
                <p style={{ fontSize: '0.78rem', color: '#71717a', marginTop: '0.25rem' }}>Upload a new profile image for the home section.</p>
              </div>
              <input type="file" accept="image/*" onChange={(event) => setHeroImageFile(event.target.files?.[0] || null)} style={{ color: '#d4d4d8', fontSize: '0.875rem' }} />
              {heroPreview && (
                <img src={heroPreview} alt="Hero preview" style={{ width: '100%', maxWidth: 280, height: 220, objectFit: 'cover', borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }} />
              )}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" loading={savingContent}>Save Portfolio Content</Button>
          </div>
        </form>
      </Section>

      <Section icon={<RiLockPasswordLine size={18} />} title="Change Password" description="Keep the admin account secure.">
        <form onSubmit={savePassword} style={{ display: 'grid', gap: '1rem', maxWidth: 640 }}>
          <Input label="Current Password" name="currentPassword" value={pwForm.currentPassword} onChange={changePw} type="password" placeholder="Current password" />
          <Input label="New Password" name="newPassword" value={pwForm.newPassword} onChange={changePw} type="password" placeholder="At least 6 characters" />
          <Input label="Confirm Password" name="confirmPassword" value={pwForm.confirmPassword} onChange={changePw} type="password" placeholder="Re-enter new password" />
          {pwError && <p style={{ fontSize: '0.8rem', color: '#ef4444' }}>{pwError}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" loading={savingPw}>Update Password</Button>
          </div>
        </form>
      </Section>
    </div>
  );
};

export default Settings;
