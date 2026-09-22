import { useState } from 'react';

interface AnalysisResult {
  summary: string;
  transparencyScore: number;
  coveredItems: string[];
  hiddenExclusions: string[];
  redFlags: string[];
}

const sampleClauses = [
  {
    title: 'Health: Pre-Existing Diseases & Cataract clause',
    text: `Section 4.2: Any pre-existing medical conditions (PED) disclosed or undisclosed at inception shall be subject to a strict waiting period of twenty-four (24) continuous months. Cataract surgery claims are capped at an aggregate maximum of INR 35,000 per eye irrespective of the sum insured limit. Joint replacement surgeries require forty-eight (48) months continuous coverage unless arising directly out of accidental trauma.`
  },
  {
    title: 'Motor: Water Ingress & Hydrostatic Lock clause',
    text: `Condition 7 (b): Damage or impairment sustained by the internal combustion engine, transmission assembly, or electronic control unit resulting from hydrostatic lock, water ingress, or repeated cranking during flood submersion shall be strictly excluded from indemnification unless specifically endorsed under optional Add-on Engine Protector endorsement EP-09.`
  },
  {
    title: 'Travel: Luggage Delay & Medical Evacuation clause',
    text: `Section 12: Emergency medical evacuation is reimbursable up to USD 50,000 provided prior clearance has been obtained in writing from the designated third-party administrator (TPA). Delayed checked baggage compensation commences solely after an initial twelve (12) consecutive hours from flight arrival at international destinations outside the home country.`
  }
];

interface AiExplainerCoreProps {
  showHeader?: boolean;
}

