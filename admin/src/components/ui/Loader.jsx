const Loader = ({ fullScreen = false, size = 28 }) => (
  <div style={{
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: '1rem',
    height: fullScreen ? '100vh' : '8rem',
  }}>
    <div style={{
      width: size, height: size,
      border: `3px solid rgba(99,102,241,0.2)`,
      borderTopColor: '#6366f1',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
    }} />
    {fullScreen && (
      <p style={{ fontSize: '0.8rem', color: '#52525b' }}>Loading…</p>
    )}
  </div>
);

export const SkeletonRow = ({ cols = 4 }) => (
  <tr>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} style={{ padding: '1rem' }}>
        <div className="skeleton" style={{ height: 16, width: i === 0 ? '60%' : '80%' }} />
      </td>
    ))}
  </tr>
);

export default Loader;
