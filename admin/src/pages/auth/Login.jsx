import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { loginUser } from '../../services/authService';
import { RiShieldLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const Login = () => {
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [showPw,  setShowPw]  = useState(false);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const { login }  = useAuth();
  const navigate   = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const data = await loginUser({ email: form.email, password: form.password });
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: '#080808',
    }}>
      {/* Left panel */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '3rem',
        background: 'linear-gradient(145deg, rgba(99,102,241,0.08) 0%, rgba(167,139,250,0.04) 100%)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Glowing orbs */}
        {[
          { top: '10%', left: '20%',  size: 200, color: '#6366f1', op: 0.12 },
          { top: '60%', right: '10%', size: 160, color: '#a78bfa', op: 0.1  },
          { top: '70%', left: '5%',   size: 140, color: '#818cf8', op: 0.08 },
        ].map((o, i) => (
          <div key={i} style={{
            position: 'absolute', width: o.size, height: o.size, borderRadius: '50%',
            background: o.color, opacity: o.op, filter: 'blur(60px)',
            top: o.top, left: o.left, right: o.right, pointerEvents: 'none',
          }} />
        ))}

        <div style={{ position: 'relative', maxWidth: 360, textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18, margin: '0 auto 2rem',
            background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 40px rgba(99,102,241,0.5)',
          }}>
            <RiShieldLine size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f4f4f5', letterSpacing: '-0.04em', marginBottom: '1rem' }}>
            Portfolio<br />
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Admin Panel
            </span>
          </h1>
          <p style={{ color: '#52525b', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Complete control over your portfolio content — projects, skills, and visitor messages.
          </p>
          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['Manage Projects & Skills', 'View Contact Messages', 'Update Profile & Settings'].map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#6366f1' }}>✓</span>
                <span style={{ fontSize: '0.82rem', color: '#71717a' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        width: 480, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '3rem 2.5rem',
      }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#f4f4f5', marginBottom: '0.4rem' }}>Sign in</h2>
          <p style={{ color: '#52525b', fontSize: '0.85rem', marginBottom: '2rem' }}>
            Enter any email & password to access the admin panel.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#a1a1aa' }}>Email address</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="admin@portfolio.dev" autoComplete="email"
                style={{
                  width: '100%', padding: '0.75rem 1rem', borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
                  color: '#f4f4f5', outline: 'none', fontSize: '0.875rem', fontFamily: 'Inter, sans-serif',
                }}
                onFocus={(e)  => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
                onBlur={(e)   => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#a1a1aa' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handleChange}
                  placeholder="••••••••" autoComplete="current-password"
                  style={{
                    width: '100%', padding: '0.75rem 2.75rem 0.75rem 1rem', borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
                    color: '#f4f4f5', outline: 'none', fontSize: '0.875rem', fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
                  onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.boxShadow = 'none'; }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#52525b', cursor: 'pointer', display: 'flex',
                }}>
                  {showPw ? <RiEyeOffLine size={17} /> : <RiEyeLine size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <p style={{ fontSize: '0.8rem', color: '#ef4444', padding: '0.6rem 0.875rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8 }}>
                {error}
              </p>
            )}

            <button
              type="submit" disabled={loading}
              style={{
                padding: '0.85rem', borderRadius: 10, fontWeight: 700, fontSize: '0.9rem',
                background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg,#6366f1,#818cf8)',
                color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
              }}
            >
              {loading && <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />}
              {loading ? 'Signing in…' : 'Sign in to Admin Panel'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
