import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@insurehub.com');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<'CUSTOMER' | 'ADMIN'>('CUSTOMER');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      await login(email, selectedRole);
      setIsLoading(false);
      navigate(selectedRole === 'ADMIN' ? '/admin/dashboard' : '/dashboard');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Sign in failed. Please check your credentials.');
    }
  };

  const handleQuickDemo = (role: 'CUSTOMER' | 'ADMIN') => {
    setSelectedRole(role);
    if (role === 'ADMIN') {
      setEmail('admin@insurehub.com');
    } else {
      setEmail('demo@insurehub.com');
    }
  };

  return (
    <AuthLayout
      title="Sign in to your Account"
      subtitle="Access your policies, track claims, or manage insurance operations"
    >
      {/* Role Selection Tabs */}
      <div style={{
        display: 'flex',
        background: '#f1f5f9',
        padding: 4,
        borderRadius: 10,
        marginBottom: 20
      }}>
        <button
          type="button"
          onClick={() => handleQuickDemo('CUSTOMER')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            background: selectedRole === 'CUSTOMER' ? '#ffffff' : 'transparent',
            color: selectedRole === 'CUSTOMER' ? '#1e50b3' : '#64748b',
            boxShadow: selectedRole === 'CUSTOMER' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          👤 Customer Portal
        </button>
        <button
          type="button"
          onClick={() => handleQuickDemo('ADMIN')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            background: selectedRole === 'ADMIN' ? '#ffffff' : 'transparent',
            color: selectedRole === 'ADMIN' ? '#6b21a8' : '#64748b',
            boxShadow: selectedRole === 'ADMIN' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          🛡️ Admin Console
        </button>
      </div>

      {/* Demo Credentials Helper */}
      <div style={{
        background: selectedRole === 'ADMIN' ? '#faf5ff' : '#eff6ff',
        border: `1px solid ${selectedRole === 'ADMIN' ? '#e9d5ff' : '#dbeafe'}`,
        borderRadius: 8,
        padding: '10px 14px',
        marginBottom: 18,
        fontSize: '12px',
        color: selectedRole === 'ADMIN' ? '#6b21a8' : '#1e40af',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <strong>Demo {selectedRole === 'ADMIN' ? 'Administrator' : 'Customer'}:</strong> {email}
        </div>
        <span style={{ fontSize: '11px', opacity: 0.8 }}>Password: any</span>
      </div>

      {errorMessage && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#991b1b',
          fontSize: '12px',
          padding: '10px 14px',
          borderRadius: 8,
          marginBottom: 16
        }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: '1.5px solid #cbd5e1',
              fontSize: '14px',
              color: '#0f172a',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
              Password
            </label>
            <button
              type="button"
              onClick={() => alert('Demo Mode: Any password string is valid for testing!')}
              style={{ background: 'none', border: 'none', color: '#1e50b3', fontSize: '11px', cursor: 'pointer', padding: 0 }}
            >
              Forgot password?
            </button>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: '1.5px solid #cbd5e1',
              fontSize: '14px',
              color: '#0f172a',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 8,
            border: 'none',
            background: selectedRole === 'ADMIN' ? '#6b21a8' : '#1e50b3',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 700,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
            marginTop: 6,
            transition: 'background 0.2s'
          }}
        >
          {isLoading ? 'Authenticating...' : `Sign In as ${selectedRole === 'ADMIN' ? 'Admin' : 'Customer'}`}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 20, fontSize: '13px', color: '#64748b' }}>
        Don't have an account yet?{' '}
        <Link to="/register" style={{ color: '#1e50b3', fontWeight: 600, textDecoration: 'none' }}>
          Create Free Account
        </Link>
      </div>
    </AuthLayout>
  );
}
