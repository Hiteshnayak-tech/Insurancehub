import { useState } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/shared/StatusBadge';
import type { SupportTicket } from '../../types';

export default function AdminSupportPage() {
  const { tickets } = useAuth();
  const [localTickets, setLocalTickets] = useState<SupportTicket[]>(tickets);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleReplyAndResolve = (status: SupportTicket['status']) => {
    if (!selectedTicket) return;

    setLocalTickets(prev =>
      prev.map(t =>
        t.id === selectedTicket.id
          ? {
              ...t,
              status,
              lastReply: replyText || 'Resolution provided by Support Officer.',
              assignedTo: 'Vikram Singh (Senior Officer)'
            }
          : t
      )
    );

    setSelectedTicket(null);
    setReplyText('');
    alert(`Ticket ${selectedTicket.ticketNumber} updated to ${status}.`);
  };

  return (
    <AdminLayout
      title="Customer Grievance &amp; Support Desk"
      breadcrumb={[{ label: 'Admin Console' }, { label: 'Support Desk' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Support Queue Table */}
        <div style={{ background: '#ffffff', borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Ticket # &amp; Subject</th>
                <th style={{ padding: '12px 16px' }}>Category</th>
                <th style={{ padding: '12px 16px' }}>Priority</th>
                <th style={{ padding: '12px 16px' }}>Created On</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {localTickets.map((ticket) => (
                <tr key={ticket.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1e50b3' }}>
                      #{ticket.ticketNumber}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{ticket.subject}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', maxWidth: 360, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {ticket.message}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#334155' }}>
                    {ticket.category}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <StatusBadge status={ticket.priority} />
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: 6,
                        background: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Reply / Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal: Ticket Reply */}
        {selectedTicket && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            zIndex: 100
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: 16,
              maxWidth: 520,
              width: '100%',
              padding: 28,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  Ticket #{selectedTicket.ticketNumber}
                </h3>
                <button
                  onClick={() => setSelectedTicket(null)}
                  style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#64748b' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: 8, padding: 14, marginBottom: 16, border: '1px solid #e2e8f0', fontSize: '13px' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedTicket.subject}</div>
                <div style={{ color: '#475569', fontSize: '12px', marginTop: 4, lineHeight: 1.5 }}>
                  "{selectedTicket.message}"
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Official Response to Customer
                </label>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Explain resolution steps, policy endorsement reference, or hospital coordination notes..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => handleReplyAndResolve('RESOLVED')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    background: '#16a34a',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  ✓ Mark as Resolved
                </button>
                <button
                  onClick={() => handleReplyAndResolve('IN_PROGRESS')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    background: '#2563eb',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Send In-Progress Note
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
