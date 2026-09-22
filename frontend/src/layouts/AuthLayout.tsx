import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0b1d40 0%, #102a5c 50%, #081329 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px 16px',
      position: 'relative'
    }}>
      {/* Top Demo Banner */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        background: '#fffbeb',
        borderBottom: '1px solid #fef08a',
        color: '#92400e',
        fontSize: '12px',
        fontWeight: 500,
        textAlign: 'center',
        padding: '6px 16px'
      }}>
        ⚠️ Academic Demonstration — Not connected to actual insurers or financial institutions.
      </div>

      <div style={{
        width: '100%',
        maxWidth: 440,
        background: '#ffffff',
        borderRadius: 16,
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)',
        border: '1px solid #e2e8f0',
        padding: '36px 32px',
        marginTop: 32
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #1e50b3 0%, #0ea5e9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 20,
              fontWeight: 800,
              boxShadow: '0 4px 12px rgba(30,80,179,0.3)'
            }}>
              IH
            </div>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
              Insure<span style={{ color: '#1e50b3' }}>Hub</span>
            </span>
          </Link>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 20, marginBottom: 6 }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Content Body */}
        {children}

        {/* Security / Honesty Footer */}
        <div style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          fontSize: 11,
          color: '#94a3b8'
        }}>
          <span>🔒 256-Bit SSL Secured</span>
          <span>•</span>
          <span>🛡️ Simulated IRDAI Compliant</span>
          <span>•</span>
          <Link to="/" style={{ color: '#1e50b3', textDecoration: 'none' }}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
