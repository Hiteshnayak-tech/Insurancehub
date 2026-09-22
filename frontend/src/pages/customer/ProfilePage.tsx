import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { useAuth } from '../../context/AuthContext';

export default function CustomerProfilePage() {
  const { user } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || 'Aarav');
  const [lastName, setLastName] = useState(user?.lastName || 'Sharma');
  const [email] = useState(user?.email || 'demo@insurehub.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [dob, setDob] = useState('1994-08-15');
  const [city, setCity] = useState('Bengaluru, Karnataka');
  const [nomineeName, setNomineeName] = useState('Pooja Sharma (Spouse)');
  const [nomineeRelation, setNomineeRelation] = useState('Spouse');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <CustomerLayout>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px 64px' }}>
        
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: 8, display: 'flex', gap: 6 }}>
            <Link to="/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>Customer Portal</Link>
            <span>/</span>
            <span style={{ color: '#1e50b3', fontWeight: 600 }}>Profile &amp; Settings</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Account Profile &amp; KYC
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: 4 }}>
            Manage your personal policyholder details, verified identity KYC, and nominee designations.
          </p>
        </div>

        {savedSuccess && (
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            padding: '12px 16px',
            borderRadius: 8,
            marginBottom: 24,
            fontSize: '13px',
            fontWeight: 600
          }}>
            ✓ Profile details updated successfully.
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Personal Information */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>👤</span> Personal Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Email Address (Verified)
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '13px', color: '#64748b', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Residential City / State
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>

          {/* KYC Status Banner */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>🛡️</span> Regulatory KYC Verification
              </h3>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', background: '#ecfdf5', padding: '3px 10px', borderRadius: 9999, border: '1px solid #a7f3d0' }}>
                ✓ e-KYC VERIFIED
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px' }}>
              Your central insurance repository record is linked with CKYC Registry (IRDAI mandate).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, background: '#f8fafc', padding: 14, borderRadius: 8, fontSize: '12px' }}>
              <div>
                <span style={{ color: '#64748b' }}>PAN Number:</span>
                <strong style={{ display: 'block', color: '#0f172a', marginTop: 2 }}>ABCDE****F</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Aadhaar Link:</span>
                <strong style={{ display: 'block', color: '#0f172a', marginTop: 2 }}>Verified (UIDAI)</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>CKYC Identifier:</span>
                <strong style={{ display: 'block', color: '#0f172a', marginTop: 2 }}>500293810293</strong>
              </div>
            </div>
          </div>

          {/* Nominee Details */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>👨‍👩‍👦</span> Primary Nominee Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Nominee Full Name
                </label>
                <input
                  type="text"
                  value={nomineeName}
                  onChange={(e) => setNomineeName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Relationship to Policyholder
                </label>
                <select
                  value={nomineeRelation}
                  onChange={(e) => setNomineeRelation(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', background: '#fff', boxSizing: 'border-box' }}
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Child">Son / Daughter</option>
                  <option value="Sibling">Brother / Sister</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                background: '#1e50b3',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(30,80,179,0.2)'
              }}
            >
              Save Profile Changes
            </button>
          </div>

        </form>

      </div>
    </CustomerLayout>
  );
}
