import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/shared/StatusBadge';
import api from '../../api/axios';
import type { Claim } from '../../types';

export default function ClaimsPage() {
  const { user, policies } = useAuth();
  const [claimsList, setClaimsList] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [selectedPolicyNo, setSelectedPolicyNo] = useState(policies[0]?.policyNumber || 'POL-2026-98124');
  const [claimType, setClaimType] = useState('Cashless Hospitalization');
  const [amount, setAmount] = useState('45000');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const fetchClaims = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const email = user?.email || 'demo@insurehub.com';
      const res = await api.get(`/claims/my?email=${encodeURIComponent(email)}`);
      if (res.data && res.data.data) {
        setClaimsList(res.data.data);
      }
    } catch (err: any) {
      console.error('Failed to fetch claims:', err);
      setErrorMessage('Could not load claims from server. Please refresh or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [user?.email]);

  const handleCreateClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const relatedPolicy = policies.find(p => p.policyNumber === selectedPolicyNo) || policies[0];

    try {
      const payload = {
        policyNumber: selectedPolicyNo || relatedPolicy?.policyNumber || 'POL-2026-98124',
        planName: relatedPolicy?.planName || 'CareShield Comprehensive Health',
        insurerName: relatedPolicy?.insurerName || 'Star Health Care',
        claimType,
        amountClaimed: Number(amount) || 25000,
        description: description || 'Claim filed via online customer self-service portal.',
        customerEmail: user?.email || 'demo@insurehub.com',
        customerName: user ? `${user.firstName} ${user.lastName}` : 'Demo Customer',
        documents: ['Hospital_Discharge_Summary.pdf', 'Final_Bill_Receipt.pdf']
      };

      const res = await api.post('/claims', payload);
      if (res.data && res.data.data) {
        setClaimsList(prev => [res.data.data, ...prev]);
      } else {
        await fetchClaims();
      }

      setIsModalOpen(false);
      setDescription('');
    } catch (err: any) {
      console.error('Failed to submit claim:', err);
      setSubmitError(err.response?.data?.message || 'Failed to submit claim. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomerLayout>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px 64px' }}>
        
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: 8, display: 'flex', gap: 6 }}>
            <Link to="/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>Customer Portal</Link>
            <span>/</span>
            <span style={{ color: '#1e50b3', fontWeight: 600 }}>Claims Center</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Insurance Claims Center
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', marginTop: 4 }}>
                File digital claims, track inspection status, and upload hospital bills or surveyor reports.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitError('');
                setIsModalOpen(true);
              }}
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                background: '#1e50b3',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              ⚖️ File a New Claim
            </button>
          </div>
        </div>

        {/* Informative Step Bar */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: '20px',
          marginBottom: 32,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16
        }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e50b3' }}>STEP 1</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: 2 }}>File Intimation</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: 2 }}>Submit incident and hospital admission info</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#d97706' }}>STEP 2</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: 2 }}>Survey &amp; Review</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: 2 }}>TPA medical team or loss surveyor reviews evidence</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>STEP 3</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: 2 }}>Direct Settlement</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: 2 }}>Approved funds credited to hospital or account</div>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div style={{
            background: '#fff1f1',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            borderRadius: 8,
            padding: '12px 16px',
            marginBottom: 20,
            fontSize: '13px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{errorMessage}</span>
            <button
              onClick={fetchClaims}
              style={{ background: 'none', border: 'none', color: '#1e50b3', fontWeight: 600, cursor: 'pointer' }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
            <div style={{ fontSize: '32px', marginBottom: 12 }}>⏳</div>
            <div style={{ fontSize: '15px', fontWeight: 600 }}>Loading your persisted claims from server...</div>
          </div>
        ) : (
          /* Claims List */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {claimsList.length === 0 ? (
              <div style={{
                background: '#ffffff',
                borderRadius: 14,
                border: '1.5px dashed #cbd5e1',
                padding: '60px 24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '42px', marginBottom: 12 }}>⚖️</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>
                  No claims recorded
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px' }}>
                  You haven't filed any insurance claims yet.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: 8,
                    background: '#1e50b3',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  File Your First Claim
                </button>
              </div>
            ) : (
              claimsList.map((claim) => (
                <div
                  key={claim.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                    padding: '24px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: '14px', fontFamily: 'monospace', fontWeight: 700, color: '#1e50b3' }}>
                          #{claim.claimNumber}
                        </span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>
                          • Linked Policy: #{claim.policyNumber}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                        {claim.claimType}
                      </h3>
                      <div style={{ fontSize: '13px', color: '#64748b', marginTop: 2 }}>
                        {claim.planName} • Underwriter: {claim.insurerName}
                      </div>
                    </div>

                    <StatusBadge status={claim.status} size="md" />
                  </div>

                  {/* Amount and Dates Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: 12,
                    padding: '12px 16px',
                    background: '#f8fafc',
                    borderRadius: 8,
                    marginBottom: 16
                  }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>Amount Claimed</div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                        ₹{Number(claim.amountClaimed).toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>Amount Approved</div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: claim.amountApproved ? '#16a34a' : '#64748b' }}>
                        {claim.amountApproved ? `₹${Number(claim.amountApproved).toLocaleString('en-IN')}` : 'Pending Evaluation'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>Date Submitted</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                        {new Date(claim.submittedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>Last Activity</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                        {claim.lastUpdated ? new Date(claim.lastUpdated).toLocaleDateString() : new Date(claim.submittedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: '0 0 16px' }}>
                    <strong>Claim Description:</strong> {claim.description}
                  </p>

                  {/* Admin Remarks if any */}
                  {claim.adminRemarks && (
                    <div style={{
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: 8,
                      padding: '10px 14px',
                      marginBottom: 16,
                      fontSize: '12px',
                      color: '#1e40af'
                    }}>
                      <strong>👨‍💼 Adjudication Note:</strong> {claim.adminRemarks}
                    </div>
                  )}

                  {claim.documents && claim.documents.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '12px', color: '#64748b' }}>
                      <span>📎 Attached Documents:</span>
                      {claim.documents.map((doc, idx) => (
                        <span key={idx} style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: 4, color: '#334155' }}>
                          {doc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal: File New Claim */}
        {isModalOpen && (
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  File an Insurance Claim
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#64748b' }}
                >
                  ✕
                </button>
              </div>

              {submitError && (
                <div style={{
                  background: '#fff1f1',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  padding: '8px 12px',
                  borderRadius: 6,
                  fontSize: '12px',
                  marginBottom: 12
                }}>
                  {submitError}
                </div>
              )}

              <form onSubmit={handleCreateClaim} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                    Select Enrolled Policy *
                  </label>
                  <select
                    value={selectedPolicyNo}
                    onChange={(e) => setSelectedPolicyNo(e.target.value)}
                    required
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
                    {policies.length > 0 ? (
                      policies.map(p => (
                        <option key={p.id} value={p.policyNumber}>
                          {p.policyNumber} — {p.planName} ({p.insurerName})
                        </option>
                      ))
                    ) : (
                      <option value="POL-2026-98124">
                        POL-2026-98124 — CareShield Comprehensive Health (Star Health Care)
                      </option>
                    )}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                    Claim Nature / Category *
                  </label>
                  <select
                    value={claimType}
                    onChange={(e) => setClaimType(e.target.value)}
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
                    <option value="Cashless Hospitalization">Cashless Hospitalization</option>
                    <option value="Medical Reimbursement">Medical Reimbursement</option>
                    <option value="Motor Accidental Damage">Motor Accidental Damage</option>
                    <option value="Property Burglary / Fire">Property Burglary / Fire</option>
                    <option value="Travel Flight Delay / Baggage">Travel Flight Delay / Baggage</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                    Claimed Expense Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="45000"
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
                    Brief Incident Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe diagnosis, hospital name, date of admission, or accident circumstances..."
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

                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 8,
                      background: '#1e50b3',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? 'Submitting Claim...' : 'Submit Claim'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      padding: '10px 16px',
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
