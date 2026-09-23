import { Link } from 'react-router-dom';

export function CustomerFooter() {
  return (
    <footer style={{ background: '#0c1e4a', color: 'rgba(255,255,255,0.6)', padding: '56px 0 32px' }}>
      <div className="ih-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
              }}>🛡️</div>
              <span style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                Insure<span style={{ color: '#38bdf8' }}>Hub</span>
              </span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 240 }}>
              Transparent insurance comparison and management platform.
            </p>
          </div>

          {/* Explore */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#fff', marginBottom: 16 }}>Explore</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Insurance Plans', path: '/plans' },
                { label: 'Compare Plans', path: '/compare' },
                { label: 'Premium Calculator', path: '/calculator' },
                { label: 'AI Policy Explainer', path: '/ai-explainer' },
              ].map(item => (
                <li key={item.path}>
                  <Link to={item.path} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#fff', marginBottom: 16 }}>Categories</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Health', 'Motor', 'Life', 'Travel', 'Home', 'Business'].map(cat => (
                <li key={cat}>
                  <Link to={`/plans?category=${cat}`} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >{cat} Insurance</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#fff', marginBottom: 16 }}>My Account</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Dashboard', path: '/dashboard' },
                { label: 'My Policies', path: '/my-policies' },
                { label: 'Claims', path: '/claims' },
                { label: 'Support', path: '/support' },
                { label: 'Sign In', path: '/login' },
              ].map(item => (
                <li key={item.path}>
                  <Link to={item.path} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 12 }}>© 2026 InsureHub · Academic Project · Built with Spring Boot 3.4 &amp; React 19</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>All plan data is simulated for demonstration purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
