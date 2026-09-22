import { Link } from 'react-router-dom';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { useAuth } from '../../context/AuthContext';
import { PolicyCard } from '../../components/shared/PolicyCard';
import { StatusBadge } from '../../components/shared/StatusBadge';

export default function CustomerDashboardPage() {
  const { user, policies, claims, renewals } = useAuth();

  const activePolicies = policies.filter((p) => p.status === 'ACTIVE');
  const totalCoverage = policies.reduce((acc, p) => acc + p.coverageLimit, 0);
  const pendingClaims = claims.filter((c) => ['SUBMITTED', 'UNDER_REVIEW'].includes(c.status));
  const upcomingRenewals = renewals.filter((r) => r.status === 'DUE_SOON');

  return (
    <CustomerLayout>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px 64px' }}>
        
        {/* Welcome Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0f2a5e 0%, #1e50b3 100%)',
          borderRadius: 16,
          padding: '28px 32px',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(15,42,94,0.15)',
          marginBottom: 32,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: 9999, fontSize: '12px', fontWeight: 600, marginBottom: 8 }}>
              <span>👤 Verified Customer</span>
              <span>•</span>
              <span style={{ color: '#93c5fd' }}>Demo Mode Active</span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
              Welcome back, {user ? `${user.firstName} ${user.lastName}` : 'Customer'}!
            </h1>
            <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}>
              Member ID: <strong>IH-{(user?.id || 101).toString().padStart(6, '0')}</strong> • Manage all your insurance policies, claims, and renewals in one place.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              to="/plans"
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                background: '#ffffff',
                color: '#1e50b3',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              + Browse New Plans
            </Link>
            <Link
              to="/claims"
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.3)',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              ⚖️ File a Claim
            </Link>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 32
        }}>
          {/* Card 1 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Active Policies</span>
              <span style={{ fontSize: '20px' }}>🛡️</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '8px 0 4px' }}>
              {activePolicies.length}
            </div>
            <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>
              All policies current &amp; valid
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Total Sum Assured</span>
              <span style={{ fontSize: '20px' }}>💰</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '8px 0 4px' }}>
              ₹{(totalCoverage / 100000).toFixed(1)} <span style={{ fontSize: '16px', fontWeight: 500 }}>Lakh</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              Across {policies.length} insurance categories
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Claims In Review</span>
              <span style={{ fontSize: '20px' }}>📋</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: pendingClaims.length > 0 ? '#d97706' : '#0f172a', margin: '8px 0 4px' }}>
              {pendingClaims.length}
            </div>
            <div style={{ fontSize: '12px', color: pendingClaims.length > 0 ? '#d97706' : '#64748b' }}>
              {pendingClaims.length > 0 ? 'Insurer assessment in progress' : 'No pending claims'}
            </div>
          </div>

          {/* Card 4 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Renewals Due Soon</span>
              <span style={{ fontSize: '20px' }}>🔄</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: upcomingRenewals.length > 0 ? '#2563eb' : '#0f172a', margin: '8px 0 4px' }}>
              {upcomingRenewals.length}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              {upcomingRenewals.length > 0 ? `Next due in ${upcomingRenewals[0].daysLeft} days` : 'No upcoming renewals'}
            </div>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
          marginBottom: 36
        }}>
          <Link
            to="/my-policies"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '16px',
              background: '#ffffff',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              textDecoration: 'none',
              color: '#0f172a',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'border-color 0.2s'
            }}
          >
            <span style={{ fontSize: '22px' }}>📂</span>
            <div>
              <div>My Policies</div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 400 }}>View certificates &amp; specs</div>
            </div>
          </Link>

          <Link
            to="/claims"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '16px',
              background: '#ffffff',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              textDecoration: 'none',
              color: '#0f172a',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            <span style={{ fontSize: '22px' }}>⚖️</span>
            <div>
              <div>Claims Center</div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 400 }}>File &amp; track live claims</div>
            </div>
          </Link>

          <Link
            to="/renewals"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '16px',
              background: '#ffffff',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              textDecoration: 'none',
              color: '#0f172a',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            <span style={{ fontSize: '22px' }}>🔄</span>
            <div>
              <div>Policy Renewals</div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 400 }}>Protect continuous cover</div>
            </div>
          </Link>

          <Link
            to="/support"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '16px',
              background: '#ffffff',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              textDecoration: 'none',
              color: '#0f172a',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            <span style={{ fontSize: '22px' }}>💬</span>
            <div>
              <div>Customer Support</div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 400 }}>Open ticket or ask FAQ</div>
            </div>
          </Link>
        </div>

        {/* Active Policies Section */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                My Enrolled Policies ({policies.length})
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0 0' }}>
                Your active insurance contracts and verified coverage bounds
              </p>
            </div>
            <Link to="/my-policies" style={{ fontSize: '13px', fontWeight: 600, color: '#1e50b3', textDecoration: 'none' }}>
              View All Policies →
            </Link>
          </div>

          {policies.length === 0 ? (
            <div style={{ background: '#ffffff', border: '1.5px dashed #cbd5e1', borderRadius: 12, padding: '40px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: 8 }}>🛡️</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>No policies enrolled yet</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px' }}>Protect your family and assets by choosing an insurance plan today.</p>
              <Link to="/plans" style={{ padding: '8px 16px', borderRadius: 8, background: '#1e50b3', color: '#fff', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                Explore Marketplace
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
              {policies.map((p) => (
                <PolicyCard key={p.id} policy={p} />
              ))}
            </div>
          )}
        </div>

        {/* Claims & Renewals 2-column section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          
          {/* Claims Overview */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>⚖️</span> Recent Claims
              </h3>
              <Link to="/claims" style={{ fontSize: '12px', fontWeight: 600, color: '#1e50b3', textDecoration: 'none' }}>
                View All ({claims.length}) →
              </Link>
            </div>

            {claims.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#64748b' }}>No claims reported.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {claims.map((claim) => (
                  <div key={claim.id} style={{ padding: '12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#64748b' }}>
                        #{claim.claimNumber}
                      </span>
                      <StatusBadge status={claim.status} />
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                      {claim.claimType} — ₹{claim.amountClaimed.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: 2 }}>
                      {claim.planName} • Submitted: {new Date(claim.submittedDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Renewals Due */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>🔄</span> Renewals Schedule
              </h3>
              <Link to="/renewals" style={{ fontSize: '12px', fontWeight: 600, color: '#1e50b3', textDecoration: 'none' }}>
                Manage ({renewals.length}) →
              </Link>
            </div>

            {renewals.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#64748b' }}>No policies due for renewal.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {renewals.map((renewal) => (
                  <div key={renewal.id} style={{ padding: '12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                        {renewal.planName}
                      </span>
                      <StatusBadge status={renewal.status} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, fontSize: '12px', color: '#64748b' }}>
                      <span>Due Date: <strong style={{ color: '#0f172a' }}>{new Date(renewal.dueDate).toLocaleDateString()}</strong></span>
                      <span style={{ color: '#d97706', fontWeight: 600 }}>{renewal.daysLeft} days remaining</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 8, borderTop: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                        ₹{renewal.renewalPremium.toLocaleString('en-IN')}/yr
                      </span>
                      <Link
                        to="/renewals"
                        style={{
                          padding: '4px 12px',
                          borderRadius: 6,
                          background: '#1e50b3',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}
                      >
                        Renew Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </CustomerLayout>
  );
}
