import { Link } from 'react-router-dom';
import type { Policy } from '../../types';
import { StatusBadge } from './StatusBadge';

interface PolicyCardProps {
  policy: Policy;
  onDownload?: (policy: Policy) => void;
}

export function PolicyCard({ policy, onDownload }: PolicyCardProps) {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 14,
      border: '1px solid #e2e8f0',
      padding: '24px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e50b3', background: '#eff6ff', padding: '2px 8px', borderRadius: 4 }}>
              {policy.category}
            </span>
            <span style={{ fontSize: '13px', fontFamily: 'monospace', color: '#64748b' }}>
              #{policy.policyNumber}
            </span>
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            {policy.planName}
          </h3>
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: 2 }}>
            Issued by {policy.insurerName} • Holder: <strong>{policy.holderName}</strong>
          </div>
        </div>

        <StatusBadge status={policy.status} size="md" />
      </div>

      {/* Grid details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: 12,
        padding: '12px 16px',
        background: '#f8fafc',
        borderRadius: 8,
        border: '1px solid #f1f5f9'
      }}>
        <div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Sum Insured</div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
            ₹{(policy.coverageLimit / 100000).toFixed(1)} Lakh
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Annual Premium</div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
            ₹{policy.premiumAmount.toLocaleString('en-IN')}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Effective Dates</div>
          <div style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>
            {new Date(policy.startDate).toLocaleDateString()} – {new Date(policy.endDate).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Payment Mode</div>
          <div style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>
            {policy.paymentMethod}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        paddingTop: 8,
        borderTop: '1px solid #f1f5f9'
      }}>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          {policy.renewalDueDate ? (
            <span>Renewal Due: <strong style={{ color: '#d97706' }}>{new Date(policy.renewalDueDate).toLocaleDateString()}</strong></span>
          ) : (
            <span>Status: Healthy</span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              if (onDownload) {
                onDownload(policy);
              } else {
                alert(`Policy Schedule certificate for ${policy.policyNumber} downloaded.`);
              }
            }}
            style={{
              padding: '7px 12px',
              borderRadius: 6,
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#334155',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            📄 Certificate
          </button>

          <Link
            to="/claims"
            style={{
              padding: '7px 12px',
              borderRadius: 6,
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#1e50b3',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            ⚖️ File Claim
          </Link>

          <Link
            to="/renewals"
            style={{
              padding: '7px 14px',
              borderRadius: 6,
              background: '#1e50b3',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            🔄 Renew
          </Link>
        </div>
      </div>
    </div>
  );
}
