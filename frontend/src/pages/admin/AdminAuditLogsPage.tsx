import { useState } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}

export default function AdminAuditLogsPage() {
  const [logs] = useState<AuditLog[]>([
    { id: 'LOG-9812', timestamp: '2026-03-20 17:50:12', actor: 'admin@insurehub.com', action: 'CLAIM_STATUS_UPDATE', target: 'CLM-2026-849201 -> APPROVED', ipAddress: '103.21.14.82', status: 'SUCCESS' },
    { id: 'LOG-9811', timestamp: '2026-03-20 16:32:05', actor: 'system_daemon', action: 'SOLVENCY_COMPLIANCE_CRON', target: 'IRDAI Batch XML Upload', ipAddress: '127.0.0.1', status: 'SUCCESS' },
    { id: 'LOG-9810', timestamp: '2026-03-20 15:14:40', actor: 'demo@insurehub.com', action: 'POLICY_PURCHASE', target: 'POL-2026-193021 (HDFC ERGO)', ipAddress: '49.36.88.192', status: 'SUCCESS' },
    { id: 'LOG-9809', timestamp: '2026-03-20 14:02:18', actor: 'gateway_service', action: 'TPA_API_TIMEOUT', target: 'StarHealth /api/v2/cashless', ipAddress: '10.0.4.12', status: 'WARNING' },
    { id: 'LOG-9808', timestamp: '2026-03-20 11:20:54', actor: 'unknown_host', action: 'FAILED_ADMIN_LOGIN', target: 'admin@insurehub.com (Bad Creds)', ipAddress: '185.220.101.5', status: 'FAILED' },
    { id: 'LOG-9807', timestamp: '2026-03-20 09:45:00', actor: 'priya.tpa@starhealth.com', action: 'DISCHARGE_BILL_UPLOAD', target: 'DOC-CLM-849201.pdf', ipAddress: '122.172.81.44', status: 'SUCCESS' }
  ]);

  return (
    <AdminLayout
      title="Compliance &amp; Security Audit Logs"
      breadcrumb={[{ label: 'Admin Console' }, { label: 'Audit Logs' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Compliance statement */}
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
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
              IRDAI Cyber Security Framework (CSF) Audit Compliance
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: 2 }}>
              Immutable append-only ledger for all underwriting, claim disbursements, and administrative changes. Retained 7 years.
            </div>
          </div>
          <button
            onClick={() => alert('Demo Mode: Audit ledger exported in encrypted CSV format.')}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              background: '#f1f5f9',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Export Signed CSV
          </button>
        </div>

        {/* Logs Table */}
        <div style={{ background: '#ffffff', borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Timestamp (IST)</th>
                <th style={{ padding: '12px 16px' }}>Actor</th>
                <th style={{ padding: '12px 16px' }}>Action &amp; Target</th>
                <th style={{ padding: '12px 16px' }}>IP Origin</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Result</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#64748b', fontSize: '12px' }}>
                    {log.timestamp}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                    {log.actor}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontWeight: 600, color: '#1e50b3' }}>{log.action}</span>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: 2 }}>{log.target}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#64748b', fontSize: '12px' }}>
                    {log.ipAddress}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: log.status === 'SUCCESS' ? '#ecfdf5' : log.status === 'WARNING' ? '#fffbeb' : '#fef2f2',
                      color: log.status === 'SUCCESS' ? '#065f46' : log.status === 'WARNING' ? '#92400e' : '#991b1b'
                    }}>
                      {log.status}
                    </span>
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
