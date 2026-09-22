import { useState } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';

interface FraudAlert {
  id: number;
  alertCode: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  entityType: 'CLAIM' | 'HOSPITAL' | 'USER';
  entityId: string;
  description: string;
  detectedOn: string;
  status: 'INVESTIGATING' | 'DISMISSED' | 'CONFIRMED_FRAUD';
}

export default function AdminFraudPage() {
  const [alerts, setAlerts] = useState<FraudAlert[]>([
    { id: 1, alertCode: 'FRD-DUP-01', severity: 'HIGH', entityType: 'CLAIM', entityId: 'CLM-2026-849201', description: 'Duplicate hospital invoice detected across multiple policy numbers within 14 days.', detectedOn: '2026-03-18', status: 'INVESTIGATING' },
    { id: 2, alertCode: 'FRD-HOSP-09', severity: 'CRITICAL', entityType: 'HOSPITAL', entityId: 'HOSP-BLR-892', description: 'Inflated surgical package pricing: 3.4x higher than standard GIPSA agreed tariff rates.', detectedOn: '2026-03-15', status: 'INVESTIGATING' },
    { id: 3, alertCode: 'FRD-GEO-04', severity: 'MEDIUM', entityType: 'USER', entityId: 'USR-10293', description: 'Simultaneous international IP logins detected during motor cashless submission.', detectedOn: '2026-03-10', status: 'DISMISSED' }
  ]);

  const updateAlertStatus = (id: number, status: FraudAlert['status']) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <AdminLayout
      title="Fraud Detection &amp; Risk Intelligence"
      breadcrumb={[{ label: 'Admin Console' }, { label: 'Risk & Fraud' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Risk summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>ACTIVE THREAT ALERTS</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#ef4444', margin: '4px 0' }}>
              {alerts.filter(a => a.status === 'INVESTIGATING').length}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Under forensic review</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>FRAUD LEAKAGE SAVINGS</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#16a34a', margin: '4px 0' }}>
              ₹14.2 Lakh
            </div>
            <div style={{ fontSize: '11px', color: '#16a34a' }}>Prevented spurious payouts (Demo)</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>AI SCORING ENGINE</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>
              ONLINE
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Real-time OCR bill analysis</div>
          </div>
        </div>

        {/* Alerts Table */}
        <div style={{ background: '#ffffff', borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Alert Code</th>
                <th style={{ padding: '12px 16px' }}>Severity</th>
                <th style={{ padding: '12px 16px' }}>Entity Flagged</th>
                <th style={{ padding: '12px 16px' }}>Description</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((al) => (
                <tr key={al.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontWeight: 700, color: '#0f172a' }}>
                    {al.alertCode}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: al.severity === 'CRITICAL' ? '#fef2f2' : al.severity === 'HIGH' ? '#fffbeb' : '#f1f5f9',
                      color: al.severity === 'CRITICAL' ? '#991b1b' : al.severity === 'HIGH' ? '#92400e' : '#475569'
                    }}>
                      {al.severity}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                    {al.entityType}: {al.entityId}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569', maxWidth: 320 }}>
                    {al.description}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: al.status === 'CONFIRMED_FRAUD' ? '#fef2f2' : al.status === 'INVESTIGATING' ? '#fffbeb' : '#f1f5f9',
                      color: al.status === 'CONFIRMED_FRAUD' ? '#991b1b' : al.status === 'INVESTIGATING' ? '#92400e' : '#475569'
                    }}>
                      {al.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    {al.status === 'INVESTIGATING' && (
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <button
                          onClick={() => updateAlertStatus(al.id, 'CONFIRMED_FRAUD')}
                          style={{ padding: '4px 8px', borderRadius: 4, background: '#ef4444', color: '#fff', border: 'none', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}
                        >
                          Confirm Fraud
                        </button>
                        <button
                          onClick={() => updateAlertStatus(al.id, 'DISMISSED')}
                          style={{ padding: '4px 8px', borderRadius: 4, background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}
                        >
                          Dismiss
                        </button>
                      </div>
                    )}
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
