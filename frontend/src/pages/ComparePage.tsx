import { Link } from 'react-router-dom';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { useAuth, initialPlans } from '../context/AuthContext';
import type { Plan } from '../types';

export default function ComparePage() {
  const { compareList, toggleCompare, clearCompare } = useAuth();

  // If fewer than 2 items in compare list, recommend top 2 plans so users can instantly test
  const activeComparison: Plan[] =
    compareList.length > 0
      ? compareList
      : [initialPlans[0], initialPlans[1]];

  return (
    <CustomerLayout>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px 64px' }}>
          
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 32
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#0284c7',
                background: '#e0f2fe',
                padding: '4px 12px',
                borderRadius: 999
              }}>
                Side-by-Side Evaluation
              </span>
              {compareList.length === 0 && (
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#b45309',
                  background: '#fef3c7',
                  padding: '3px 10px',
                  borderRadius: 8
                }}>
                  Showing default comparison sample
                </span>
              )}
            </div>
            <h1 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              color: '#0f172a',
              margin: '8px 0 6px',
              letterSpacing: '-0.02em'
            }}>
              Compare Insurance Policies
            </h1>
            <p style={{ fontSize: 15, color: '#64748b', margin: 0 }}>
              Evaluate coverage boundaries, fine print exclusions, and insurer credibility transparently.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {compareList.length > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                style={{
                  padding: '9px 16px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Clear Selection
              </button>
            )}
            <Link
              to="/plans"
              style={{
                padding: '9px 18px',
                borderRadius: 10,
                background: '#2563eb',
                color: '#ffffff',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(37,99,235,0.25)',
                transition: 'all 0.15s ease'
              }}
            >
              + Add More Plans
            </Link>
          </div>
        </div>

        {/* Comparison Table / Matrix */}
        <div style={{
          background: '#ffffff',
          borderRadius: 20,
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{
              width: '100%',
              minWidth: 700,
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: 14
            }}>
              
              {/* Header Row: Plans */}
              <thead>
                <tr style={{ borderBottom: '1.5px solid #e2e8f0', background: '#f8fafc' }}>
                  <th style={{
                    padding: '24px 20px',
                    fontSize: 12,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#64748b',
                    width: '26%',
                    verticalAlign: 'bottom'
                  }}>
                    Plan Metrics
                  </th>
                  {activeComparison.map((plan) => (
                    <th key={plan.id} style={{
                      padding: '24px 20px',
                      verticalAlign: 'top',
                      borderLeft: '1px solid #e2e8f0'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        marginBottom: 8
                      }}>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          color: '#1e50b3',
                          background: '#eff6ff',
                          padding: '3px 8px',
                          borderRadius: 6
                        }}>
                          {plan.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleCompare(plan)}
                          style={{
                            background: '#f1f5f9',
                            border: 'none',
                            color: '#94a3b8',
                            fontSize: 12,
                            fontWeight: 700,
                            width: 26,
                            height: 26,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          title="Remove plan"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fee2e2';
                            e.currentTarget.style.color = '#dc2626';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#f1f5f9';
                            e.currentTarget.style.color = '#94a3b8';
                          }}
                        >
                          ✕
                        </button>
                      </div>

                      <h3 style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: '#0f172a',
                        margin: '6px 0 2px',
                        lineHeight: 1.3
                      }}>
                        {plan.name}
                      </h3>
                      <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 12px' }}>
                        {plan.insurerName}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 14 }}>
                        <span style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
                          ₹{plan.basePremium.toLocaleString()}
                        </span>
                        <span style={{ fontSize: 12, color: '#64748b' }}>/yr</span>
                      </div>

                      <Link
                        to={`/plans/${plan.id}`}
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          padding: '10px 14px',
                          borderRadius: 10,
                          background: '#2563eb',
                          color: '#ffffff',
                          fontSize: 13,
                          fontWeight: 700,
                          textDecoration: 'none',
                          boxShadow: '0 2px 6px rgba(37,99,235,0.2)',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#2563eb')}
                      >
                        Select This Plan →
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Coverage Limit */}
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '18px 20px', fontWeight: 700, color: '#1e293b', background: '#fafafa', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Sum Insured (Coverage)
                  </td>
                  {activeComparison.map((plan) => (
                    <td key={plan.id} style={{ padding: '18px 20px', borderLeft: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#1e50b3' }}>
                        ₹{(plan.coverageLimit / 100000).toFixed(1)} Lakhs
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Claim Settlement Ratio */}
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '18px 20px', fontWeight: 700, color: '#1e293b', background: '#fafafa', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Claim Settlement Ratio
                  </td>
                  {activeComparison.map((plan) => (
                    <td key={plan.id} style={{ padding: '18px 20px', borderLeft: '1px solid #f1f5f9' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontWeight: 700,
                        color: '#15803d',
                        background: '#dcfce7',
                        padding: '4px 10px',
                        borderRadius: 8,
                        fontSize: 13
                      }}>
                        <span>✓</span>
                        <span>{plan.claimSettlementRatio}%</span>
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Customer Satisfaction */}
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '18px 20px', fontWeight: 700, color: '#1e293b', background: '#fafafa', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Customer Satisfaction
                  </td>
                  {activeComparison.map((plan) => (
                    <td key={plan.id} style={{ padding: '18px 20px', borderLeft: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#b45309' }}>
                        <span>★ {plan.rating} / 5.0</span>
                        <span style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8' }}>({plan.reviewsCount} reviews)</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Cashless Garages / Hospitals */}
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '18px 20px', fontWeight: 700, color: '#1e293b', background: '#fafafa', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Cashless Network
                  </td>
                  {activeComparison.map((plan) => (
                    <td key={plan.id} style={{ padding: '18px 20px', borderLeft: '1px solid #f1f5f9', color: '#334155', fontWeight: 600 }}>
                      {plan.cashlessHospitals ? `${plan.cashlessHospitals.toLocaleString()}+ Network Centers` : 'Nationwide Reimbursement'}
                    </td>
                  ))}
                </tr>

                {/* Key Inclusions */}
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '18px 20px', fontWeight: 700, color: '#1e293b', background: '#fafafa', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.03em', verticalAlign: 'top' }}>
                    Key Inclusions
                  </td>
                  {activeComparison.map((plan) => (
                    <td key={plan.id} style={{ padding: '18px 20px', borderLeft: '1px solid #f1f5f9', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {plan.features.map((f, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#334155' }}>
                            <span style={{ color: '#16a34a', fontWeight: 700, marginTop: 1 }}>✓</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Exclusions */}
                <tr>
                  <td style={{ padding: '18px 20px', fontWeight: 700, color: '#991b1b', background: '#fff1f1', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.03em', verticalAlign: 'top' }}>
                    Important Exclusions
                  </td>
                  {activeComparison.map((plan) => (
                    <td key={plan.id} style={{ padding: '18px 20px', borderLeft: '1px solid #fee2e2', background: 'rgba(254,242,242,0.4)', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {plan.exclusions.map((e, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#991b1b' }}>
                            <span style={{ color: '#ef4444', fontWeight: 700, marginTop: 1 }}>✕</span>
                            <span>{e}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* Prompt to add more if 1 plan */}
        {activeComparison.length < 2 && (
          <div style={{
            marginTop: 32,
            textAlign: 'center',
            padding: 32,
            background: '#eff6ff',
            border: '1.5px solid #bfdbfe',
            borderRadius: 20
          }}>
            <h4 style={{ fontWeight: 800, color: '#1e3a8a', fontSize: 17, margin: '0 0 6px' }}>
              Add at least one more plan for true comparison
            </h4>
            <p style={{ fontSize: 13, color: '#1d4ed8', margin: '0 0 16px' }}>
              You can compare up to 3 plans side-by-side to find the right balance of price and coverage.
            </p>
            <Link
              to="/plans"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                borderRadius: 10,
                background: '#2563eb',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 13,
                textDecoration: 'none'
              }}
            >
              Browse Marketplace →
            </Link>
          </div>
        )}

      </div>
    </CustomerLayout>
  );
}
