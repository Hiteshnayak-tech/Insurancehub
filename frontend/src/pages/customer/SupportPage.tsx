import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/shared/StatusBadge';

export default function CustomerSupportPage() {
  const { tickets, createTicket } = useAuth();
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Claim Assistance');
  const [priority, setPriority] = useState('MEDIUM');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      createTicket(subject, category, priority, message);
      setIsSubmitting(false);
      setSubject('');
      setMessage('');
      alert('Support ticket created! A specialist will review your request.');
    }, 600);
  };

  const faqs = [
    {
      q: 'How long does cashless hospitalization approval take?',
      a: 'Initial emergency cashless sanction is guaranteed within 60 minutes of the hospital TPA desk submitting the pre-authorization request with diagnostic notes.'
    },
    {
      q: 'What is a Pre-Existing Disease (PED) waiting period?',
      a: 'A PED waiting period (typically 24 to 36 months) is the duration you must hold continuous coverage before medical treatments for conditions diagnosed prior to enrollment are covered.'
    },
    {
      q: 'What happens if my policy has a Room Rent Capping sub-limit?',
      a: 'If your policy limits room rent to 1% of Sum Insured and you choose a deluxe room exceeding this limit, all associated medical bills (doctor fees, nursing, surgery charges) are proportionate-deducted.'
    },
    {
      q: 'Can I cancel my insurance policy for a refund?',
      a: 'Yes, all Indian retail health and life policies feature a mandatory 30-day Free-Look Period from the date of receipt, allowing cancellation with premium refund minus pro-rated medical exam costs.'
    }
  ];

  return (
    <CustomerLayout>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px 64px' }}>
        
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: 8, display: 'flex', gap: 6 }}>
            <Link to="/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>Customer Portal</Link>
            <span>/</span>
            <span style={{ color: '#1e50b3', fontWeight: 600 }}>Customer Support</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Support &amp; Help Desk
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: 4 }}>
            Get dedicated assistance from insurance advisors and track ongoing resolution requests.
          </p>
        </div>

        {/* 2-column layout: Left = Create Ticket, Right = FAQs & My Tickets */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28, alignItems: 'start' }}>
          
          {/* Create Ticket Form */}
          <div style={{
            background: '#ffffff',
            borderRadius: 14,
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
              Create Support Ticket
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px' }}>
              Our customer grievances team responds within 4 business hours.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Issue Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    color: '#0f172a',
                    background: '#fff'
                  }}
                >
                  <option value="Claim Assistance">Claim Assistance &amp; Settlement</option>
                  <option value="Policy Endorsement">Policy Endorsement / Name Correction</option>
                  <option value="Premium Payment">Premium Payment &amp; Tax Receipt</option>
                  <option value="Hospital Network">Cashless Hospital Network Query</option>
                  <option value="General Inquiry">General Insurance Query</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Subject / Summary *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Delay in cashless pre-auth approval"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    color: '#0f172a',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Urgency / Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    color: '#0f172a',
                    background: '#fff'
                  }}
                >
                  <option value="LOW">Low (General guidance)</option>
                  <option value="MEDIUM">Medium (Standard request)</option>
                  <option value="HIGH">High (Pending hospital admission)</option>
                  <option value="URGENT">Urgent (Emergency escalation)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide policy numbers, hospital details, and dates to speed up resolution..."
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    color: '#0f172a',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '12px',
                  borderRadius: 8,
                  background: '#1e50b3',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  marginTop: 6
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Support Request'}
              </button>
            </form>
          </div>

          {/* Right Column: Active Tickets & FAQ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Active Tickets */}
            <div style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #e2e8f0',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>
                My Support Tickets ({tickets.length})
              </h3>

              {tickets.length === 0 ? (
                <p style={{ fontSize: '13px', color: '#64748b' }}>No support requests filed.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {tickets.map((t) => (
                    <div key={t.id} style={{ padding: '14px', background: '#f8fafc', borderRadius: 8, border: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                        <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#64748b' }}>
                          #{t.ticketNumber}
                        </span>
                        <StatusBadge status={t.status} />
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                        {t.subject}
                      </div>
                      <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0 8px', lineHeight: 1.4 }}>
                        {t.message}
                      </p>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                        Category: {t.category} • Created: {new Date(t.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FAQs Accordion */}
            <div style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #e2e8f0',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>
                Frequently Asked Questions
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: isOpen ? '#f8fafc' : '#ffffff',
                          border: 'none',
                          textAlign: 'left',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#0f172a',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <span>{faq.q}</span>
                        <span style={{ color: '#64748b' }}>{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div style={{ padding: '12px 16px', background: '#ffffff', fontSize: '12px', color: '#475569', lineHeight: 1.5, borderTop: '1px solid #f1f5f9' }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </CustomerLayout>
  );
}
