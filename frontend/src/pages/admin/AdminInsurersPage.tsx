import { useState } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';

interface InsurerRecord {
  id: number;
  name: string;
  code: string;
  irdaiReg: string;
  solvencyRatio: number;
  csr: number;
  activePlansCount: number;
  apiStatus: 'ONLINE' | 'DEGRADED' | 'MAINTENANCE';
  contactEmail: string;
}

export default function AdminInsurersPage() {
  const [insurers] = useState<InsurerRecord[]>([
    { id: 1, name: 'Star Health Care', code: 'STAR', irdaiReg: 'IRDAI/NL-01/129', solvencyRatio: 2.15, csr: 98.4, activePlansCount: 2, apiStatus: 'ONLINE', contactEmail: 'claims.api@starhealth.com' },
    { id: 2, name: 'HDFC ERGO General Insurance', code: 'HDFCERGO', irdaiReg: 'IRDAI/NL-02/146', solvencyRatio: 2.31, csr: 99.1, activePlansCount: 2, apiStatus: 'ONLINE', contactEmail: 'integration@hdfcergo.com' },
    { id: 3, name: 'ICICI Lombard General', code: 'ICICILOMB', irdaiReg: 'IRDAI/NL-03/115', solvencyRatio: 2.05, csr: 97.8, activePlansCount: 2, apiStatus: 'ONLINE', contactEmail: 'b2b.tech@icicilombard.com' },
    { id: 4, name: 'Tata AIG General', code: 'TATAAIG', irdaiReg: 'IRDAI/NL-04/108', solvencyRatio: 2.10, csr: 98.2, activePlansCount: 1, apiStatus: 'ONLINE', contactEmail: 'tpa.gateway@tataaig.com' },
    { id: 5, name: 'Bajaj Allianz General', code: 'BAJAJ', irdaiReg: 'IRDAI/NL-05/113', solvencyRatio: 2.22, csr: 96.5, activePlansCount: 1, apiStatus: 'ONLINE', contactEmail: 'underwriting@bajajallianz.co.in' },
    { id: 6, name: 'Max Life Insurance', code: 'MAXLIFE', irdaiReg: 'IRDAI/LF-01/104', solvencyRatio: 2.40, csr: 99.5, activePlansCount: 1, apiStatus: 'ONLINE', contactEmail: 'corp.services@maxlifeinsurance.com' },
    { id: 7, name: 'SBI General Insurance', code: 'SBIGEN', irdaiReg: 'IRDAI/NL-06/144', solvencyRatio: 2.08, csr: 96.0, activePlansCount: 1, apiStatus: 'ONLINE', contactEmail: 'api.partner@sbigeneral.in' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = insurers.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout
      title="Underwriter & Insurer Partners"
      breadcrumb={[{ label: 'Admin Console' }, { label: 'Insurers' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Header Toolbar */}
        <div style={{
          background: '#ffffff',
          borderRadius: 10,
          border: '1px solid #e2e8f0',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div style={{ position: 'relative', width: 280 }}>
            <input
              type="text"
              placeholder="Search insurer name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: 8,
                border: '1.5px solid #cbd5e1',
                fontSize: '13px',
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <span style={{ position: 'absolute', left: 10, top: 8, color: '#94a3b8', fontSize: '13px' }}>🔍</span>
          </div>

          <button
            onClick={() => alert('Demo Mode: Insurer onboarding gateway is pre-configured.')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            + Onboard Underwriter
          </button>
        </div>

        {/* Insurers Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {filtered.map((ins) => (
            <div
              key={ins.id}
              style={{
                background: '#ffffff',
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>
                    {ins.name}
                  </h3>
                  <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
                    {ins.irdaiReg}
                  </div>
                </div>

                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 4,
                  background: '#ecfdf5',
                  color: '#065f46',
                  border: '1px solid #a7f3d0'
                }}>
                  ● {ins.apiStatus}
                </span>
              </div>

              <div style={{
                background: '#f8fafc',
                borderRadius: 8,
                padding: '10px 12px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 8,
                textAlign: 'center',
                fontSize: '12px'
              }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '10px' }}>Solvency</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{ins.solvencyRatio}x</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '10px' }}>CSR Ratio</div>
                  <div style={{ fontWeight: 700, color: '#16a34a' }}>{ins.csr}%</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '10px' }}>Active Plans</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{ins.activePlansCount}</div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                <span>API Contact:</span>
                <span style={{ color: '#2563eb' }}>{ins.contactEmail}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
}
