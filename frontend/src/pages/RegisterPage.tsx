import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'CUSTOMER' | 'ADMIN'>('CUSTOMER');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      await register({ firstName, lastName, email, phone, role });
      setIsLoading(false);
      navigate(role === 'ADMIN' ? '/admin/dashboard' : '/dashboard');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Compare 50+ insurance plans and manage your coverage online"
    >
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
              First Name *
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Aarav"
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: '1.5px solid #cbd5e1',
                fontSize: '13px',
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
              Last Name *
            </label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Sharma"
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: '1.5px solid #cbd5e1',
                fontSize: '13px',
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="aarav@example.com"
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: 8,
              border: '1.5px solid #cbd5e1',
              fontSize: '13px',
              color: '#0f172a',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: 8,
              border: '1.5px solid #cbd5e1',
              fontSize: '13px',
              color: '#0f172a',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
            Password *
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: 8,
              border: '1.5px solid #cbd5e1',
              fontSize: '13px',
              color: '#0f172a',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
            Account Type
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: 8,
              border: '1.5px solid #cbd5e1',
              fontSize: '13px',
              color: '#0f172a',
              outline: 'none',
              background: '#ffffff',
              boxSizing: 'border-box'
            }}
          >
            <option value="CUSTOMER">Customer (Compare & Manage Policies)</option>
            <option value="ADMIN">Insurance Administrator (Internal Console)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 8,
            border: 'none',
            background: '#1e50b3',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 700,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
            marginTop: 8
          }}
        >
          {isLoading ? 'Creating Account...' : 'Complete Registration'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 20, fontSize: '13px', color: '#64748b' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#1e50b3', fontWeight: 600, textDecoration: 'none' }}>
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
