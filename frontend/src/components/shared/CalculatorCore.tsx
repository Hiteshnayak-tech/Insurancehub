import { useState } from 'react';
import { Link } from 'react-router-dom';

interface CalculatorCoreProps {
  showHeader?: boolean;
}

export function CalculatorCore({ showHeader = true }: CalculatorCoreProps) {
  const [insuranceType, setInsuranceType] = useState<'health' | 'motor' | 'term'>('health');
  
  // Inputs
  const [age, setAge] = useState<number>(28);
  const [sumInsured, setSumInsured] = useState<number>(1000000); // 10 Lakhs
  const [isSmoker, setIsSmoker] = useState<boolean>(false);
  const [hasPreExisting, setHasPreExisting] = useState<boolean>(false);
  const [vehicleAge, setVehicleAge] = useState<number>(1);
  const [vehicleValue, setVehicleValue] = useState<number>(800000);
  const [includeZeroDep, setIncludeZeroDep] = useState<boolean>(true);

  // Dynamic calculation logic
  const calculatePremium = () => {
    let base = 3500;

    if (insuranceType === 'health') {
      let ageFactor = 1.0;
      if (age > 45) ageFactor = 1.8;
      else if (age > 35) ageFactor = 1.4;
      else if (age > 25) ageFactor = 1.1;

      const sumFactor = (sumInsured / 1000000) * 4200;
      const smokerFactor = isSmoker ? 1.35 : 1.0;
      const preExistingFactor = hasPreExisting ? 1.25 : 1.0;

      base = sumFactor * ageFactor * smokerFactor * preExistingFactor;
    } else if (insuranceType === 'motor') {
      const idvFactor = vehicleValue * 0.024;
      const ageDepreciation = Math.max(0.8, 1 - vehicleAge * 0.05);
      const zeroDepCost = includeZeroDep ? 2400 : 0;

      base = idvFactor * ageDepreciation + zeroDepCost + 1200;
    } else if (insuranceType === 'term') {
      let ageRate = 1.0;
      if (age > 45) ageRate = 2.4;
      else if (age > 35) ageRate = 1.6;

      const sumFactor = (sumInsured / 10000000) * 8500;
      const smokerFactor = isSmoker ? 1.6 : 1.0;

      base = sumFactor * ageRate * smokerFactor;
    }

    return Math.round(base);
  };

  const estimatedPremium = calculatePremium();
  const monthlyPremium = Math.round(estimatedPremium / 12);

  return (
    <div style={{ width: '100%' }}>
      {showHeader && (
        <div style={{ maxWidth: 680, marginBottom: 28 }}>
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
            Fair Pricing Engine
          </span>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 800,
            color: '#0f172a',
            margin: '6px 0 8px',
            lineHeight: 1.2
          }}>
            Instant Insurance Premium Calculator
          </h2>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.5 }}>
            Test transparent risk factor multipliers in real time. Zero personal contact information or phone number required.
          </p>
        </div>
      )}

      {/* Type Selector Tabs */}
      <div style={{
        display: 'inline-flex',
        gap: 6,
        background: '#e2e8f0',
        padding: 5,
        borderRadius: 14,
        marginBottom: 28,
        maxWidth: 440,
        width: '100%'
      }}>
        {[
          { id: 'health', label: '❤️ Health' },
          { id: 'motor', label: '🚗 Motor' },
          { id: 'term', label: '👨‍👩‍👧 Life Term' },
        ].map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setInsuranceType(tab.id as any)}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              textAlign: 'center',
              background: insuranceType === tab.id ? '#ffffff' : 'transparent',
              color: insuranceType === tab.id ? '#1e50b3' : '#475569',
              boxShadow: insuranceType === tab.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="ih-two-col-grid">
        
        {/* Input Controls Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: 20,
          border: '1px solid #e2e8f0',
          padding: '28px 24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}>
          
          {insuranceType === 'health' && (
            <>
              {/* Age slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#475569' }}>
                    Insured Member Age
                  </label>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#2563eb',
                    background: '#eff6ff',
                    padding: '3px 10px',
                    borderRadius: 8
                  }}>
                    {age} years old
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="75"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer', height: 6 }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                  <span>18 yrs</span>
                  <span>45 yrs</span>
                  <span>75 yrs</span>
                </div>
              </div>

              {/* Sum Insured */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#475569', marginBottom: 10 }}>
                  Desired Medical Cover (Sum Insured)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 8 }}>
                  {[500000, 1000000, 1500000, 2500000].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setSumInsured(amt)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        border: '1.5px solid',
                        borderColor: sumInsured === amt ? '#2563eb' : '#e2e8f0',
                        background: sumInsured === amt ? '#2563eb' : '#f8fafc',
                        color: sumInsured === amt ? '#ffffff' : '#334155',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      ₹{(amt / 100000).toFixed(0)} Lakhs
                    </button>
                  ))}
                </div>
              </div>

              {/* Health Risk Factors */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <label style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#475569' }}>
                  Lifestyle &amp; Medical History
                </label>
                
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 14,
                  background: '#f8fafc',
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer'
                }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', margin: 0 }}>Tobacco / Nicotine Consumption</p>
                    <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 0' }}>Regular or occasional smoking habits</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isSmoker}
                    onChange={(e) => setIsSmoker(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: '#2563eb', cursor: 'pointer' }}
                  />
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 14,
                  background: '#f8fafc',
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer'
                }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', margin: 0 }}>Pre-existing Medical Conditions</p>
                    <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 0' }}>Hypertension, Diabetes, Thyroid, or prior surgeries</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasPreExisting}
                    onChange={(e) => setHasPreExisting(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: '#2563eb', cursor: 'pointer' }}
                  />
                </label>
              </div>
            </>
          )}

          {insuranceType === 'motor' && (
            <>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#475569' }}>
                    Vehicle Declared Value (IDV)
                  </label>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#2563eb',
                    background: '#eff6ff',
                    padding: '3px 10px',
                    borderRadius: 8
                  }}>
                    ₹{vehicleValue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="300000"
                  max="3000000"
                  step="50000"
                  value={vehicleValue}
                  onChange={(e) => setVehicleValue(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer', height: 6 }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                  <span>₹3 Lakh</span>
                  <span>₹15 Lakh</span>
                  <span>₹30 Lakh</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#475569', marginBottom: 10 }}>
                  Vehicle Age
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  {[0, 1, 2, 4].map((yr) => (
                    <button
                      type="button"
                      key={yr}
                      onClick={() => setVehicleAge(yr)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        border: '1.5px solid',
                        borderColor: vehicleAge === yr ? '#2563eb' : '#e2e8f0',
                        background: vehicleAge === yr ? '#2563eb' : '#f8fafc',
                        color: vehicleAge === yr ? '#ffffff' : '#334155',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {yr === 0 ? 'Brand New' : `${yr} Yrs`}
                    </button>
                  ))}
                </div>
              </div>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 14,
                background: '#f8fafc',
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                cursor: 'pointer'
              }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', margin: 0 }}>Add Zero-Depreciation Cover</p>
                  <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 0' }}>100% claim on rubber, plastic, and fiber glass parts</p>
                </div>
                <input
                  type="checkbox"
                  checked={includeZeroDep}
                  onChange={(e) => setIncludeZeroDep(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: '#2563eb', cursor: 'pointer' }}
                />
              </label>
            </>
          )}

          {insuranceType === 'term' && (
            <>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#475569' }}>
                    Applicant Age
                  </label>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#2563eb',
                    background: '#eff6ff',
                    padding: '3px 10px',
                    borderRadius: 8
                  }}>
                    {age} years
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="60"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer', height: 6 }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                  <span>18 yrs</span>
                  <span>40 yrs</span>
                  <span>60 yrs</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#475569', marginBottom: 10 }}>
                  Term Cover (Sum Assured)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {[5000000, 10000000, 20000000].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setSumInsured(amt)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        border: '1.5px solid',
                        borderColor: sumInsured === amt ? '#2563eb' : '#e2e8f0',
                        background: sumInsured === amt ? '#2563eb' : '#f8fafc',
                        color: sumInsured === amt ? '#ffffff' : '#334155',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      ₹{(amt / 10000000).toFixed(0)} Crore
                    </button>
                  ))}
                </div>
              </div>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 14,
                background: '#f8fafc',
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                cursor: 'pointer'
              }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', margin: 0 }}>Smoker / Nicotine Use</p>
                  <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 0' }}>Statutory mortality multiplier</p>
                </div>
                <input
                  type="checkbox"
                  checked={isSmoker}
                  onChange={(e) => setIsSmoker(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: '#2563eb', cursor: 'pointer' }}
                />
              </label>
            </>
          )}

        </div>

        {/* Premium Output Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0c1e4a 0%, #060e26 100%)',
          color: '#ffffff',
          borderRadius: 20,
          padding: '32px 28px',
          boxShadow: '0 10px 30px rgba(12,30,74,0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}>
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#38bdf8'
            }}>
              Estimated Pricing Breakdown
            </span>
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                ₹{estimatedPremium.toLocaleString()}
              </span>
              <span style={{ fontSize: 14, color: '#94a3b8' }}>/year</span>
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', margin: '4px 0 0' }}>
              Or approx <strong style={{ color: '#38bdf8' }}>₹{monthlyPremium.toLocaleString()}/month</strong>
            </p>
          </div>

          <div style={{
            padding: 16,
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: 14,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            fontSize: 13
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#cbd5e1' }}>Base Risk Premium:</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>₹{Math.round(estimatedPremium * 0.82).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#cbd5e1' }}>Applicable GST (18%):</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>₹{Math.round(estimatedPremium * 0.18).toLocaleString()}</span>
            </div>
            <div style={{
              paddingTop: 8,
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 700
            }}>
              <span style={{ color: '#38bdf8' }}>Net Estimated Total:</span>
              <span style={{ color: '#ffffff' }}>₹{estimatedPremium.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
            <p style={{ fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>Why calculate with InsureHub?</p>
            <p style={{ margin: 0 }}>
              Most aggregators sell your phone number to telemarketers immediately. We compute quotes transparently in your browser with zero data harvesting.
            </p>
          </div>

          <Link
            to="/plans"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '13px 20px',
              borderRadius: 12,
              background: '#38bdf8',
              color: '#060e26',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(56,189,248,0.25)',
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#7dd3fc')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#38bdf8')}
          >
            Browse Matching Plans in Market →
          </Link>
        </div>

      </div>
    </div>
  );
}
