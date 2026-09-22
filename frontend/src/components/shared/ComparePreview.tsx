import { Link } from 'react-router-dom';
import { useAuth, initialPlans } from '../../context/AuthContext';

export function ComparePreview() {
  const { compareList, toggleCompare, isInCompare } = useAuth();

  // If user has selected plans for compare, use those; otherwise use the top 2 initial plans
  const displayPlans = compareList.length >= 2 
    ? compareList.slice(0, 2) 
    : [initialPlans[0], initialPlans[1]];

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 28
      }}>
        <div style={{ maxWidth: 640 }}>
          <span style={{
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#1e50b3',
            background: '#eff6ff',
            padding: '4px 12px',
            borderRadius: 999,
            marginBottom: 8
          }}>
            Side-by-Side Evaluation
          </span>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 800,
            color: '#0f172a',
            margin: '6px 0 8px',
            lineHeight: 1.2
          }}>
            Compare Before You Commit
          </h2>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.5 }}>
            Examine coverage boundaries, room rent caps, claim settlement ratios, and fine print exclusions across leading plans without insurer bias.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link
            to="/compare"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 18px',
              borderRadius: 12,
              background: '#2563eb',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(37,99,235,0.25)',
              transition: 'background 0.15s ease'
            }}
          >
            Open Full Comparison Matrix ({compareList.length > 0 ? compareList.length : 'All'}) →
          </Link>
        </div>
      </div>

      {/* Side-by-side preview cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 24,
        alignItems: 'stretch'
      }}>
        {displayPlans.map((plan, idx) => (
          <div
            key={plan.id}
            style={{
              background: '#ffffff',
              borderRadius: 20,
              border: '1.5px solid #e2e8f0',
              padding: '24px 22px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#1e50b3',
                  background: '#f0f6ff',
                  padding: '3px 10px',
                  borderRadius: 6
                }}>
                  {plan.category} • Plan #{idx + 1}
                </span>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#d97706',
                  background: '#fffbeb',
                  padding: '3px 8px',
                  borderRadius: 6
                }}>
                  <span>★</span>
                  <span>{plan.rating}</span>
                </div>
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                {plan.name}
              </h3>
              <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 16px' }}>
                {plan.insurerName}
              </p>

              {/* Key numbers */}
              <div style={{
                background: '#f8fafc',
                borderRadius: 14,
                padding: '14px 16px',
                border: '1px solid #e2e8f0',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                marginBottom: 16
              }}>
                <div>
                  <span style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Sum Insured</span>
                  <p style={{ fontSize: 16, fontWeight: 800, color: '#1e50b3', margin: '2px 0 0' }}>
                    ₹{(plan.coverageLimit / 100000).toFixed(1)} L
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Claim Ratio</span>
                  <p style={{ fontSize: 16, fontWeight: 800, color: '#16a34a', margin: '2px 0 0' }}>
                    {plan.claimSettlementRatio}%
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#475569', marginBottom: 8 }}>
                  Key Inclusions:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {plan.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} style={{ fontSize: 12, color: '#334155', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#b91c1c', marginBottom: 8 }}>
                  Important Exclusion:
                </p>
                <div style={{ fontSize: 12, color: '#b91c1c', background: '#fff1f1', padding: '8px 10px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>✕</span>
                  <span>{plan.exclusions[0] || 'Standard exclusions apply'}</span>
                </div>
              </div>
            </div>

            {/* Bottom price and actions */}
            <div style={{
              paddingTop: 16,
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8
            }}>
              <div>
                <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Starting at</p>
                <p style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  ₹{plan.basePremium.toLocaleString()}<span style={{ fontSize: 11, fontWeight: 500, color: '#64748b' }}>/yr</span>
                </p>
              </div>

              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  type="button"
                  onClick={() => toggleCompare(plan)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: isInCompare(plan.id) ? '#38bdf8' : '#e2e8f0',
                    background: isInCompare(plan.id) ? '#f0f9ff' : '#ffffff',
                    color: isInCompare(plan.id) ? '#0284c7' : '#475569'
                  }}
                >
                  {isInCompare(plan.id) ? '✓ In Compare' : '+ Compare'}
                </button>
                <Link
                  to={`/plans/${plan.id}`}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    background: '#2563eb',
                    color: '#ffffff',
                    textDecoration: 'none'
                  }}
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
