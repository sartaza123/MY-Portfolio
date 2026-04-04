/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from 'react';

const ToastCtx = createContext(null);

export const useToast = () => {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx.toast;
};

const ICONS = {
  success: 'OK',
  error: 'ER',
  warning: 'WA',
  info: 'IN',
};

const COLORS = {
  success: { border: 'rgba(34,197,94,0.4)', bg: 'rgba(34,197,94,0.12)', icon: '#22c55e' },
  error: { border: 'rgba(239,68,68,0.4)', bg: 'rgba(239,68,68,0.12)', icon: '#ef4444' },
  warning: { border: 'rgba(245,158,11,0.4)', bg: 'rgba(245,158,11,0.12)', icon: '#f59e0b' },
  info: { border: 'rgba(99,102,241,0.4)', bg: 'rgba(99,102,241,0.12)', icon: '#818cf8' },
};

const Toast = ({ toasts, onRemove }) => (
  <div className="toast-container">
    {toasts.map((toast) => {
      const color = COLORS[toast.type] || COLORS.info;
      return (
        <div key={toast.id} className="toast-item animate-slide-right" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: 12, background: 'rgba(15,15,15,0.95)', border: `1px solid ${color.border}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)', backdropFilter: 'blur(20px)', minWidth: 280, maxWidth: 380 }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: color.bg, color: color.icon, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.7rem', flexShrink: 0 }}>{ICONS[toast.type]}</span>
          <span style={{ fontSize: '0.875rem', color: '#f4f4f5', flex: 1 }}>{toast.message}</span>
          <button type="button" onClick={() => onRemove(toast.id)} style={{ background: 'none', border: 'none', color: '#52525b', cursor: 'pointer', fontSize: '1rem', padding: 4, lineHeight: 1 }}>x</button>
        </div>
      );
    })}
  </div>
);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const remove = useCallback((id) => setToasts((prev) => prev.filter((toast) => toast.id !== id)), []);
  const toast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => remove(id), 3500);
  }, [remove]);

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <Toast toasts={toasts} onRemove={remove} />
    </ToastCtx.Provider>
  );
};
