import { useState } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/shared/StatusBadge';
import type { Policy } from '../../types';

export default function AdminPoliciesPage() {
  const { policies } = useAuth();
  const [localPolicies, setLocalPolicies] = useState<Policy[]>(policies);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = localPolicies.filter(p => {
    const matchSearch =
      p.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.holderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.insurerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const togglePolicyStatus = (id: number) => {
    setLocalPolicies(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, status: p.status === 'ACTIVE' ? 'CANCELLED' : 'ACTIVE' }
          : p
      )
    );
  };

  return (
    <AdminLayout
      title="Issued Policies Registry"
      breadcrumb={[{ label: 'Admin Console' }, { label: 'Policies' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Controls */}
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
              placeholder="Search policy #, holder, or insurer..."
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

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1.5px solid #cbd5e1',
                fontSize: '13px',
                background: '#ffffff',
                color: '#0f172a',
                outline: 'none'
              }}
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="EXPIRED">Expired</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Policies Table */}
        <div style={{ background: '#ffffff', borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Policy ID &amp; Plan</th>
                <th style={{ padding: '12px 16px' }}>Policyholder</th>
                <th style={{ padding: '12px 16px' }}>Insurer</th>
                <th style={{ padding: '12px 16px' }}>Sum Insured</th>
                <th style={{ padding: '12px 16px' }}>Validity Term</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((policy) => (
                <tr key={policy.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1e50b3' }}>
                      #{policy.policyNumber}
                    </div>
                    <div style={{ fontSize: '12px', color: '#0f172a', fontWeight: 600 }}>{policy.planName}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                    {policy.holderName}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    {policy.insurerName}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                    ₹{(policy.coverageLimit / 100000).toFixed(1)} Lakh
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '12px' }}>
                    {new Date(policy.startDate).toLocaleDateString()} – {new Date(policy.endDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <StatusBadge status={policy.status} />
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => togglePolicyStatus(policy.id)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        color: policy.status === 'ACTIVE' ? '#ef4444' : '#10b981'
                      }}
                    >
                      {policy.status === 'ACTIVE' ? 'Cancel Policy' : 'Reinstate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
