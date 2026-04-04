import { useLocation } from 'react-router-dom';
import { RiBellLine, RiMenuLine, RiUser3Line } from 'react-icons/ri';
import { useAuth } from '../../hooks/useAuth';

const TITLES = {
  '/': { title: 'Dashboard', sub: 'Overview of your live portfolio content' },
  '/projects': { title: 'Projects', sub: 'Manage portfolio projects and uploads' },
  '/projects/add': { title: 'Add Project', sub: 'Create a new project entry' },
  '/skills': { title: 'Skills', sub: 'Manage your skill set' },
  '/skills/add': { title: 'Add Skill', sub: 'Add a new skill' },
  '/resume': { title: 'Resume', sub: 'Upload and replace your active PDF resume' },
  '/messages': { title: 'Messages', sub: 'Inbox from your portfolio visitors' },
  '/settings': { title: 'Settings', sub: 'Manage your admin profile' },
};

const Header = ({ onMenuToggle }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const key = Object.keys(TITLES).find((item) => pathname === item || (item !== '/' && pathname.startsWith(item)));
  const info = TITLES[key] || { title: 'Admin Panel', sub: '' };
  const isEdit = pathname.includes('/edit/');
  const display = isEdit ? { title: pathname.includes('projects') ? 'Edit Project' : 'Edit Skill', sub: 'Update existing entry' } : info;

  return (
    <header style={{ padding: '0 1.25rem', minHeight: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, zIndex: 40, flexShrink: 0 }}>
      <div style={{ minWidth: 0 }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f4f4f5', lineHeight: 1.2 }}>{display.title}</h2>
        {display.sub && <p style={{ fontSize: '0.75rem', color: '#52525b', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{display.sub}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        <button type="button" className="mobile-nav-toggle" onClick={onMenuToggle} style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'none', alignItems: 'center', justifyContent: 'center', color: '#d4d4d8', cursor: 'pointer' }}><RiMenuLine size={18} /></button>
        <button type="button" style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#71717a', cursor: 'pointer' }}><RiBellLine size={17} /></button>
        <div className="header-user" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.75rem', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', minWidth: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #6366f1, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RiUser3Line size={14} color="white" /></div>
          <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#d4d4d8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>{user?.name || 'Admin'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
