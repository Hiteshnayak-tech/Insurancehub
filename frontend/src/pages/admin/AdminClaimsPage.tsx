import { useState, useEffect } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { StatusBadge } from '../../components/shared/StatusBadge';
import api from '../../api/axios';
import type { Claim } from '../../types';

export default function AdminClaimsPage() {
  const [claimsList, setClaimsList] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [approvedAmount, setApprovedAmount] = useState('');
  const [decisionNotes, setDecisionNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');

  const fetchAllClaims = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await api.get('/admin/claims');
      if (res.data && res.data.data) {
        setClaimsList(res.data.data);
      }
    } catch (err: any) {
      console.error('Failed to fetch admin claims:', err);
      setErrorMessage('Could not load claims catalogue from database.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllClaims();
  }, []);

  const handleUpdateStatus = async (status: Claim['status']) => {
    if (!selectedClaim) return;
    setIsUpdating(true);
    setUpdateError('');

    try {
      const payload = {
        status,
        amountApproved: status === 'APPROVED' || status === 'SETTLED'
          ? (Number(approvedAmount) || selectedClaim.amountClaimed)
          : 0,
        adminRemarks: decisionNotes || `Claim status updated to ${status} by claims officer.`
      };

      const res = await api.patch(`/admin/claims/${selectedClaim.id}/status`, payload);
      if (res.data && res.data.data) {
        setClaimsList(prev =>
          prev.map(c => (c.id === selectedClaim.id ? res.data.data : c))
        );
      } else {
        await fetchAllClaims();
      }

      setSelectedClaim(null);
      setApprovedAmount('');
      setDecisionNotes('');
    } catch (err: any) {
      console.error('Failed to update claim status:', err);
      setUpdateError(err.response?.data?.message || 'Failed to update claim status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AdminLayout
      title="Claims Adjudication Desk"
      breadcrumb={[{ label: 'Admin Console' }, { label: 'Claims' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Adjudication Guidelines Banner */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 10,
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
              TPA Regulatory Mandate: 60-Min Cashless SLA
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: 2 }}>
              IRDAI guidelines require initial hospital intimation decisions within 1 hour and discharge billing within 3 hours.
            </div>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#16a34a', background: '#ecfdf5', padding: '4px 10px', borderRadius: 6 }}>
            Compliance Healthy (99.2%)
          </span>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div style={{
            background: '#fff1f1',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            borderRadius: 8,
            padding: '12px 16px',
            fontSize: '13px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{errorMessage}</span>
            <button
              onClick={fetchAllClaims}
              style={{ background: 'none', border: 'none', color: '#1e50b3', fontWeight: 600, cursor: 'pointer' }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Claims Table Container */}
        <div style={{ background: '#ffffff', borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          {isLoading ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
              <div style={{ fontSize: '28px', marginBottom: 8 }}>⏳</div>
              <div>Fetching real-time claims from database...</div>
            </div>
          ) : claimsList.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
              <div style={{ fontSize: '32px', marginBottom: 8 }}>⚖️</div>
              <div style={{ fontWeight: 600, color: '#0f172a' }}>No claims found in database</div>
              <div style={{ fontSize: '13px', marginTop: 4 }}>Customer submissions will appear here live.</div>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 16px' }}>Claim # &amp; Policy</th>
                  <th style={{ padding: '12px 16px' }}>Claim Type</th>
                  <th style={{ padding: '12px 16px' }}>Insurer</th>
                  <th style={{ padding: '12px 16px' }}>Claimed / Approved</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Adjudication</th>
                </tr>
              </thead>
              <tbody>
                {claimsList.map((claim) => (
                  <tr key={claim.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0f172a' }}>
                        #{claim.claimNumber}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        Policy #{claim.policyNumber} {claim.customerName ? `• ${claim.customerName}` : ''}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                      {claim.claimType}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748b' }}>
                      {claim.insurerName}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>
                        ₹{Number(claim.amountClaimed).toLocaleString('en-IN')}
                      </div>
                      {claim.amountApproved ? (
                        <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>
                          Approved: ₹{Number(claim.amountApproved).toLocaleString('en-IN')}
                        </div>
                      ) : null}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <StatusBadge status={claim.status} />
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => {
                          setSelectedClaim(claim);
                          setApprovedAmount(claim.amountApproved ? claim.amountApproved.toString() : claim.amountClaimed.toString());
                          setDecisionNotes(claim.adminRemarks || '');
                          setUpdateError('');
                        }}
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
                        Review &amp; Decide
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal: Adjudicate Claim */}
        {selectedClaim && (
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
              maxWidth: 500,
              width: '100%',
              padding: 28,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  Claim Adjudication #{selectedClaim.claimNumber}
                </h3>
                <button
                  onClick={() => setSelectedClaim(null)}
                  style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#64748b' }}
                >
                  ✕
                </button>
              </div>

              {updateError && (
                <div style={{
                  background: '#fff1f1',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  padding: '8px 12px',
                  borderRadius: 6,
                  fontSize: '12px',
                  marginBottom: 12
                }}>
                  {updateError}
                </div>
              )}

              <div style={{ background: '#f8fafc', borderRadius: 8, padding: 14, marginBottom: 16, border: '1px solid #e2e8f0', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#64748b' }}>Policy:</span>
                  <strong>#{selectedClaim.policyNumber} ({selectedClaim.planName})</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#64748b' }}>Underwriter:</span>
                  <strong>{selectedClaim.insurerName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#64748b' }}>Customer:</span>
                  <strong>{selectedClaim.customerName || selectedClaim.customerEmail || 'Customer'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Claimed Amount:</span>
                  <strong style={{ color: '#0f172a' }}>₹{Number(selectedClaim.amountClaimed).toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Approved Settlement Amount (₹)
                </label>
                <input
                  type="number"
                  value={approvedAmount}
                  onChange={(e) => setApprovedAmount(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Adjudicator Notes / Remarks
                </label>
                <textarea
                  rows={3}
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder="e.g., Hospital discharge invoice verified against room rent sub-limit..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                <button
                  disabled={isUpdating}
                  onClick={() => handleUpdateStatus('APPROVED')}
                  style={{
                    padding: '10px',
                    borderRadius: 8,
                    background: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: isUpdating ? 'not-allowed' : 'pointer'
                  }}
                >
                  ✓ Approve
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleUpdateStatus('SETTLED')}
                  style={{
                    padding: '10px',
                    borderRadius: 8,
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: isUpdating ? 'not-allowed' : 'pointer'
                  }}
                >
                  💰 Settle Funds
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleUpdateStatus('REJECTED')}
                  style={{
                    padding: '10px',
                    borderRadius: 8,
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: isUpdating ? 'not-allowed' : 'pointer'
                  }}
                >
                  ✕ Reject
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
