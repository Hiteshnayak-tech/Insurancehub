import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { label: 'Home',         path: '/',             sectionId: 'home' },
  { label: 'Insurance',    path: '/insurance',    sectionId: 'insurance' },
  { label: 'Compare',      path: '/compare',      sectionId: 'compare' },
  { label: 'Calculator',   path: '/calculator',   sectionId: 'calculator' },
  { label: 'AI Explainer', path: '/ai-explainer', sectionId: 'ai-explainer' },
  { label: 'Claims',       path: '/claims',       sectionId: 'claims' },
  { label: 'Support',      path: '/support',      sectionId: 'support' },
];

export function CustomerNavbar() {
  const { user, logout, compareList } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['support', 'claims', 'ai-explainer', 'calculator', 'compare', 'insurance', 'home'];
      const scrollPos = window.scrollY + 140;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const isLinkActive = (link: typeof NAV_LINKS[0]) => {
    if (location.pathname === '/') {
      return activeSection === link.sectionId;
    }
    return location.pathname.startsWith(link.path);
  };

  const handleNavClick = (e: React.MouseEvent, link: typeof NAV_LINKS[0]) => {
    if (location.pathname === '/') {
      e.preventDefault();
      if (link.sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        setActiveSection('home');
      } else {
        const elem = document.getElementById(link.sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `#${link.sectionId}`);
          setActiveSection(link.sectionId);
        }
      }
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav className="ih-customer-navbar">
        <div className="ih-container" style={{ display: 'flex', alignItems: 'center', height: '100%', gap: 0 }}>

          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState(null, '', '/');
                setActiveSection('home');
              }
            }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #1e50b3 0%, #0ea5e9 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, boxShadow: '0 2px 8px rgba(30,80,179,0.25)'
            }}>🛡️</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', lineHeight: 1, letterSpacing: '-0.02em' }}>
                Insure<span style={{ color: '#1e50b3' }}>Hub</span>
              </div>
              <div style={{ fontSize: 9, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Demo Platform
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 28, flex: 1 }} className="desktop-nav">
            {NAV_LINKS.map(link => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    color: active ? '#1e50b3' : '#475569',
                    background: active ? '#eff6ff' : 'transparent',
                    transition: 'all 0.15s',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {link.label}
                  {link.path === '/compare' && compareList.length > 0 && (
                    <span style={{
                      marginLeft: 5, background: '#1e50b3', color: '#fff',
                      fontSize: 10, fontWeight: 700, borderRadius: 999,
                      padding: '1px 5px', lineHeight: '14px'
                    }}>{compareList.length}</span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0 }} className="desktop-nav">
            {/* Notifications */}
            <Link to="/notifications" title="Notifications" style={{
              width: 38, height: 38, borderRadius: 8, display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#64748b', background: 'transparent',
              border: '1.5px solid #e2e8f0', textDecoration: 'none', position: 'relative'
            }}>
              🔔
              <span style={{
                position: 'absolute', top: 6, right: 6, width: 8, height: 8,
                background: '#ef4444', borderRadius: '50%', border: '1.5px solid #fff'
              }} />
            </Link>

            {user ? (
              <>
                <Link to="/my-policies" style={{
                  height: 36, padding: '0 14px', borderRadius: 8,
                  background: '#f0f6ff', color: '#1e50b3', fontWeight: 600,
                  fontSize: 13, display: 'flex', alignItems: 'center', textDecoration: 'none',
                  border: '1.5px solid #b3cef9', gap: 6
                }}>
                  📋 My Policies
                </Link>

                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 6px',
                      borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#fff', cursor: 'pointer',
                      fontSize: 13, fontWeight: 500, color: '#0f172a'
                    }}
                  >
                    <div style={{
                      width: 30, height: 30, borderRadius: 8, background: '#1e50b3',
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 12
                    }}>{user.firstName.charAt(0)}</div>
                    <span style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.firstName}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: 10 }}>▾</span>
                  </button>

                  {profileOpen && (
                    <div onClick={() => setProfileOpen(false)} style={{
                      position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: 220,
                      background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.10)', zIndex: 100, overflow: 'hidden'
                    }} className="anim-scale-in">
                      <div style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{user.firstName} {user.lastName}</div>
                        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{user.email}</div>
                      </div>
                      {[
                        { label: '📊 Dashboard',   path: '/dashboard' },
                        { label: '📋 My Policies', path: '/my-policies' },
                        { label: '🏥 Claims',       path: '/claims' },
                        { label: '🔔 Notifications', path: '/notifications' },
                        { label: '👤 Profile',      path: '/profile' },
                      ].map(item => (
                        <Link key={item.path} to={item.path} style={{
                          display: 'block', padding: '10px 16px', fontSize: 13,
                          color: '#374151', textDecoration: 'none'
                        }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >{item.label}</Link>
                      ))}
                      <div style={{ borderTop: '1px solid #f1f5f9', padding: '8px' }}>
                        <button
                          onClick={() => { logout(); navigate('/'); }}
                          style={{
                            width: '100%', padding: '8px 12px', borderRadius: 8,
                            border: 'none', background: 'transparent', cursor: 'pointer',
                            fontSize: 13, color: '#dc2626', textAlign: 'left', fontWeight: 500
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#fff1f1')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >🚪 Sign Out</button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <Link to="/login" style={{
                  height: 38, padding: '0 16px', borderRadius: 8, display: 'flex', alignItems: 'center',
                  fontSize: 14, fontWeight: 600, color: '#1e50b3', border: '1.5px solid #b3cef9',
                  background: '#f0f6ff', textDecoration: 'none'
                }}>Sign In</Link>
                <Link to="/register" style={{
                  height: 38, padding: '0 16px', borderRadius: 8, display: 'flex', alignItems: 'center',
                  fontSize: 14, fontWeight: 600, color: '#fff', background: '#1e50b3',
                  textDecoration: 'none', boxShadow: '0 2px 8px rgba(30,80,179,0.2)'
                }}>Get Started</Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              marginLeft: 'auto', width: 40, height: 40, borderRadius: 8, background: 'transparent',
              border: '1.5px solid #e2e8f0', color: '#374151', display: 'none',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, background: '#fff', zIndex: 49,
          borderBottom: '1px solid #e2e8f0', padding: '12px 16px 24px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto'
        }} className="anim-fade-in">
          {NAV_LINKS.map(link => {
            const active = isLinkActive(link);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link)}
                style={{
                  display: 'flex', alignItems: 'center', padding: '12px 14px',
                  borderRadius: 10, marginBottom: 4, textDecoration: 'none',
                  fontWeight: active ? 600 : 500, fontSize: 15,
                  color: active ? '#1e50b3' : '#374151',
                  background: active ? '#f0f6ff' : 'transparent'
                }}
              >
                {link.label}
                {link.path === '/compare' && compareList.length > 0 && (
                  <span style={{
                    marginLeft: 6, background: '#1e50b3', color: '#fff',
                    fontSize: 10, fontWeight: 700, borderRadius: 999,
                    padding: '1px 6px'
                  }}>{compareList.length}</span>
                )}
              </Link>
            );
          })}
          <div style={{ borderTop: '1px solid #f1f5f9', marginTop: 12, paddingTop: 12, display: 'flex', gap: 8 }}>
            {user ? (
              <button
                onClick={() => { setMobileOpen(false); logout(); navigate('/'); }}
                style={{
                  flex: 1, padding: '11px 16px', borderRadius: 10, border: '1.5px solid #fecaca',
                  background: '#fff1f1', color: '#dc2626', fontWeight: 600, fontSize: 14, cursor: 'pointer'
                }}
              >Sign Out</button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} style={{
                  flex: 1, padding: '11px 0', textAlign: 'center', borderRadius: 10,
                  border: '1.5px solid #e2e8f0', color: '#374151', fontWeight: 600, fontSize: 14, textDecoration: 'none'
                }}>Sign In</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} style={{
                  flex: 1, padding: '11px 0', textAlign: 'center', borderRadius: 10,
                  background: '#1e50b3', color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none'
                }}>Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
