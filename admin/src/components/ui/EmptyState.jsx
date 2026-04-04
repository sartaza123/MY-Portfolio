const EmptyState = ({ icon = '📭', title = 'Nothing here yet', sub = '', action }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '4rem 2rem', gap: '1rem', textAlign: 'center',
  }}>
    <div style={{
      width: 72, height: 72, borderRadius: 18,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '2rem',
    }}>
      {icon}
    </div>
    <div>
      <p style={{ fontWeight: 600, fontSize: '1rem', color: '#a1a1aa' }}>{title}</p>
      {sub && <p style={{ fontSize: '0.8rem', color: '#52525b', marginTop: '0.3rem' }}>{sub}</p>}
    </div>
    {action && <div style={{ marginTop: '0.5rem' }}>{action}</div>}
  </div>
);

export default EmptyState;
