import { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumb?: { label: string; path?: string }[];
}

export function AdminLayout({ children, title, breadcrumb }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="ih-admin-layout">
      <AdminSidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed(c => !c)} />

      <div className={`ih-admin-content ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top bar */}
        <div className="ih-admin-topbar">
          {/* Breadcrumb / Page Title */}
          <div style={{ flex: 1 }}>
            {breadcrumb && breadcrumb.length > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#94a3b8' }}>
                {breadcrumb.map((item, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {i > 0 && <span style={{ color: '#cbd5e1' }}>/</span>}
                    <span style={{ color: i === breadcrumb.length - 1 ? '#1e50b3' : '#94a3b8', fontWeight: i === breadcrumb.length - 1 ? 600 : 400 }}>
                      {item.label}
                    </span>
                  </span>
                ))}
              </div>
            ) : null}
            {title && (
              <div style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginTop: breadcrumb ? 2 : 0 }}>
                {title}
              </div>
            )}
          </div>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search..."
              style={{
                width: 240, height: 36, padding: '0 12px 0 36px', borderRadius: 8,
                border: '1.5px solid #e2e8f0', fontSize: 13, background: '#f8fafc',
                outline: 'none', color: '#374151'
              }}
            />
            <span style={{ position: 'absolute', left: 12, top: 10, color: '#94a3b8', fontSize: 14 }}>🔍</span>
          </div>

          {/* Notification Bell */}
          <button style={{
            width: 38, height: 38, borderRadius: 8, border: '1.5px solid #e2e8f0',
            background: '#fff', cursor: 'pointer', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15
          }}>
            🔔
            <span style={{
              position: 'absolute', top: 7, right: 7, width: 8, height: 8,
              background: '#ef4444', borderRadius: '50%', border: '1.5px solid #fff'
            }} />
          </button>
        </div>

        {/* Main content */}
        <div className="ih-admin-main">
          {children}
        </div>
      </div>
    </div>
  );
}
