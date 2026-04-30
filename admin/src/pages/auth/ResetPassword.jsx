import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { resetPasswordAPI } from '../../services/authService';
import { RiShieldLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await resetPasswordAPI(token, { password });
      setMessage(res.message || 'Password reset successfully. You can now sign in.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Token might be invalid or expired.');
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
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        width: 480, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '3rem 2.5rem',
      }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#f4f4f5', marginBottom: '0.4rem' }}>Reset Password</h2>
          <p style={{ color: '#52525b', fontSize: '0.85rem', marginBottom: '2rem' }}>
            Enter your new password below.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* New Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#a1a1aa' }}>New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  name="password" type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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

            {/* Confirm Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#a1a1aa' }}>Confirm New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  name="confirmPassword" type={showConfirmPw ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%', padding: '0.75rem 2.75rem 0.75rem 1rem', borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
                    color: '#f4f4f5', outline: 'none', fontSize: '0.875rem', fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
                  onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.boxShadow = 'none'; }}
                />
                <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#52525b', cursor: 'pointer', display: 'flex',
                }}>
                  {showConfirmPw ? <RiEyeOffLine size={17} /> : <RiEyeLine size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <p style={{ fontSize: '0.8rem', color: '#ef4444', padding: '0.6rem 0.875rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8 }}>
                {error}
              </p>
            )}

            {message && (
              <p style={{ fontSize: '0.8rem', color: '#10b981', padding: '0.6rem 0.875rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8 }}>
                {message}
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
              {loading ? 'Updating…' : 'Update Password'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/login" style={{ color: '#a1a1aa', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.target.style.color = '#f4f4f5'}
              onMouseOut={(e) => e.target.style.color = '#a1a1aa'}
            >
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
