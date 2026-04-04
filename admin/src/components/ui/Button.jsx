const V = {
  primary:   { bg: 'linear-gradient(135deg,#6366f1,#818cf8)', color: '#fff',     border: 'rgba(99,102,241,0.3)',   shadow: '0 4px 15px rgba(99,102,241,0.35)' },
  secondary: { bg: 'rgba(255,255,255,0.07)',                   color: '#d4d4d8',  border: 'rgba(255,255,255,0.1)', shadow: 'none' },
  danger:    { bg: 'rgba(239,68,68,0.12)',                     color: '#ef4444',  border: 'rgba(239,68,68,0.3)',   shadow: 'none' },
  success:   { bg: 'rgba(34,197,94,0.12)',                     color: '#22c55e',  border: 'rgba(34,197,94,0.3)',   shadow: 'none' },
  ghost:     { bg: 'transparent',                              color: '#71717a',  border: 'rgba(255,255,255,0.07)', shadow: 'none' },
};

const S = {
  sm: { padding: '0.4rem 0.875rem', fontSize: '0.8rem',  borderRadius: 8  },
  md: { padding: '0.6rem 1.25rem',  fontSize: '0.875rem', borderRadius: 10 },
  lg: { padding: '0.75rem 1.75rem', fontSize: '1rem',    borderRadius: 12 },
};

const Button = ({
  children, variant = 'primary', size = 'md',
  loading = false, disabled = false, icon, className = '', style = {}, ...props
}) => {
  const v = V[variant] || V.primary;
  const s = S[size]    || S.md;
  return (
    <button
      disabled={disabled || loading}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: '0.5rem', fontWeight: 600, fontFamily: 'inherit',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        border: `1px solid ${v.border}`,
        background: v.bg, color: v.color, boxShadow: v.shadow,
        ...s, ...style,
      }}
      className={className}
      {...props}
    >
      {loading && (
        <span style={{
          width: 14, height: 14, border: '2px solid currentColor',
          borderTopColor: 'transparent', borderRadius: '50%',
          display: 'inline-block',
          animation: 'spin 0.7s linear infinite',
        }} />
      )}
      {!loading && icon}
      {children}
    </button>
  );
};

export default Button;

