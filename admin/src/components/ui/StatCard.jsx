const StatCard = ({ label, value, icon, accent = '#6366f1', trend, sub }) => (
  <div
    className="glass glass-hover animate-fade-up"
    style={{ padding: '1.5rem', borderRadius: 16, position: 'relative', overflow: 'hidden' }}
  >
    {/* Glow orb */}
    <div style={{
      position: 'absolute', top: -20, right: -20,
      width: 80, height: 80, borderRadius: '50%',
      background: accent, opacity: 0.1, filter: 'blur(20px)',
      pointerEvents: 'none',
    }} />

    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontSize: '0.78rem', color: '#71717a', fontWeight: 500, marginBottom: '0.5rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {label}
        </p>
        <p style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f4f4f5', lineHeight: 1, letterSpacing: '-0.03em' }}>
          {value}
        </p>
        {sub && <p style={{ fontSize: '0.75rem', color: '#52525b', marginTop: '0.4rem' }}>{sub}</p>}
        {trend !== undefined && (
          <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: trend >= 0 ? '#22c55e' : '#ef4444' }}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% this month
          </p>
        )}
      </div>
      <div style={{
        width: 46, height: 46, borderRadius: 12,
        background: `${accent}1a`,
        border: `1px solid ${accent}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.4rem', flexShrink: 0,
      }}>
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;
