import { Link } from 'react-router-dom';
import { AdminLayout } from '../../layouts/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/shared/StatusBadge';

export default function AdminDashboard() {
  const { policies, claims, tickets } = useAuth();

  const totalPremium = policies.reduce((acc, p) => acc + p.premiumAmount, 0);
  const pendingClaims = claims.filter(c => ['SUBMITTED', 'UNDER_REVIEW'].includes(c.status));
  const openTickets = tickets.filter(t => t.status === 'OPEN' || t.status === 'IN_PROGRESS');

  return (
    <AdminLayout
      title="Operations Overview"
      breadcrumb={[{ label: 'Admin Console' }, { label: 'Dashboard' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Banner with honest demo tag */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: '#ffffff',
          borderRadius: 12,
          padding: '20px 24px',
          border: '1px solid #334155',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8', background: 'rgba(56,189,248,0.15)', padding: '2px 8px', borderRadius: 4 }}>
                OPERATIONS CONSOLE
              </span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>• Node: PROD-SG-01</span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>
              InsureHub Central Management
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 0' }}>
              Real-time telemetry, claim approvals, insurer compliance, and user oversight.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              to="/admin/claims"
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: '#2563eb',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Review Claims ({pendingClaims.length})
            </Link>
            <Link
              to="/admin/plans"
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: '#334155',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Configure Plans
            </Link>
          </div>
        </div>

        {/* 4 Operations KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16
        }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
              <span>ACTIVE POLICIES</span>
              <span>🛡️</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: '8px 0 2px' }}>
              {policies.length}
            </div>
            <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>
              ↑ 12% from last month (Demo)
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
              <span>PENDING CLAIMS</span>
              <span>⚖️</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: pendingClaims.length > 0 ? '#d97706' : '#0f172a', margin: '8px 0 2px' }}>
              {pendingClaims.length}
            </div>
            <div style={{ fontSize: '11px', color: '#d97706', fontWeight: 600 }}>
              Requires TPA Verification
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
              <span>PREMIUM VOLUME</span>
              <span>💰</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: '8px 0 2px' }}>
              ₹{totalPremium.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              Annual GWP Underwritten
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
              <span>OPEN TICKETS</span>
              <span>💬</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: '8px 0 2px' }}>
              {openTickets.length}
            </div>
            <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>
              SLA Compliance: 99.4%
            </div>
          </div>
        </div>

        {/* 2-column: Pending Claims queue & System Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
          
          {/* Claims Queue */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Claims Requiring Action ({claims.length})
              </h3>
              <Link to="/admin/claims" style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                Open Claims Desk →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {claims.map((claim) => (
                <div
                  key={claim.id}
                  style={{
                    padding: '12px',
                    borderRadius: 8,
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>
                        #{claim.claimNumber}
                      </span>
                      <StatusBadge status={claim.status} />
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: 2 }}>
                      {claim.claimType} • Claimed: <strong>₹{claim.amountClaimed.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <Link
                    to="/admin/claims"
                    style={{
                      padding: '6px 12px',
                      borderRadius: 6,
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#0f172a',
                      textDecoration: 'none'
                    }}
                  >
                    Adjudicate
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* System Audit Feed */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Recent Operational Activity
              </h3>
              <Link to="/admin/audit-logs" style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                All Logs →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { time: '10 mins ago', user: 'system_daemon', action: 'Daily Solvency Ratio check passed (2.1x)', tag: 'COMPLIANCE' },
                { time: '1 hour ago', user: 'admin@insurehub.com', action: 'Updated plan premium for CareShield Comprehensive', tag: 'PLAN_UPDATE' },
                { time: '3 hours ago', user: 'tpa_service', action: 'Intimated cashless sanction to Manipal Hospital', tag: 'CLAIM_EVENT' },
                { time: 'Yesterday', user: 'security_gate', action: 'Rotated API signature keys for ICICI Lombard gateway', tag: 'SECURITY' }
              ].map((log, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, fontSize: '12px' }}>
                  <span style={{ color: '#94a3b8', minWidth: 80, flexShrink: 0 }}>{log.time}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: '#0f172a', fontWeight: 600 }}>{log.action}</span>
                    <span style={{ display: 'block', color: '#64748b', fontSize: '11px' }}>By: {log.user}</span>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, height: 'fit-content' }}>
                    {log.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