export function AiExplainerCore({ showHeader = true }: AiExplainerCoreProps) {
  const [inputText, setInputText] = useState(sampleClauses[0].text);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setAnalysis(null);

    // Simulated NLP Clause Processing
    setTimeout(() => {
      const lower = inputText.toLowerCase();

      const covered: string[] = [];
      const exclusions: string[] = [];
      const flags: string[] = [];

      if (lower.includes('waiting period') || lower.includes('cataract') || lower.includes('ped')) {
        covered.push('Accidental trauma surgeries with immediate coverage (0 day wait)');
        covered.push('Cataract procedures covered up to ₹35,000/eye ceiling');
        exclusions.push('Pre-existing diseases barred for initial 24 continuous months');
        exclusions.push('Elective joint replacements barred for 48 months');
        flags.push('Capping alert: ₹35,000 may not cover modern robotic or multifocal lens implants');
      } else if (lower.includes('water') || lower.includes('engine') || lower.includes('hydrostatic')) {
        covered.push('General vehicle accidental body impact repairs');
        exclusions.push('Engine breakdown from water ingress or starting car in flooded roads');
        exclusions.push('ECU and electrical shorting during rainwater submersion');
        flags.push('Severe Risk: Without the EP-09 Add-on, monsoonal rain damage costs will be out-of-pocket');
      } else {
        covered.push('Emergency medical treatment overseas up to USD 50,000');
        exclusions.push('Baggage delays under 12 hours from touchdown');
        exclusions.push('Medical evacuation without advance written TPA pre-authorization');
        flags.push('Crucial requirement: Always notify TPA before arranging emergency air transport');
      }

      setAnalysis({
        summary: 'This insurance clause contains specific restrictive caps and conditional waiting timeframes that heavily impact claim payouts.',
        transparencyScore: lower.includes('strict') || lower.includes('barred') ? 72 : 88,
        coveredItems: covered,
        hiddenExclusions: exclusions,
        redFlags: flags
      });
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div style={{ width: '100%' }}>
      {showHeader && (
        <div style={{ maxWidth: 740, marginBottom: 28 }}>
          <span style={{
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#0284c7',
            background: '#e0f2fe',
            padding: '4px 12px',
            borderRadius: 999,
            marginBottom: 8
          }}>
            AI Policy Simplifier
          </span>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 800,
            color: '#0f172a',
            margin: '6px 0 8px',
            lineHeight: 1.2
          }}>
            Explain Policy Wordings &amp; Fine Print
          </h2>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.5 }}>
            Paste complex clauses, policy terms, or select a sample clause to extract plain-English summaries, hidden exclusions, and sub-limit alerts.
          </p>
        </div>
      )}

      {/* Preset sample clause buttons */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748b', marginBottom: 8 }}>
          Try Real Sample Insurance Clauses:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {sampleClauses.map((item, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => {
                setInputText(item.text);
                setAnalysis(null);
              }}
              style={{
                padding: '8px 14px',
                borderRadius: 10,
                border: '1.5px solid #e2e8f0',
                background: '#ffffff',
                color: '#334155',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.color = '#0284c7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#334155';
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="ih-two-col-grid-even">
        
        {/* Input Form Column */}
        <div style={{
          background: '#ffffff',
          borderRadius: 20,
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#334155', marginBottom: 8 }}>
              Paste Policy Text / Clause Excerpt
            </label>
            <textarea
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste policy fine print wording here..."
              style={{
                width: '100%',
                padding: 16,
                borderRadius: 14,
                border: '1.5px solid #cbd5e1',
                fontSize: 13,
                fontFamily: 'monospace',
                lineHeight: 1.6,
                color: '#1e293b',
                background: '#f8fafc',
                resize: 'vertical',
                minHeight: 190,
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
            <button
              type="button"
              onClick={() => setInputText('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: 8
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#475569')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
            >
              Clear Text
            </button>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing || !inputText.trim()}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                background: isAnalyzing || !inputText.trim() ? '#94a3b8' : '#0284c7',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 14,
                border: 'none',
                cursor: isAnalyzing || !inputText.trim() ? 'not-allowed' : 'pointer',
                boxShadow: isAnalyzing || !inputText.trim() ? 'none' : '0 4px 12px rgba(2,132,199,0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.15s ease'
              }}
            >
              {isAnalyzing ? (
                <>
                  <span>⏳</span>
                  <span>Analyzing Document Clauses...</span>
                </>
              ) : (
                <>
                  <span>🤖</span>
                  <span>Analyze with AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Column */}
        <div>
          {analysis ? (
            <div style={{
              background: '#ffffff',
              borderRadius: 20,
              border: '1px solid #e2e8f0',
              padding: '24px 26px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#15803d',
                    background: '#dcfce7',
                    padding: '3px 10px',
                    borderRadius: 6,
                    display: 'inline-block'
                  }}>
                    Analysis Complete
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '6px 0 0' }}>
                    Plain-English Breakdown
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: '#94a3b8', margin: 0 }}>Transparency Score</p>
                  <p style={{ fontSize: 24, fontWeight: 800, color: '#2563eb', margin: '2px 0 0' }}>{analysis.transparencyScore}/100</p>
                </div>
              </div>

              <p style={{ fontSize: 14, color: '#475569', background: '#f8fafc', padding: 14, borderRadius: 12, lineHeight: 1.6, margin: 0 }}>
                {analysis.summary}
              </p>

              {/* Warning Red Flags */}
              {analysis.redFlags.length > 0 && (
                <div style={{
                  padding: 16,
                  borderRadius: 14,
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6
                }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#92400e', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>⚠️</span> Important Warnings &amp; Sub-limits:
                  </p>
                  {analysis.redFlags.map((flag, idx) => (
                    <p key={idx} style={{ fontSize: 12, color: '#b45309', lineHeight: 1.5, margin: 0, paddingLeft: 18 }}>
                      • {flag}
                    </p>
                  ))}
                </div>
              )}

              {/* Covered Items */}
              <div>
                <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#15803d', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>✓</span> Valid Coverage Elements
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {analysis.coveredItems.map((item, idx) => (
                    <div key={idx} style={{
                      fontSize: 13,
                      color: '#334155',
                      background: '#f0fdf4',
                      padding: '10px 12px',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8
                    }}>
                      <span style={{ color: '#22c55e', fontWeight: 700 }}>✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              <div>
                <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#b91c1c', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>✕</span> Restrictive Conditions &amp; Exclusions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {analysis.hiddenExclusions.map((item, idx) => (
                    <div key={idx} style={{
                      fontSize: 13,
                      color: '#334155',
                      background: '#fff1f1',
                      padding: '10px 12px',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8
                    }}>
                      <span style={{ color: '#ef4444', fontWeight: 700 }}>✕</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              background: '#f8fafc',
              border: '2px dashed #cbd5e1',
              borderRadius: 20,
              padding: '48px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 340
            }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>📄</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#334155', margin: 0 }}>Ready to Explain Policy Clause</h3>
              <p style={{ fontSize: 13, color: '#64748b', maxWidth: 360, margin: '8px 0 0', lineHeight: 1.6 }}>
                Click "Analyze with AI" to generate a transparent clause breakdown, check for sub-limits, and detect claim rejection hazards.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
