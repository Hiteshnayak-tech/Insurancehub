import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/shared/StatusBadge';
import type { Renewal } from '../../types';

export default function RenewalsPage() {
  const { renewals } = useAuth();
  const [localRenewals, setLocalRenewals] = useState<Renewal[]>(renewals);
  const [selectedRenewal, setSelectedRenewal] = useState<Renewal | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handlePayRenewal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRenewal) return;

    setIsProcessing(true);
    setTimeout(() => {
      setLocalRenewals(prev =>
        prev.map(r =>
          r.id === selectedRenewal.id
            ? { ...r, status: 'RENEWED', daysLeft: 365, dueDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0] }
            : r
        )
      );
      setIsProcessing(false);
      setSuccessMessage(`Policy ${selectedRenewal.policyNumber} renewed successfully! Next validity active.`);
      setSelectedRenewal(null);
    }, 1000);
  };

  return (
    <CustomerLayout>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px 64px' }}>
        
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: 8, display: 'flex', gap: 6 }}>
            <Link to="/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>Customer Portal</Link>
            <span>/</span>
            <span style={{ color: '#1e50b3', fontWeight: 600 }}>Renewals</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Policy Renewal Center
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: 4 }}>
            Ensure continuous protection and prevent policy lapses with seamless instant renewal.
          </p>
        </div>

        {successMessage && (
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            padding: '12px 16px',
            borderRadius: 8,
            marginBottom: 24,
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>✓ {successMessage}</span>
            <button
              onClick={() => setSuccessMessage('')}
              style={{ background: 'none', border: 'none', color: '#065f46', cursor: 'pointer', fontSize: 16 }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Informative Renewal Callout */}
        <div style={{
          background: '#fffbeb',
          border: '1px solid #fef08a',
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12
        }}>
          <span style={{ fontSize: '20px' }}>⚠️</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400e' }}>
              Why continuous coverage matters
            </div>
            <div style={{ fontSize: '12px', color: '#b45309', marginTop: 2, lineHeight: 1.4 }}>
              Allowing your health or motor policy to lapse forfeits accrued <strong>No Claim Bonuses (up to 100%)</strong> and restarts pre-existing disease waiting periods.
            </div>
          </div>
        </div>

        {/* Renewals List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
          {localRenewals.map((renewal) => {
            const isRenewed = renewal.status === 'RENEWED';
            return (
              <div
                key={renewal.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 12,
                  border: isRenewed ? '1px solid #e2e8f0' : '2px solid #fde68a',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#1e50b3', background: '#eff6ff', padding: '2px 8px', borderRadius: 4 }}>
                      {renewal.category}
                    </span>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '6px 0 2px' }}>
                      {renewal.planName}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      Policy #{renewal.policyNumber} • {renewal.insurerName}
                    </div>
                  </div>

                  <StatusBadge status={renewal.status} size="md" />
                </div>

                <div style={{
                  background: '#f8fafc',
                  borderRadius: 8,
                  padding: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid #f1f5f9'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Due Date</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                      {new Date(renewal.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Days Left</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: isRenewed ? '#16a34a' : '#d97706' }}>
                      {isRenewed ? 'Covered' : `${renewal.daysLeft} days`}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Renewal Premium</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                      ₹{renewal.renewalPremium.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                  {isRenewed ? (
                    <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>
                      ✓ Policy Active for Current Year
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedRenewal(renewal)}
                      style={{
                        padding: '9px 18px',
                        borderRadius: 8,
                        background: '#1e50b3',
                        color: '#ffffff',
                        fontSize: '13px',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Renew Policy Now →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Renewal Checkout */}
        {selectedRenewal && (
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
              maxWidth: 480,
              width: '100%',
              padding: 28,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  Confirm Policy Renewal
                </h3>
                <button
                  onClick={() => setSelectedRenewal(null)}
                  style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#64748b' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: 8, padding: 14, marginBottom: 16, border: '1px solid #e2e8f0', fontSize: '13px' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedRenewal.planName}</div>
                <div style={{ color: '#64748b', fontSize: '12px', marginTop: 2 }}>
                  Policy #{selectedRenewal.policyNumber} • Underwriter: {selectedRenewal.insurerName}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 8, borderTop: '1px solid #e2e8f0' }}>
                  <span>Annual Renewal Amount:</span>
                  <strong style={{ fontSize: '15px', color: '#0f172a' }}>
                    ₹{selectedRenewal.renewalPremium.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              <form onSubmit={handlePayRenewal}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 8 }}>
                    Payment Mode
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['UPI', 'Netbanking', 'Credit Card'].map((mode) => (
                      <button
                        type="button"
                        key={mode}
                        onClick={() => setPaymentMethod(mode)}
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: 8,
                          border: paymentMethod === mode ? '2px solid #1e50b3' : '1px solid #cbd5e1',
                          background: paymentMethod === mode ? '#eff6ff' : '#ffffff',
                          color: paymentMethod === mode ? '#1e50b3' : '#475569',
                          fontWeight: 600,
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    style={{
                      flex: 1,
                      padding: '11px',
                      borderRadius: 8,
                      background: '#16a34a',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: isProcessing ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isProcessing ? 'Processing Payment...' : `Authorize ₹${selectedRenewal.renewalPremium.toLocaleString('en-IN')}`}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRenewal(null)}
                    style={{
                      padding: '11px 16px',
                      borderRadius: 8,
                      background: '#f1f5f9',
                      color: '#475569',
                      fontSize: '13px',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </CustomerLayout>
  );
}
