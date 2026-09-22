import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { useAuth } from '../../context/AuthContext';
import { PolicyCard } from '../../components/shared/PolicyCard';

export default function MyPoliciesPage() {
  const { policies } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [downloadModalPolicy, setDownloadModalPolicy] = useState<any>(null);

  const filteredPolicies = useMemo(() => {
    return policies.filter((p) => {
      const matchSearch =
        p.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.insurerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = categoryFilter === 'ALL' || p.category === categoryFilter;
      const matchStatus = statusFilter === 'ALL' || p.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [policies, searchTerm, categoryFilter, statusFilter]);

  return (
    <CustomerLayout>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px 64px' }}>
        
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: 8, display: 'flex', gap: 6 }}>
            <Link to="/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>Customer Portal</Link>
            <span>/</span>
            <span style={{ color: '#1e50b3', fontWeight: 600 }}>My Policies</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                My Insurance Policies
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', marginTop: 4 }}>
                Review active coverage limits, download policy documents, and manage endorsements.
              </p>
            </div>
            <Link
              to="/plans"
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                background: '#1e50b3',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              + Buy New Policy
            </Link>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div style={{
          background: '#ffffff',
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          padding: '16px 20px',
          marginBottom: 24,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Search box */}
          <div style={{ position: 'relative', flex: '1 1 260px' }}>
            <input
              type="text"
              placeholder="Search policy number, insurer, or plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: 8,
                border: '1.5px solid #cbd5e1',
                fontSize: '13px',
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <span style={{ position: 'absolute', left: 12, top: 9, color: '#94a3b8', fontSize: '13px' }}>🔍</span>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                padding: '9px 14px',
                borderRadius: 8,
                border: '1.5px solid #cbd5e1',
                fontSize: '13px',
                background: '#ffffff',
                color: '#0f172a',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">All Categories</option>
              <option value="Health">Health Insurance</option>
              <option value="Motor">Motor Insurance</option>
              <option value="Life">Life Insurance</option>
              <option value="Home">Home Insurance</option>
              <option value="Travel">Travel Insurance</option>
              <option value="Business">Business Insurance</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '9px 14px',
                borderRadius: 8,
                border: '1.5px solid #cbd5e1',
                fontSize: '13px',
                background: '#ffffff',
                color: '#0f172a',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Only</option>
              <option value="EXPIRED">Expired</option>
              <option value="PENDING">Pending Approval</option>
            </select>
          </div>
        </div>

        {/* Policies List */}
        {filteredPolicies.length === 0 ? (
          <div style={{
            background: '#ffffff',
            borderRadius: 14,
            border: '1.5px dashed #cbd5e1',
            padding: '60px 24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '42px', marginBottom: 12 }}>🛡️</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>
              No policies match your search
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', maxWidth: 400, margin: '0 auto 20px' }}>
              Try clearing your search terms or filters to see all enrolled insurance policies.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('ALL');
                setStatusFilter('ALL');
              }}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: '#1e50b3',
                color: '#ffffff',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
            {filteredPolicies.map((policy) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                onDownload={(p) => setDownloadModalPolicy(p)}
              />
            ))}
          </div>
        )}

        {/* Certificate Modal Simulation */}
        {downloadModalPolicy && (
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
              maxWidth: 520,
              width: '100%',
              padding: 28,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a', background: '#ecfdf5', padding: '2px 8px', borderRadius: 4 }}>
                    Official e-Schedule
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '6px 0 2px' }}>
                    Insurance Certificate
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Policy #{downloadModalPolicy.policyNumber}
                  </div>
                </div>
                <button
                  onClick={() => setDownloadModalPolicy(null)}
                  style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#64748b' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: 8, padding: 16, fontSize: '13px', marginBottom: 20, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Policy Holder:</span>
                  <strong>{downloadModalPolicy.holderName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Underwriter:</span>
                  <strong>{downloadModalPolicy.insurerName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Plan Name:</span>
                  <strong>{downloadModalPolicy.planName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Sum Insured:</span>
                  <strong style={{ color: '#16a34a' }}>₹{(downloadModalPolicy.coverageLimit / 100000).toFixed(1)} Lakh</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Validity Period:</span>
                  <span>{new Date(downloadModalPolicy.startDate).toLocaleDateString()} – {new Date(downloadModalPolicy.endDate).toLocaleDateString()}</span>
                </div>
              </div>

              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px', lineHeight: 1.5 }}>
                ⚠️ <em>Demo Note: In production, this generates a digitally-signed IRDAI-compliant PDF document for cashless admissions and motor inspection proofs.</em>
              </p>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => {
                    alert(`Certificate for ${downloadModalPolicy.policyNumber} simulated download successful.`);
                    setDownloadModalPolicy(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    background: '#1e50b3',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Download PDF Certificate
                </button>
                <button
                  onClick={() => setDownloadModalPolicy(null)}
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
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </CustomerLayout>
  );
}
