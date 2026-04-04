import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, footer, maxWidth = 480 }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else        document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 60,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-scale-in"
        style={{
          width: '100%', maxWidth,
          background: 'rgba(15,15,15,0.95)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 18,
          boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#f4f4f5' }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
              color: '#71717a', cursor: 'pointer', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#f4f4f5'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#71717a'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
          >✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem' }}>{children}</div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', justifyContent: 'flex-end', gap: '0.6rem',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
