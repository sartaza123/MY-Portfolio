import { useCallback, useEffect, useState } from 'react';
import { RiCheckLine, RiDeleteBin6Line } from 'react-icons/ri';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import EmptyState from '../../components/ui/EmptyState';
import { UnreadDot } from '../../components/ui/Badge';
import { useToast } from '../../contexts/ToastContext';
import { deleteMessage, getMessages, toggleRead } from '../../services/messageService';
import { formatDate, truncate } from '../../utils/helper';

const Messages = () => {
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      setMessages(await getMessages());
    } catch (error) {
      toast(error.message || 'Failed to load messages', 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleToggleRead = async (message) => {
    try {
      const updated = await toggleRead(message.id);
      setMessages((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      if (active?.id === updated.id) setActive(updated);
    } catch (error) {
      toast(error.message || 'Failed to update message', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteMessage(toDelete.id);
      setMessages((prev) => prev.filter((item) => item.id !== toDelete.id));
      if (active?.id === toDelete.id) setActive(null);
      setToDelete(null);
      toast('Message deleted', 'success');
    } catch (error) {
      toast(error.message || 'Failed to delete message', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const unread = messages.filter((message) => !message.read).length;

  return (
    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Messages</h1>
          <p className="page-subtitle">{messages.length} message{messages.length === 1 ? '' : 's'}{unread > 0 ? ` • ${unread} unread` : ''}</p>
        </div>
      </div>

      {loading ? <Loader /> : messages.length === 0 ? <EmptyState icon="Inbox" title="No messages yet" sub="Messages from the contact form will appear here." /> : (
        <div style={{ display: 'grid', gridTemplateColumns: active ? 'minmax(0, 1fr) minmax(320px, 420px)' : '1fr', gap: '1.25rem', alignItems: 'start' }} className="messages-layout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', minWidth: 0 }}>
            {messages.map((message) => (
              <div key={message.id} className="glass glass-hover" style={{ padding: '1rem 1.25rem', cursor: 'pointer', border: active?.id === message.id ? '1px solid rgba(99,102,241,0.4)' : undefined }} onClick={() => { setActive(message); if (!message.read) handleToggleRead(message); }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', minWidth: 0 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: message.read ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg,#6366f1,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.78rem', color: 'white' }}>{message.name.slice(0, 2).toUpperCase()}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem', minWidth: 0 }}>
                      <span style={{ fontWeight: message.read ? 500 : 700, color: message.read ? '#a1a1aa' : '#f4f4f5', fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{message.name}</span>
                      {!message.read && <UnreadDot />}
                      <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#52525b', flexShrink: 0 }}>{formatDate(message.createdAt)}</span>
                    </div>
                    <p style={{ fontSize: '0.7rem', color: '#52525b', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{message.email}</p>
                    <p style={{ fontSize: '0.78rem', color: message.read ? '#71717a' : '#d4d4d8' }}>{truncate(message.message, 88)}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <button type="button" onClick={(event) => { event.stopPropagation(); handleToggleRead(message); }} style={{ padding: '0.3rem 0.65rem', borderRadius: 7, fontSize: '0.7rem', fontWeight: 500, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><RiCheckLine size={12} /> {message.read ? 'Mark unread' : 'Mark read'}</button>
                  <button type="button" onClick={(event) => { event.stopPropagation(); setToDelete(message); }} style={{ padding: '0.3rem 0.65rem', borderRadius: 7, fontSize: '0.7rem', fontWeight: 500, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><RiDeleteBin6Line size={12} /> Delete</button>
                </div>
              </div>
            ))}
          </div>

          {active && (
            <div className="glass message-detail-panel" style={{ padding: '1.5rem', position: 'sticky', top: 92, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem' }}><h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#f4f4f5' }}>Message Detail</h3><button type="button" onClick={() => setActive(null)} style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer' }}>Close</button></div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div><p style={{ fontSize: '0.7rem', color: '#52525b', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>From</p><p style={{ fontWeight: 600, color: '#f4f4f5' }}>{active.name}</p><p style={{ fontSize: '0.8rem', color: '#6366f1', overflowWrap: 'anywhere' }}>{active.email}</p></div>
                <div><p style={{ fontSize: '0.7rem', color: '#52525b', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Date</p><p style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>{formatDate(active.createdAt)}</p></div>
                <div><p style={{ fontSize: '0.7rem', color: '#52525b', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Message</p><p style={{ fontSize: '0.9rem', color: '#d4d4d8', lineHeight: 1.7, overflowWrap: 'anywhere' }}>{active.message}</p></div>
                <a href={`mailto:${active.email}`} style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: 9, fontWeight: 600, fontSize: '0.85rem', background: 'linear-gradient(135deg,#6366f1,#818cf8)', color: 'white', textDecoration: 'none', textAlign: 'center' }}>Reply via Email</a>
              </div>
            </div>
          )}
        </div>
      )}

      <Modal isOpen={Boolean(toDelete)} onClose={() => setToDelete(null)} title="Delete Message" footer={<><Button variant="secondary" onClick={() => setToDelete(null)}>Cancel</Button><Button variant="danger" loading={deleting} onClick={confirmDelete}>Delete</Button></>}><p style={{ color: '#a1a1aa' }}>Permanently delete the message from <strong style={{ color: '#f4f4f5' }}>{toDelete?.name}</strong>?</p></Modal>
    </div>
  );
};

export default Messages;
