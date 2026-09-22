import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomerLayout } from '../../layouts/CustomerLayout';

interface NotificationItem {
  id: number;
  type: 'RENEWAL' | 'CLAIM' | 'POLICY' | 'SECURITY';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLink?: string;
  actionText?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      type: 'RENEWAL',
      title: 'Upcoming Policy Renewal Alert',
      message: 'Your CareShield Comprehensive Health policy is due for renewal in 20 days. Renew early to retain your 50% No Claim Bonus.',
      timestamp: '2 hours ago',
      read: false,
      actionLink: '/renewals',
      actionText: 'Renew Now'
    },
    {
      id: 2,
      type: 'CLAIM',
      title: 'Claim Under Review Update',
      message: 'Claim #CLM-2026-849201 has been assigned to Senior Medical Officer Dr. M. Iyer for bill verification.',
      timestamp: 'Yesterday at 4:15 PM',
      read: false,
      actionLink: '/claims',
      actionText: 'View Claim Timeline'
    },
    {
      id: 3,
      type: 'POLICY',
      title: 'Policy e-Schedule Issued',
      message: 'Digitally signed policy schedule for DriveProtect Comprehensive Motor is now available for download.',
      timestamp: '3 days ago',
      read: true,
      actionLink: '/my-policies',
      actionText: 'Download Schedule'
    },
    {
      id: 4,
      type: 'SECURITY',
      title: 'Security Login from New Device',
      message: 'Successful login detected from Chrome on Windows (Bengaluru, IN).',
      timestamp: '5 days ago',
      read: true
    }
  ]);

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'UNREAD' | 'RENEWAL' | 'CLAIM'>('ALL');

  const filtered = notifications.filter((n) => {
    if (activeFilter === 'UNREAD') return !n.read;
    if (activeFilter === 'RENEWAL') return n.type === 'RENEWAL';
    if (activeFilter === 'CLAIM') return n.type === 'CLAIM';
    return true;
  });

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'RENEWAL': return '🔄';
      case 'CLAIM': return '⚖️';
      case 'POLICY': return '📄';
      case 'SECURITY': return '🔒';
      default: return '🔔';
    }
  };

  return (
    <CustomerLayout>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px 64px' }}>
        
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: 8, display: 'flex', gap: 6 }}>
            <Link to="/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>Customer Portal</Link>
            <span>/</span>
            <span style={{ color: '#1e50b3', fontWeight: 600 }}>Notifications</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Notifications &amp; Alerts
              </h1>
              <p style={{ fontSize: '14px', color: '#64748b', marginTop: 4 }}>
                Real-time updates regarding policy status, claim intimations, and renewal alerts.
              </p>
            </div>

            <button
              onClick={markAllRead}
              style={{
                background: 'none',
                border: '1px solid #cbd5e1',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: '12px',
                fontWeight: 600,
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              Mark all as read
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {[
            { label: 'All', value: 'ALL' },
            { label: 'Unread Only', value: 'UNREAD' },
            { label: 'Renewals', value: 'RENEWAL' },
            { label: 'Claims', value: 'CLAIM' }
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value as any)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: activeFilter === f.value ? '1.5px solid #1e50b3' : '1px solid #e2e8f0',
                background: activeFilter === f.value ? '#eff6ff' : '#ffffff',
                color: activeFilter === f.value ? '#1e50b3' : '#64748b',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.length === 0 ? (
            <div style={{ background: '#ffffff', borderRadius: 12, border: '1px dashed #cbd5e1', padding: '48px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: 8 }}>🔔</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>No notifications</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>You're all caught up!</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                style={{
                  background: item.read ? '#ffffff' : '#f0f7ff',
                  border: `1px solid ${item.read ? '#e2e8f0' : '#bfdbfe'}`,
                  borderRadius: 12,
                  padding: '18px 20px',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: item.read ? '#f1f5f9' : '#dbeafe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  {getTypeIcon(item.type)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                      {item.timestamp}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 10px', lineHeight: 1.5 }}>
                    {item.message}
                  </p>

                  {item.actionLink && (
                    <Link
                      to={item.actionLink}
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#1e50b3',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      {item.actionText} →
                    </Link>
                  )}
                </div>

                {!item.read && (
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563eb', marginTop: 6 }} />
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </CustomerLayout>
  );
}
