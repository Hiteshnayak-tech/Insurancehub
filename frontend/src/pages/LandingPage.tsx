import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth, initialPlans } from '../context/AuthContext';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { CalculatorCore } from '../components/shared/CalculatorCore';
import { AiExplainerCore } from '../components/shared/AiExplainerCore';
import { ComparePreview } from '../components/shared/ComparePreview';
import type { HealthResponse } from '../types';

export default function LandingPage() {
  const [backendStatus, setBackendStatus] = useState<string>('checking...');
  const { toggleCompare, isInCompare } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get<HealthResponse>('/health')
      .then(res => setBackendStatus(res.data.status))
      .catch(() => setBackendStatus('offline'));

    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  const insuranceCategories = [
    {
      id: 'Health',
      icon: '❤️',
      title: 'Health Insurance',
      description: 'Comprehensive cashless hospitalization and critical illness coverage for your family.',
      color: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
      plansCount: '18 Plans',
    },
    {
      id: 'Motor',
      icon: '🚗',
      title: 'Motor Insurance',
      description: 'Zero depreciation, roadside assistance, and instant cashless repair network.',
      color: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      plansCount: '14 Plans',
    },
    {
      id: 'Life',
      icon: '👨‍👩‍👧‍👦',
      title: 'Term Life Insurance',
      description: 'Guaranteed financial safety net with high sum-assured at nominal monthly premiums.',
      color: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
      plansCount: '9 Plans',
    },
    {
      id: 'Home',
      icon: '🏠',
      title: 'Home & Property',
      description: 'Defend your house structure, appliances, and precious contents from hazards.',
      color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      plansCount: '6 Plans',
    },
    {
      id: 'Travel',
      icon: '✈️',
      title: 'Travel Insurance',
      description: 'Worry-free journeys with baggage loss, emergency medical, and flight delay cover.',
      color: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
      plansCount: '11 Plans',
    },
    {
      id: 'Business',
      icon: '💼',
      title: 'Business & SME',
      description: 'Protect commercial assets, liability, and inventory against operational risks.',
      color: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      plansCount: '8 Plans',
    },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <CustomerLayout>
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        
        {/* ── 1. HERO SECTION (#home) ── */}
        <section id="home" className="landing-section" style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #060e26 0%, #0c1e4a 50%, #112b6e 100%)',
          color: '#ffffff',
          padding: '64px 0 80px'
        }}>
          <div className="ih-container" style={{ position: 'relative', zIndex: 10 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 48,
              alignItems: 'center'
            }}>
              
              {/* Left Column: Value Prop */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                
                {/* Status Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  fontSize: 12,
                  fontWeight: 500,
                  alignSelf: 'flex-start'
                }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: backendStatus === 'UP' ? '#22c55e' : '#f59e0b',
                    boxShadow: backendStatus === 'UP' ? '0 0 8px #22c55e' : 'none'
                  }} />
                  <span>
                    Backend API: <strong style={{ color: '#ffffff' }}>{backendStatus === 'UP' ? 'Online & Healthy' : backendStatus}</strong>
                  </span>
                </div>

                <h1 style={{
                  fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  margin: 0
                }}>
                  Transparent Insurance{' '}
                  <span style={{
                    background: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Without Confusing Fine Print
                  </span>
                </h1>

                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                  color: '#cbd5e1',
                  maxWidth: 580,
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  Compare plans side-by-side, uncover hidden exclusions before buying, calculate exact premiums, and manage policies seamlessly.
                </p>

                {/* Primary Actions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingTop: 8 }}>
                  <button
                    type="button"
                    onClick={() => scrollTo('insurance')}
                    style={{
                      padding: '13px 24px',
                      borderRadius: 12,
                      background: '#2563eb',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: 14,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Browse &amp; Compare Plans ↓
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollTo('calculator')}
                    style={{
                      padding: '13px 20px',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.2)',
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    📊 Calculate Premium
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollTo('ai-explainer')}
                    style={{
                      padding: '13px 20px',
                      borderRadius: 12,
                      background: 'rgba(15,23,42,0.6)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56,189,248,0.3)',
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>🤖</span> AI Explainer
                  </button>
                </div>

                {/* Trust stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 16,
                  paddingTop: 24,
                  borderTop: '1px solid rgba(255,255,255,0.12)',
                  marginTop: 8
                }}>
                  <div>
                    <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#ffffff', margin: 0 }}>50+</p>
                    <p style={{ fontSize: 12, color: '#94a3b8', margin: '2px 0 0' }}>Verified Plans</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#38bdf8', margin: 0 }}>98.5%</p>
                    <p style={{ fontSize: 12, color: '#94a3b8', margin: '2px 0 0' }}>Avg Claim Ratio</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#ffffff', margin: 0 }}>100%</p>
                    <p style={{ fontSize: 12, color: '#94a3b8', margin: '2px 0 0' }}>Jargon-Free</p>
                  </div>
                </div>

              </div>

              {/* Right Column: Featured Recommendation Card */}
              <div>
                <div style={{
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 24,
                  padding: '28px 24px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(16px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#38bdf8',
                      background: 'rgba(6, 182, 212, 0.15)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      padding: '4px 10px',
                      borderRadius: 999
                    }}>
                      ⭐ Featured Recommendation
                    </span>
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>IRDAI Regulated</span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: '#ffffff', margin: '0 0 4px' }}>
                      CareShield Comprehensive Health
                    </h3>
                    <p style={{ fontSize: 13, color: '#cbd5e1', margin: 0 }}>
                      Star Health Care • 8,400+ Cashless Hospitals
                    </p>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 12,
                    padding: '14px 0',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div>
                      <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Coverage (Sum Insured)</p>
                      <p style={{ fontSize: 18, fontWeight: 800, color: '#34d399', margin: '2px 0 0' }}>₹15,00,000</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Base Premium</p>
                      <p style={{ fontSize: 18, fontWeight: 800, color: '#ffffff', margin: '2px 0 0' }}>
                        ₹8,499<span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 400 }}>/yr</span>
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12, color: '#cbd5e1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#34d399', fontWeight: 700 }}>✓</span>
                      <span>Zero Room Rent Capping</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#34d399', fontWeight: 700 }}>✓</span>
                      <span>Free Annual Comprehensive Health Checkup</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#34d399', fontWeight: 700 }}>✓</span>
                      <span>No Claim Bonus doubles sum insured over 2 years</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
                    <button
                      type="button"
                      onClick={() => navigate('/plans/1')}
                      style={{
                        flex: 1,
                        padding: '11px',
                        borderRadius: 10,
                        background: '#2563eb',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: 13,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      View Details &amp; Buy
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCompare(initialPlans[0])}
                      style={{
                        padding: '11px 16px',
                        borderRadius: 10,
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: isInCompare(1) ? '#38bdf8' : 'rgba(255,255,255,0.2)',
                        background: isInCompare(1) ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.06)',
                        color: isInCompare(1) ? '#38bdf8' : '#e2e8f0'
                      }}
                    >
                      {isInCompare(1) ? '✓ In Compare' : '+ Compare'}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ── 2. INSURANCE SECTION (#insurance) ── */}
        <section id="insurance" className="landing-section" style={{
          padding: '80px 0',
          background: '#ffffff'
        }}>
          <div className="ih-container">
            
            {/* Category header */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 16,
              marginBottom: 36
            }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#1e50b3',
                  background: '#eff6ff',
                  padding: '4px 12px',
                  borderRadius: 999,
                  marginBottom: 8
                }}>
                  Insurance Domains
                </span>
                <h2 style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#0f172a',
                  margin: '6px 0 0',
                  letterSpacing: '-0.02em'
                }}>
                  Browse by Insurance Category
                </h2>
              </div>
              <Link
                to="/insurance"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#2563eb',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                View all categories page →
              </Link>
            </div>

            {/* Category Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              marginBottom: 64
            }}>
              {insuranceCategories.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => navigate(`/plans?category=${cat.id}`)}
                  style={{
                    textAlign: 'left',
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 24,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.03)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: cat.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        color: '#ffffff',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}>
                        {cat.icon}
                      </div>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: 8,
                        background: '#f1f5f9',
                        color: '#475569'
                      }}>
                        {cat.plansCount}
                      </span>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                      {cat.title}
                    </h3>
                    <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                      {cat.description}
                    </p>
                  </div>

                  <div style={{
                    marginTop: 16,
                    paddingTop: 12,
                    borderTop: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#2563eb'
                  }}>
                    <span>Explore available policies</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Popular Plans Sub-Section */}
            <div style={{
              background: '#f8fafc',
              borderRadius: 24,
              border: '1px solid #e2e8f0',
              padding: '40px 28px'
            }}>
              <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 36px' }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#1e50b3',
                  background: '#eff6ff',
                  padding: '3px 10px',
                  borderRadius: 999
                }}>
                  Marketplace Top Picks
                </span>
                <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#0f172a', margin: '8px 0 6px' }}>
                  Most Popular Plans
                </h3>
                <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
                  Carefully evaluated for highest claim settlement ratio and minimal customer friction.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 20
              }}>
                {initialPlans.slice(0, 3).map((plan) => {
                  const inComp = isInCompare(plan.id);
                  return (
                    <div
                      key={plan.id}
                      style={{
                        background: '#ffffff',
                        borderRadius: 18,
                        border: '1px solid #e2e8f0',
                        padding: 22,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
                          <span style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            color: '#1e50b3',
                            background: '#eff6ff',
                            padding: '3px 8px',
                            borderRadius: 6
                          }}>
                            {plan.category}
                          </span>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#d97706',
                            background: '#fffbeb',
                            padding: '2px 8px',
                            borderRadius: 6
                          }}>
                            <span>★</span>
                            <span>{plan.rating}</span>
                          </div>
                        </div>

                        <h4 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>
                          {plan.name}
                        </h4>
                        <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 14px' }}>
                          {plan.insurerName}
                        </p>

                        <div style={{
                          background: '#f8fafc',
                          borderRadius: 12,
                          padding: '10px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6,
                          marginBottom: 14,
                          border: '1px solid #e2e8f0'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span style={{ color: '#64748b' }}>Coverage Limit:</span>
                            <span style={{ fontWeight: 700, color: '#0f172a' }}>₹{(plan.coverageLimit / 100000).toFixed(1)} Lakhs</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span style={{ color: '#64748b' }}>Claim Ratio:</span>
                            <span style={{ fontWeight: 700, color: '#16a34a' }}>{plan.claimSettlementRatio}%</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                          {plan.features.slice(0, 3).map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#475569' }}>
                              <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span>
                              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{
                        paddingTop: 14,
                        borderTop: '1px solid #f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8
                      }}>
                        <div>
                          <p style={{ fontSize: 10, color: '#94a3b8', margin: 0 }}>Starting from</p>
                          <p style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: 0 }}>
                            ₹{plan.basePremium.toLocaleString()}<span style={{ fontSize: 11, fontWeight: 400, color: '#64748b' }}>/yr</span>
                          </p>
                        </div>

                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            type="button"
                            onClick={() => toggleCompare(plan)}
                            style={{
                              padding: '8px 10px',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                              border: '1px solid',
                              borderColor: inComp ? '#38bdf8' : '#e2e8f0',
                              background: inComp ? '#f0f9ff' : '#ffffff',
                              color: inComp ? '#0284c7' : '#475569'
                            }}
                            title={inComp ? 'Remove from compare' : 'Add to compare'}
                          >
                            ⚖️
                          </button>
                          <Link
                            to={`/plans/${plan.id}`}
                            style={{
                              padding: '8px 14px',
                              borderRadius: 8,
                              background: '#2563eb',
                              color: '#ffffff',
                              fontSize: 12,
                              fontWeight: 700,
                              textDecoration: 'none'
                            }}
                          >
                            View Plan
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>


        {/* ── 3. COMPARE SECTION (#compare) ── */}
        <section id="compare" className="landing-section" style={{
          padding: '80px 0',
          background: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div className="ih-container">
            <ComparePreview />
          </div>
        </section>


        {/* ── 4. CALCULATOR SECTION (#calculator) ── */}
        <section id="calculator" className="landing-section" style={{
          padding: '80px 0',
          background: '#ffffff'
        }}>
          <div className="ih-container">
            <CalculatorCore showHeader={true} />
          </div>
        </section>


        {/* ── 5. AI EXPLAINER SECTION (#ai-explainer) ── */}
        <section id="ai-explainer" className="landing-section" style={{
          padding: '80px 0',
          background: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div className="ih-container">
            <AiExplainerCore showHeader={true} />
          </div>
        </section>


        {/* ── 6. CLAIMS SECTION (#claims) ── */}
        <section id="claims" className="landing-section" style={{
          padding: '80px 0',
          background: '#ffffff'
        }}>
          <div className="ih-container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 48,
              alignItems: 'center'
            }}>
              
              <div>
                <span style={{
                  display: 'inline-block',
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#15803d',
                  background: '#dcfce7',
                  padding: '4px 12px',
                  borderRadius: 999,
                  marginBottom: 8
                }}>
                  Zero-Hassle Settlement
                </span>
                <h2 style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#0f172a',
                  margin: '6px 0 12px',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em'
                }}>
                  Track &amp; File Cashless Claims Digitally
                </h2>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6, margin: '0 0 24px' }}>
                  No tedious paperwork or weeks of waiting. InsureHub integrates directly with 14,000+ network hospitals and garages for paperless claim submissions with AI pre-approval.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
                  {[
                    { step: '1', title: 'Incident Notification in 60s', desc: 'Notify via app with basic event details and hospital ID' },
                    { step: '2', title: 'Cashless Network Pre-Auth', desc: 'Direct TPA authorization within 4 hours without deposit' },
                    { step: '3', title: 'AI Document Auditing', desc: 'Hospital bills and discharge summary verified for IRDAI compliance' },
                    { step: '4', title: 'Direct Digital Disbursement', desc: 'Direct hospital payout with zero out-of-pocket stress' }
                  ].map((item) => (
                    <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: '#eff6ff',
                        color: '#2563eb',
                        fontWeight: 800,
                        fontSize: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {item.step}
                      </div>
                      <div>
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>{item.title}</h4>
                        <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link
                    to="/claims"
                    style={{
                      padding: '12px 24px',
                      borderRadius: 12,
                      background: '#16a34a',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: 14,
                      textDecoration: 'none',
                      boxShadow: '0 4px 12px rgba(22,163,74,0.25)',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    File / Track a Claim →
                  </Link>
                  <Link
                    to="/my-policies"
                    style={{
                      padding: '12px 20px',
                      borderRadius: 12,
                      background: '#f8fafc',
                      color: '#334155',
                      border: '1.5px solid #cbd5e1',
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: 'none'
                    }}
                  >
                    My Active Policies
                  </Link>
                </div>
              </div>

              {/* Claims Graphic / Stat Card */}
              <div style={{
                background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
                color: '#ffffff',
                borderRadius: 24,
                padding: '36px 30px',
                boxShadow: '0 16px 36px rgba(6,78,59,0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: 24
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#6ee7b7',
                    background: 'rgba(110,231,183,0.15)',
                    padding: '4px 10px',
                    borderRadius: 8
                  }}>
                    Claims Dashboard Snapshot
                  </span>
                  <span style={{ fontSize: 12, color: '#a7f3d0' }}>Live Settlement Speed</span>
                </div>

                <div>
                  <p style={{ fontSize: 13, color: '#a7f3d0', margin: 0 }}>Average Cashless Approval</p>
                  <p style={{ fontSize: 36, fontWeight: 800, color: '#ffffff', margin: '4px 0 0' }}>
                    3.8 Hours
                  </p>
                  <p style={{ fontSize: 12, color: '#6ee7b7', margin: '2px 0 0' }}>
                    Across 14,000+ empanelled hospital partners
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  padding: 18,
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: '#cbd5e1' }}>Overall Claims Ratio:</span>
                    <span style={{ fontWeight: 700, color: '#6ee7b7' }}>98.5% Settlement</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: '#cbd5e1' }}>Hospital Cashless Desk:</span>
                    <span style={{ fontWeight: 700, color: '#ffffff' }}>24/7 Active Hotline</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: '#cbd5e1' }}>Paperless Uploads:</span>
                    <span style={{ fontWeight: 700, color: '#ffffff' }}>Instant OCR Verification</span>
                  </div>
                </div>

                <div style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.5 }}>
                  InsureHub provides dedicated grievance escalation and ombudsman mediation if an insurer disputes legitimate medical claims.
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ── 7. SUPPORT SECTION (#support) ── */}
        <section id="support" className="landing-section" style={{
          padding: '80px 0',
          background: '#f8fafc',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div className="ih-container">
            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#1e50b3',
                background: '#eff6ff',
                padding: '4px 12px',
                borderRadius: 999,
                display: 'inline-block',
                marginBottom: 8
              }}>
                24/7 Dedicated Assistance
              </span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                color: '#0f172a',
                margin: '6px 0 10px',
                letterSpacing: '-0.02em'
              }}>
                We're Here When You Need Us Most
              </h2>
              <p style={{ fontSize: 15, color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                Have questions about fine print, policy renewal, or claim filing? Our independent advisors are ready to assist.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
              marginBottom: 40
            }}>
              {[
                {
                  icon: '💬',
                  title: 'Claims Assistance Helpline',
                  desc: 'Priority emergency assistance for hospital admissions, cashless pre-auth, and ambulance claims.',
                  contact: '1800-419-7000 (Toll Free)'
                },
                {
                  icon: '⚖️',
                  title: 'IRDAI Ombudsman Guidance',
                  desc: 'Unbiased advisory on disputed rejections, sub-limits, and regulatory grievance escalation.',
                  contact: 'grievance@insurehub.demo'
                },
                {
                  icon: '🤖',
                  title: 'AI Policy Assistant',
                  desc: 'Instant explanation of ambiguous medical terminology, waiting periods, and room rent caps.',
                  contact: 'Available 24/7 on Web'
                },
                {
                  icon: '🛡️',
                  title: 'Fraud & Transparency Shield',
                  desc: 'Report deceptive misselling or unauthorized policy modifications with zero risk.',
                  contact: 'compliance@insurehub.demo'
                }
              ].map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    borderRadius: 18,
                    border: '1.5px solid #e2e8f0',
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <div>
                    <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, margin: '0 0 16px' }}>
                      {card.desc}
                    </p>
                  </div>
                  <div style={{
                    paddingTop: 12,
                    borderTop: '1px solid #f1f5f9',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#1e50b3'
                  }}>
                    {card.contact}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link
                to="/support"
                style={{
                  display: 'inline-block',
                  padding: '13px 28px',
                  borderRadius: 12,
                  background: '#1e50b3',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(30,80,179,0.25)'
                }}
              >
                Go to Dedicated Support Portal →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </CustomerLayout>
  );
}
