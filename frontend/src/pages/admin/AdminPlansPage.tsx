import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import api from '../../api/axios';
import type { Plan } from '../../types';

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Health' | 'Motor' | 'Home' | 'Travel' | 'Life' | 'Business'>('Health');
  const [insurerName, setInsurerName] = useState('Star Health Care');
  const [basePremium, setBasePremium] = useState('7999');
  const [coverageLimit, setCoverageLimit] = useState('1000000');
  const [description, setDescription] = useState('');

  const fetchPlans = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await api.get('/admin/plans');
      if (res.data && res.data.data) {
        setPlans(res.data.data);
      }
    } catch (err: any) {
      console.error('Failed to fetch admin plans:', err);
      setErrorMessage('Could not load plan catalogue from database.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setModalError('');

    try {
      const payload = {
        name,
        category,
        insurerName,
        rating: 4.8,
        reviewsCount: 1,
        basePremium: Number(basePremium) || 5000,
        coverageLimit: Number(coverageLimit) || 1000000,
        cashlessHospitals: 5000,
        claimSettlementRatio: 98.2,
        waitingPeriod: 'N/A',
        deductible: 0,
        description: description || 'Comprehensive underwritten retail plan.',
        features: ['Full Cashless Hospitalization', 'Zero Room Rent Capping', 'Instant Settlement'],
        exclusions: ['Standard exclusions apply'],
        popular: false
      };

      const res = await api.post('/admin/plans', payload);
      if (res.data && res.data.data) {
        setPlans(prev => [...prev, res.data.data]);
      } else {
        await fetchPlans();
      }

      setIsAddModalOpen(false);
      setName('');
      setDescription('');
    } catch (err: any) {
      console.error('Failed to create plan:', err);
      setModalError(err.response?.data?.message || 'Failed to publish plan. Please check required fields.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePlanStatus = async (plan: Plan) => {
    const isDeactivating = (plan as any).active !== false;
    const confirmMsg = isDeactivating
      ? `Are you sure you want to deactivate "${plan.name}"? It will be hidden from the public marketplace.`
      : `Are you sure you want to activate "${plan.name}"? It will become visible on the public marketplace.`;

    if (!confirm(confirmMsg)) return;

    try {
      const res = await api.patch(`/admin/plans/${plan.id}/status`, { active: !isDeactivating });
      if (res.data && res.data.data) {
        setPlans(prev =>
          prev.map(p => (p.id === plan.id ? { ...p, active: res.data.data.active } : p))
        );
      } else {
        await fetchPlans();
      }
    } catch (err: any) {
      console.error('Failed to update plan status:', err);
      alert('Failed to update plan status in database. Please try again.');
    }
  };

  return (
    <AdminLayout
      title="Plan Catalogue Management"
      breadcrumb={[{ label: 'Admin Console' }, { label: 'Plans' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Toolbar */}
        <div style={{
          background: '#ffffff',
          borderRadius: 10,
          border: '1px solid #e2e8f0',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Insurance Products in Database ({plans.length})
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Configure pricing, sum insured tiers, and live marketplace activation</span>
          </div>

          <button
            onClick={() => {
              setModalError('');
              setIsAddModalOpen(true);
            }}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            + Create New Plan
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div style={{
            background: '#fff1f1',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            borderRadius: 8,
            padding: '12px 16px',
            fontSize: '13px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{errorMessage}</span>
            <button
              onClick={fetchPlans}
              style={{ background: 'none', border: 'none', color: '#1e50b3', fontWeight: 600, cursor: 'pointer' }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Table of Plans */}
        <div style={{ background: '#ffffff', borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          {isLoading ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
              <div style={{ fontSize: '28px', marginBottom: 8 }}>⏳</div>
              <div>Loading plan catalogue from database...</div>
            </div>
          ) : plans.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
              <div style={{ fontSize: '32px', marginBottom: 8 }}>📋</div>
              <div style={{ fontWeight: 600, color: '#0f172a' }}>No insurance plans in database</div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                style={{
                  marginTop: 12,
                  padding: '8px 16px',
                  borderRadius: 8,
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Create Your First Plan
              </button>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 16px' }}>Plan Name &amp; Insurer</th>
                  <th style={{ padding: '12px 16px' }}>Category</th>
                  <th style={{ padding: '12px 16px' }}>Sum Insured</th>
                  <th style={{ padding: '12px 16px' }}>Base Premium</th>
                  <th style={{ padding: '12px 16px' }}>CSR Ratio</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => {
                  const isActive = (p as any).active !== false;
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9', opacity: isActive ? 1 : 0.65 }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{p.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{p.insurerName}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 4,
                          background: '#eff6ff',
                          color: '#1e40af'
                        }}>
                          {p.category}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                        ₹{(p.coverageLimit / 100000).toFixed(1)} Lakh
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                        ₹{Number(p.basePremium).toLocaleString('en-IN')}/yr
                      </td>
                      <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 600 }}>
                        {p.claimSettlementRatio}%
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 4,
                          background: isActive ? '#ecfdf5' : '#f1f5f9',
                          color: isActive ? '#15803d' : '#64748b'
                        }}>
                          {isActive ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleTogglePlanStatus(p)}
                          style={{
                            padding: '5px 12px',
                            borderRadius: 6,
                            border: '1px solid',
                            borderColor: isActive ? '#fecaca' : '#bbf7d0',
                            background: isActive ? '#fff1f1' : '#f0fdf4',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            color: isActive ? '#dc2626' : '#16a34a'
                          }}
                        >
                          {isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal: Add Plan */}
        {isAddModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            zIndex: 100
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: 16,
              maxWidth: 500,
              width: '100%',
              padding: 28,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  Publish New Insurance Plan
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#64748b' }}
                >
                  ✕
                </button>
              </div>

              {modalError && (
                <div style={{
                  background: '#fff1f1',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  padding: '8px 12px',
                  borderRadius: 6,
                  fontSize: '12px',
                  marginBottom: 12
                }}>
                  {modalError}
                </div>
              )}

              <form onSubmit={handleCreatePlan} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                    Plan Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., UltraShield Gold Hospital Cover"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                      Domain Category
                    </label>
                    <select
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', background: '#fff' }}
                    >
                      <option value="Health">Health</option>
                      <option value="Motor">Motor</option>
                      <option value="Life">Life</option>
                      <option value="Home">Home</option>
                      <option value="Travel">Travel</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                      Insurer Partner
                    </label>
                    <input
                      type="text"
                      required
                      value={insurerName}
                      onChange={(e) => setInsurerName(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                      Annual Premium (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={basePremium}
                      onChange={(e) => setBasePremium(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                      Sum Insured (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={coverageLimit}
                      onChange={(e) => setCoverageLimit(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                    Short Summary / Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Key benefits, OPD limits, cashless networks..."
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #cbd5e1', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 8,
                      background: '#2563eb',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? 'Publishing...' : 'Publish to Marketplace'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: 8,
                      background: '#f1f5f9',
                      color: '#475569',
                      fontSize: '13px',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
