import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface SidebarItem {
  icon: string;
  label: string;
  path: string;
  badge?: number;
  section?: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: '⊞', label: 'Dashboard',       path: '/admin/dashboard', section: 'main' },
  { icon: '👥', label: 'Customers',       path: '/admin/users',     section: 'main' },
  { icon: '🏢', label: 'Insurers',        path: '/admin/insurers',  section: 'main' },
  { icon: '📦', label: 'Plans',           path: '/admin/plans',     section: 'main' },
  { icon: '📋', label: 'Policies',        path: '/admin/policies',  section: 'main', badge: 5 },
  { icon: '🏥', label: 'Claims',          path: '/admin/claims',    section: 'operations', badge: 3 },
  { icon: '🎫', label: 'Support Tickets', path: '/admin/support',   section: 'operations', badge: 7 },
  { icon: '🛡️', label: 'Fraud Reports',   path: '/admin/fraud',     section: 'operations', badge: 2 },
  { icon: '📊', label: 'Analytics',       path: '/admin/analytics', section: 'reports' },
  { icon: '📝', label: 'Audit Logs',      path: '/admin/audit-logs', section: 'reports' },
  { icon: '⚙️', label: 'Settings',        path: '/admin/settings',  section: 'system' },
];

const SECTIONS: { key: string; label: string }[] = [
  { key: 'main',       label: 'Overview' },
  { key: 'operations', label: 'Operations' },
  { key: 'reports',    label: 'Reports' },
  { key: 'system',     label: 'System' },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function AdminSidebar({ collapsed, onToggleCollapse }: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <aside className={`ih-admin-sidebar ${collapsed ? 'collapsed' : ''}`} style={{ scrollbarWidth: 'none' }}>
      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '20px 16px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
        }}>🛡️</div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
              InsureHub
            </div>
            <div style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>
              Admin Portal
            </div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          style={{
            marginLeft: 'auto', width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.08)',
            border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0
          }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {SECTIONS.map(section => {
          const items = SIDEBAR_ITEMS.filter(i => i.section === section.key);
          return (
            <div key={section.key} style={{ marginBottom: 8 }}>
              {!collapsed && (
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)', padding: '8px 10px 4px'
                }}>{section.label}</div>
              )}
              {items.map(item => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={collapsed ? item.label : undefined}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '10px' : '9px 10px',
                      borderRadius: 8, marginBottom: 2, textDecoration: 'none', transition: 'all 0.15s',
                      background: active ? 'rgba(37,99,235,0.85)' : 'transparent',
                      color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                      justifyContent: collapsed ? 'center' : 'flex-start'
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; } }}
                  >
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span style={{ fontSize: 13.5, fontWeight: active ? 600 : 400, flex: 1, whiteSpace: 'nowrap' }}>
                          {item.label}
                        </span>
                        {item.badge !== undefined && (
                          <span style={{
                            background: active ? 'rgba(255,255,255,0.25)' : '#ef4444',
                            color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 999,
                            padding: '1px 6px', lineHeight: '14px'
                          }}>{item.badge}</span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Bottom: Admin profile */}
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
        {!collapsed ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8, background: 'rgba(37,99,235,0.6)',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 13, flexShrink: 0
            }}>{user?.firstName?.charAt(0) || 'A'}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Administrator</div>
            </div>
            <button
              onClick={() => { logout(); navigate('/login'); }}
              title="Sign Out"
              style={{
                width: 30, height: 30, borderRadius: 6, background: 'rgba(239,68,68,0.15)',
                border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >⏻</button>
          </div>
        ) : (
          <button
            onClick={() => { logout(); navigate('/login'); }}
            title="Sign Out"
            style={{
              width: '100%', padding: '8px', borderRadius: 8, background: 'rgba(239,68,68,0.15)',
              border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: 18, display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}
          >⏻</button>
        )}
      </div>
    </aside>
  );
}
