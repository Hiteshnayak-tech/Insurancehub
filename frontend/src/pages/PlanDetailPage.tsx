import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { useAuth, initialPlans } from '../context/AuthContext';
import type { Plan } from '../types';

export default function PlanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, addPolicy, toggleCompare, isInCompare } = useAuth();

  const plan: Plan | undefined = initialPlans.find((p) => p.id === Number(id));

  // Purchase Modal State
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [tenureYears, setTenureYears] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [generatedPolicyNumber, setGeneratedPolicyNumber] = useState('');

  if (!plan) {
    return (
      <CustomerLayout>
        <div style={{ padding: '80px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>Plan Not Found</h2>
          <p style={{ color: '#64748b', marginTop: '8px', marginBottom: '24px' }}>The insurance plan you requested does not exist or has been discontinued.</p>
          <Link to="/plans" style={{ padding: '10px 20px', borderRadius: '8px', background: '#1e50b3', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
            Back to Marketplace
          </Link>
        </div>
      </CustomerLayout>
    );
  }

  const inComp = isInCompare(plan.id);
  const finalPrice = plan.basePremium * tenureYears;

  const handlePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const created = addPolicy(plan, tenureYears, paymentMethod);
      setIsProcessing(false);
      setGeneratedPolicyNumber(created.policyNumber);
      setPurchaseSuccess(true);
    }, 1200);
  };

  return (
    <CustomerLayout>
      <div className="plan-details-page" style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px 64px' }}>

          {/* Back breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: 24 }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: '12px', fontWeight: 600, padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1e50b3')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
            >
              ← Back
            </button>
            <span>/</span>
            <Link to="/plans" style={{ color: '#64748b', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1e50b3')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
            >Plans</Link>
            <span>/</span>
            <span style={{ color: '#0f172a' }}>{plan.name}</span>
          </div>

          {/* Two-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 28, alignItems: 'start' }}>

            {/* Left Column: Plan In-Depth Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Primary Card */}
              <div style={{
                background: '#ffffff', borderRadius: 20, border: '1px solid #e2e8f0',
                padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                      color: '#1e40af', background: '#eff6ff', padding: '4px 12px', borderRadius: 9999
                    }}>
                      {plan.category} Insurance
                    </span>
                    {plan.popular && (
                      <span style={{
                        fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                        color: '#92400e', background: '#fffbeb', padding: '4px 12px', borderRadius: 9999
                      }}>
                        ⭐ Popular Choice
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleCompare(plan)}
                    style={{
                      padding: '6px 14px', borderRadius: 12, fontSize: '12px', fontWeight: 600,
                      border: `1.5px solid ${inComp ? '#22d3ee' : '#e2e8f0'}`,
                      background: inComp ? '#ecfeff' : '#f8fafc',
                      color: inComp ? '#0e7490' : '#475569',
                      cursor: 'pointer', transition: 'all 0.15s'
                    }}
                  >
                    {inComp ? '✓ In Compare List' : '+ Add to Compare'}
                  </button>
                </div>

                <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {plan.name}
                </h1>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginTop: 4 }}>
                  Offered by <span style={{ color: '#1e50b3', fontWeight: 700 }}>{plan.insurerName}</span>
                </p>

                <p style={{ color: '#475569', fontSize: '14px', marginTop: 16, lineHeight: 1.7 }}>
                  {plan.description}
                </p>

                {/* Quantitative Grid */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: 14, marginTop: 24, paddingTop: 24, borderTop: '1px solid #f1f5f9'
                }}>
                  <div style={{ padding: 14, background: '#f8fafc', borderRadius: 14 }}>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Sum Insured Limit</p>
                    <p style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginTop: 4 }}>
                      ₹{(plan.coverageLimit / 100000).toFixed(1)} Lakhs
                    </p>
                  </div>
                  <div style={{ padding: 14, background: '#f8fafc', borderRadius: 14 }}>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Claim Settlement Ratio</p>
                    <p style={{ fontSize: '17px', fontWeight: 700, color: '#16a34a', marginTop: 4 }}>
                      {plan.claimSettlementRatio}%
                    </p>
                  </div>
                  <div style={{ padding: 14, background: '#f8fafc', borderRadius: 14 }}>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Cashless Network</p>
                    <p style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginTop: 4 }}>
                      {plan.cashlessHospitals ? `${plan.cashlessHospitals.toLocaleString()}+ centers` : 'Nationwide Claim'}
                    </p>
                  </div>
                </div>
              </div>

              {/* What's Covered (Features) */}
              <div style={{
                background: '#ffffff', borderRadius: 20, border: '1px solid #e2e8f0',
                padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 8, background: '#f0fdf4', color: '#16a34a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px'
                  }}>✓</span>
                  <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>What is Covered (Key Features)</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
                  {plan.features.map((feat, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10, padding: 12,
                      borderRadius: 12, background: '#f8fafc', fontSize: '13px', color: '#334155'
                    }}>
                      <span style={{ color: '#16a34a', fontWeight: 700, marginTop: 1 }}>✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Exclusions (Transparency highlight) */}
              <div style={{
                background: '#ffffff', borderRadius: 20, border: '1px solid rgba(244,63,94,0.25)',
                padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 8, background: '#fff1f2', color: '#e11d48',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px'
                  }}>✕</span>
                  <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Transparent Exclusions &amp; Waiting Periods</h2>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: 16 }}>
                  We believe in zero surprises when filing a claim. The following circumstances are strictly not covered under this standard contract:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {plan.exclusions.map((excl, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10, padding: 12,
                      borderRadius: 12, background: '#fff5f5', border: '1px solid #fecaca', fontSize: '13px', color: '#334155'
                    }}>
                      <span style={{ color: '#e11d48', fontWeight: 700, marginTop: 1 }}>✕</span>
                      <span>{excl}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Pricing & Checkout Action */}
            <div>
              <div style={{
                background: '#ffffff', borderRadius: 20, border: '1px solid #e2e8f0',
                padding: 24, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', position: 'sticky', top: 84
              }}>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>Total Premium</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                    <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>₹{finalPrice.toLocaleString()}</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>for {tenureYears} {tenureYears > 1 ? 'years' : 'year'}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, marginTop: 4 }}>✓ Includes all applicable regulatory GST &amp; fees</p>
                </div>

                {/* Tenure Selector */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 8 }}>Policy Duration</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {[1, 2, 3].map((yr) => (
                      <button
                        type="button"
                        key={yr}
                        onClick={() => setTenureYears(yr)}
                        style={{
                          padding: '9px 0', borderRadius: 12, fontSize: '12px', fontWeight: 600,
                          border: `1.5px solid ${tenureYears === yr ? '#2563eb' : '#e2e8f0'}`,
                          background: tenureYears === yr ? '#2563eb' : '#f8fafc',
                          color: tenureYears === yr ? '#ffffff' : '#475569',
                          cursor: 'pointer', transition: 'all 0.15s',
                          boxShadow: tenureYears === yr ? '0 2px 6px rgba(37,99,235,0.2)' : 'none'
                        }}
                      >
                        {yr} {yr === 1 ? 'Year' : 'Years'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Purchase Button */}
                <button
                  type="button"
                  onClick={() => setPurchaseModalOpen(true)}
                  style={{
                    width: '100%', padding: '14px 0', borderRadius: 12,
                    background: '#2563eb', color: '#ffffff', fontWeight: 700, fontSize: '14px',
                    border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                    boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#1d4ed8')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#2563eb')}
                >
                  <span>⚡</span> Instant Simulated Purchase
                </button>

                <div style={{ textAlign: 'center', marginTop: 12 }}>
                  <Link
                    to="/calculator"
                    style={{ fontSize: '12px', color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    Calculate custom quotation with age factor →
                  </Link>
                </div>

                <div style={{
                  paddingTop: 16, marginTop: 16, borderTop: '1px solid #f1f5f9',
                  display: 'flex', flexDirection: 'column', gap: 10, fontSize: '11px', color: '#64748b'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>🛡️</span>
                    <span>15-Day Free Look Guarantee Cancellation</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>⚡</span>
                    <span>Instant Digital Policy Issuance</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>📜</span>
                    <span>Recognized Tax Saving Certificate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

      {/* ── PURCHASE SIMULATION MODAL ── */}
      {purchaseModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 50,
          background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{
            background: '#ffffff', borderRadius: 20, maxWidth: 440, width: '100%',
            padding: '24px 28px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            border: '1px solid #f1f5f9', maxHeight: '90vh', overflowY: 'auto'
          }}>
            {!purchaseSuccess ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #f1f5f9' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Simulate Policy Purchase</h3>
                  <button
                    type="button"
                    onClick={() => setPurchaseModalOpen(false)}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer', padding: 4 }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ padding: 12, background: '#eff6ff', borderRadius: 14, border: '1px solid #dbeafe', fontSize: '12px' }}>
                  <p style={{ fontWeight: 700, color: '#1e3a5f', margin: 0 }}>{plan.name}</p>
                  <p style={{ color: '#2563eb', marginTop: 2 }}>{plan.insurerName} • {tenureYears} Year Coverage</p>
                  <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px', marginTop: 4 }}>Total: ₹{finalPrice.toLocaleString()}</p>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>Insured Member Name</label>
                  <input
                    type="text"
                    defaultValue={user ? `${user.firstName} ${user.lastName}` : 'Rahul Sharma'}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 12,
                      border: '1.5px solid #e2e8f0', fontSize: '13px', fontWeight: 500,
                      color: '#0f172a', background: '#f8fafc', outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>Select Simulated Payment Method</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {['UPI', 'Credit Card', 'Net Banking'].map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        style={{
                          padding: '9px 4px', borderRadius: 12, fontSize: '12px', fontWeight: 600,
                          border: `1.5px solid ${paymentMethod === method ? '#2563eb' : '#e2e8f0'}`,
                          background: paymentMethod === method ? '#2563eb' : '#f8fafc',
                          color: paymentMethod === method ? '#ffffff' : '#475569',
                          cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center'
                        }}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop: 12 }}>
                  <button
                    type="button"
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    style={{
                      width: '100%', padding: '12px 0', borderRadius: 12,
                      background: '#16a34a', color: '#ffffff', fontWeight: 700, fontSize: '14px',
                      border: 'none', cursor: isProcessing ? 'not-allowed' : 'pointer',
                      opacity: isProcessing ? 0.7 : 1,
                      boxShadow: '0 4px 12px rgba(22,163,74,0.25)',
                      transition: 'all 0.15s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                    }}
                  >
                    {isProcessing ? (
                      <>
                        <span>⏳</span>
                        <span>Confirming Simulated Payment...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay ₹{finalPrice.toLocaleString()} &amp; Issue Policy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{
                  width: 56, height: 56, background: '#dcfce7', color: '#16a34a',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', margin: '0 auto'
                }}>✓</div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Policy Issued Successfully!</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: 4 }}>Your coverage is active. Stored in your dashboard.</p>
                </div>

                <div style={{
                  background: '#f8fafc', padding: 16, borderRadius: 14,
                  border: '1px solid #e2e8f0', textAlign: 'left', fontSize: '12px',
                  display: 'flex', flexDirection: 'column', gap: 8
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Policy Number:</span>
                    <span style={{ fontWeight: 700, color: '#2563eb' }}>{generatedPolicyNumber}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Plan:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{plan.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Status:</span>
                    <span style={{ fontWeight: 700, color: '#16a34a' }}>ACTIVE</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setPurchaseModalOpen(false);
                      setPurchaseSuccess(false);
                    }}
                    style={{
                      flex: 1, padding: '10px 0', borderRadius: 12,
                      border: '1.5px solid #e2e8f0', background: '#ffffff',
                      fontSize: '12px', fontWeight: 600, color: '#475569', cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPurchaseModalOpen(false);
                      navigate('/dashboard');
                    }}
                    style={{
                      flex: 1, padding: '10px 0', borderRadius: 12,
                      border: 'none', background: '#2563eb',
                      fontSize: '12px', fontWeight: 600, color: '#ffffff', cursor: 'pointer'
                    }}
                  >
                    Go to Dashboard →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      </div>
    </CustomerLayout>
  );
}
