import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { user, logout, compareList } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Plans', path: '/plans' },
    { name: 'Compare', path: '/compare', badge: compareList.length > 0 ? compareList.length : undefined },
    { name: 'Calculator', path: '/calculator' },
    { name: 'AI Explainer', path: '/ai-explainer' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 focus:outline-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold text-xl">
              🛡️
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                Insure<span className="text-cyan-600">Hub</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase">Simulated Market</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'text-blue-700 bg-blue-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.name}
                  {link.badge !== undefined && (
                    <span className="bg-cyan-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action buttons / User Menu */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 transition-colors text-left text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-semibold flex items-center justify-center text-xs shadow-xs">
                    {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden md:block">
                    <p className="font-semibold text-slate-800 leading-tight">{user.firstName} {user.lastName}</p>
                    <p className="text-[11px] text-slate-500 capitalize">{user.role.toLowerCase()}</p>
                  </div>
                  <svg className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-800 truncate">{user.email}</p>
                    </div>
                    
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-base">📊</span> My Policies &amp; Dashboard
                    </Link>

                    <Link
                      to="/support"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-base">🎫</span> Support Tickets
                    </Link>

                    {user.role === 'ADMIN' && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-purple-700 hover:bg-purple-50 font-medium transition-colors"
                      >
                        <span className="text-base">⚡</span> Admin Control Panel
                      </Link>
                    )}

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                          navigate('/');
                        }}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <span className="text-base">🚪</span> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs hover:shadow-md hover:shadow-blue-500/20 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            {user && (
              <Link
                to="/dashboard"
                className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs"
                title="Dashboard"
              >
                📊
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  active ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                {link.badge !== undefined && (
                  <span className="bg-cyan-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-slate-100 space-y-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 text-slate-800 font-medium"
                >
                  <span>📊</span> My Dashboard &amp; Policies
                </Link>
                <Link
                  to="/support"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 text-slate-800 font-medium"
                >
                  <span>🎫</span> Help &amp; Support Tickets
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    navigate('/');
                  }}
                  className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium"
                >
                  <span>🚪</span> Sign Out ({user.email})
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-700 text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-xs"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
