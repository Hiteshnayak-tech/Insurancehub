import React, { useState } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';

export default function AdminSettingsPage() {
  const [sandboxMode, setSandboxMode] = useState(true);
  const [smsGateway, setSmsGateway] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [irdaiReporting, setIrdaiReporting] = useState(true);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <AdminLayout
      title="Platform Operations &amp; Gateway Settings"
      breadcrumb={[{ label: 'Admin Console' }, { label: 'Settings' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 800 }}>
        
        {savedMsg && (
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            padding: '12px 16px',
            borderRadius: 8,
            fontSize: '13px',
            fontWeight: 600
          }}>
            ✓ Settings updated successfully.
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Environment & Simulation */}
          <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
              Environment &amp; Sandbox Controls
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px' }}>
              Control sandbox simulation for payments, insurance underwriting, and API mocking.
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Academic Demonstration Sandbox Mode</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Simulates UPI payment gateways and mock claims without financial settlement.</div>
              </div>
              <input
                type="checkbox"
                checked={sandboxMode}
                onChange={(e) => setSandboxMode(e.target.checked)}
                style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#2563eb' }}
              />
            </div>
          </div>

          {/* Notifications Gateway */}
          <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
              Notification Dispatch Channels
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px' }}>
              Customer communication channels for policy issuance schedules and claims.
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Email Dispatcher (Transactional SMTP)</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Send policy certificates and renewal notifications.</div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#2563eb' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>SMS &amp; WhatsApp OTP Service</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Two-factor authentication and claim status SMS alerts.</div>
              </div>
              <input
                type="checkbox"
                checked={smsGateway}
                onChange={(e) => setSmsGateway(e.target.checked)}
                style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#2563eb' }}
              />
            </div>
          </div>

          {/* Regulatory & Reporting */}
          <div style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
              Regulatory Central Reporting
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px' }}>
              Direct API integrations for IIB (Insurance Information Bureau) and CKYC.
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid #f1f5f9' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Central CKYC Registry Sync</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Instant KYC verification via government portal.</div>
              </div>
              <input
                type="checkbox"
                checked={irdaiReporting}
                onChange={(e) => setIrdaiReporting(e.target.checked)}
                style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#2563eb' }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                background: '#2563eb',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Save Configuration
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}
