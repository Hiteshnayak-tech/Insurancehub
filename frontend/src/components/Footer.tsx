import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
                🛡️
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Insure<span className="text-cyan-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Empowering individuals and families with transparent insurance comparison, fair cost estimates, simulated policy management, and intelligent coverage breakdowns.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/plans" className="hover:text-white transition-colors">All Insurance Plans</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Compare Plans</Link></li>
              <li><Link to="/calculator" className="hover:text-white transition-colors">Premium Calculator</Link></li>
              <li><Link to="/ai-explainer" className="hover:text-white transition-colors">AI Policy Explainer</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/plans?category=Health" className="hover:text-white transition-colors">Health Insurance</Link></li>
              <li><Link to="/plans?category=Motor" className="hover:text-white transition-colors">Motor Insurance</Link></li>
              <li><Link to="/plans?category=Life" className="hover:text-white transition-colors">Life &amp; Term Plans</Link></li>
              <li><Link to="/plans?category=Home" className="hover:text-white transition-colors">Home &amp; Property</Link></li>
              <li><Link to="/plans?category=Travel" className="hover:text-white transition-colors">International Travel</Link></li>
            </ul>
          </div>

          {/* User & Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Account &amp; Help</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">My Dashboard</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Help &amp; Claims Support</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Create Account</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 InsureHub Technologies. Built for Academic &amp; Educational Demonstration.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Security: 256-bit Mock Encrypted</span>
            <span className="text-slate-400">Spring Boot 3.4 &amp; React 19</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
