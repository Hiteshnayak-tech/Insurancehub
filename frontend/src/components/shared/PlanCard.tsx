import { Link } from 'react-router-dom';
import type { Plan } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const { compareList, toggleCompare, savedPlans, toggleSavedPlan } = useAuth();
  const isCompared = compareList.some(p => p.id === plan.id);
  const isSaved = savedPlans?.some(p => p.id === plan.id) ?? false;

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 14,
      border: plan.popular ? '2px solid #2563eb' : '1px solid #e2e8f0',
      boxShadow: plan.popular ? '0 8px 24px rgba(37,99,235,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}>
      {plan.popular && (
        <div style={{
          position: 'absolute',
          top: -12,
          right: 20,
          background: 'linear-gradient(135deg, #1e50b3 0%, #0ea5e9 100%)',
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          padding: '3px 12px',
          borderRadius: 9999,
          boxShadow: '0 2px 8px rgba(30,80,179,0.3)'
        }}>
          Most Popular
        </div>
      )}

      {/* Header: Insurer & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <span style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#1e50b3',
            background: '#eff6ff',
            padding: '3px 8px',
            borderRadius: 6
          }}>
            {plan.category} Insurance
          </span>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginTop: 8, marginBottom: 4 }}>
            {plan.name}
          </h3>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>By <strong>{plan.insurerName}</strong></span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 2, color: '#d97706', fontWeight: 600 }}>
              ★ {plan.rating}
            </span>
            <span>({plan.reviewsCount} reviews)</span>
          </div>
        </div>

        <button
          onClick={() => toggleSavedPlan(plan)}
          title={isSaved ? "Remove from saved" : "Save for later"}
          style={{
            background: isSaved ? '#fee2e2' : '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '50%',
            width: 34,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 14,
            color: isSaved ? '#ef4444' : '#94a3b8'
          }}
        >
          {isSaved ? '❤️' : '🤍'}
        </button>
      </div>

      <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: 16 }}>
        {plan.description}
      </p>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        padding: '12px',
        background: '#f8fafc',
        borderRadius: 8,
        marginBottom: 16,
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Sum Insured</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
            ₹{(plan.coverageLimit / 100000).toFixed(1)} Lakh
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>CSR Ratio</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#16a34a' }}>
            {plan.claimSettlementRatio}%
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Hospitals</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
            {plan.cashlessHospitals ? `${plan.cashlessHospitals}+` : 'Direct'}
          </div>
        </div>
      </div>

      {/* Features List */}
      <div style={{ marginBottom: 20, flex: 1 }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
          Key Benefits
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {plan.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} style={{ fontSize: '13px', color: '#334155', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#16a34a', fontWeight: 700, fontSize: 14 }}>✓</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing & CTA */}
      <div style={{
        borderTop: '1px solid #f1f5f9',
        paddingTop: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Starting from</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
            ₹{plan.basePremium.toLocaleString('en-IN')}
            <span style={{ fontSize: '12px', fontWeight: 400, color: '#64748b' }}> /yr</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => toggleCompare(plan)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: `1.5px solid ${isCompared ? '#2563eb' : '#cbd5e1'}`,
              background: isCompared ? '#eff6ff' : '#ffffff',
              color: isCompared ? '#2563eb' : '#475569',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {isCompared ? '✓ Compared' : '+ Compare'}
          </button>

          <Link
            to={`/plans/${plan.id}`}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: '#1e50b3',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
