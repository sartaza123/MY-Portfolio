const Input = ({
  label, name, value, onChange, type = 'text',
  placeholder, error, required = false,
  as = 'input', rows = 4, options = [],
}) => {
  const base = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.09)'}`,
    borderRadius: 10,
    padding: '0.7rem 1rem',
    color: '#f4f4f5',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s',
    resize: as === 'textarea' ? 'vertical' : undefined,
    minHeight: as === 'textarea' ? `${rows * 1.6}rem` : undefined,
  };

  const focus = (e) => {
    e.target.style.borderColor = '#6366f1';
    e.target.style.boxShadow   = '0 0 0 3px rgba(99,102,241,0.15)';
    e.target.style.background  = 'rgba(255,255,255,0.06)';
  };
  const blur = (e) => {
    e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.09)';
    e.target.style.boxShadow   = 'none';
    e.target.style.background  = 'rgba(255,255,255,0.04)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%' }}>
      {label && (
        <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#a1a1aa' }}>
          {label}{required && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
        </label>
      )}

      {as === 'textarea' ? (
        <textarea
          name={name} value={value ?? ''} onChange={onChange}
          placeholder={placeholder} rows={rows}
          style={base} onFocus={focus} onBlur={blur}
        />
      ) : as === 'select' ? (
        <select
          name={name} value={value ?? ''} onChange={onChange}
          style={{ ...base, cursor: 'pointer' }}
          onFocus={focus} onBlur={blur}
        >
          <option value="" disabled style={{ background: '#111' }}>{placeholder || 'Select…'}</option>
          {options.map((o) => (
            <option key={o} value={o} style={{ background: '#111' }}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          name={name} type={type} value={value ?? ''} onChange={onChange}
          placeholder={placeholder} style={base}
          onFocus={focus} onBlur={blur}
        />
      )}

      {error && <p style={{ fontSize: '0.75rem', color: '#ef4444' }}>{error}</p>}
    </div>
  );
};

export default Input;
