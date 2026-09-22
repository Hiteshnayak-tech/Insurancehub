import { useState } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';

interface UserRecord {
  id: number;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPPORT_AGENT';
  policiesCount: number;
  joinedDate: string;
  status: 'ACTIVE' | 'SUSPENDED';
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([
    { id: 1, name: 'Aarav Sharma', email: 'demo@insurehub.com', role: 'CUSTOMER', policiesCount: 2, joinedDate: '2026-01-15', status: 'ACTIVE' },
    { id: 2, name: 'Pooja Verma', email: 'pooja.v@example.com', role: 'CUSTOMER', policiesCount: 1, joinedDate: '2026-02-10', status: 'ACTIVE' },
    { id: 3, name: 'Vikram Singh', email: 'admin@insurehub.com', role: 'ADMIN', policiesCount: 0, joinedDate: '2025-11-01', status: 'ACTIVE' },
    { id: 4, name: 'Rohan Mehta', email: 'rohan.m@example.com', role: 'CUSTOMER', policiesCount: 3, joinedDate: '2026-03-01', status: 'ACTIVE' },
    { id: 5, name: 'Dr. Priya Nair', email: 'priya.tpa@starhealth.com', role: 'SUPPORT_AGENT', policiesCount: 0, joinedDate: '2025-12-20', status: 'ACTIVE' },
    { id: 6, name: 'Sanjay Gupta', email: 'sanjay.g@example.com', role: 'CUSTOMER', policiesCount: 0, joinedDate: '2026-03-12', status: 'SUSPENDED' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleStatus = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : u));
  };

  return (
    <AdminLayout
      title="User & Customer Directory"
      breadcrumb={[{ label: 'Admin Console' }, { label: 'Users' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Controls Toolbar */}
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
              placeholder="Search user name or email..."
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
            <span style={{ fontSize: '13px', color: '#64748b' }}>Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
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
              <option value="ALL">All Roles</option>
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPPORT_AGENT">Support Agent</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div style={{ background: '#ffffff', borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>User Details</th>
                <th style={{ padding: '12px 16px' }}>Role</th>
                <th style={{ padding: '12px 16px' }}>Enrolled Policies</th>
                <th style={{ padding: '12px 16px' }}>Registered On</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{user.email}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: user.role === 'ADMIN' ? '#faf5ff' : user.role === 'SUPPORT_AGENT' ? '#eff6ff' : '#f1f5f9',
                      color: user.role === 'ADMIN' ? '#6b21a8' : user.role === 'SUPPORT_AGENT' ? '#1e40af' : '#334155'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                    {user.policiesCount}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: user.status === 'ACTIVE' ? '#ecfdf5' : '#fef2f2',
                      color: user.status === 'ACTIVE' ? '#065f46' : '#991b1b'
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => toggleStatus(user.id)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 6,
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        color: user.status === 'ACTIVE' ? '#ef4444' : '#10b981'
                      }}
                    >
                      {user.status === 'ACTIVE' ? 'Suspend' : 'Reactivate'}
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
