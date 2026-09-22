import { Link } from 'react-router-dom';
import { CustomerLayout } from '../../layouts/CustomerLayout';

export default function InsuranceCategoriesPage() {
  const categories = [
    {
      id: 'Health',
      title: 'Health Insurance',
      icon: '❤️',
      desc: 'Comprehensive medical coverage with zero room rent capping, pre- and post-hospitalization expenses, and cashless admission across 8,000+ hospitals.',
      highlights: ['Pre & Post Hospitalization', 'Critical Illness Cover', 'Day Care Procedures', 'No Claim Bonus up to 100%'],
      plansCount: 18,
      avgCsr: '98.4%'
    },
    {
      id: 'Motor',
      title: 'Motor & Car Insurance',
      icon: '🚗',
      desc: 'Bumper-to-bumper protection with zero depreciation add-on, engine protector, roadside breakdown assistance, and personal accident cover.',
      highlights: ['Zero Depreciation Add-on', '24x7 Roadside Assistance', 'Engine & Gearbox Cover', 'Instant Cashless Network'],
      plansCount: 14,
      avgCsr: '97.9%'
    },
    {
      id: 'Life',
      title: 'Term Life Insurance',
      icon: '👨‍👩‍👧‍👦',
      desc: 'Guaranteed long-term financial security for your dependents with sum assured up to ₹1 Crore+ at affordable monthly premiums.',
      highlights: ['Pure Protection ₹1 Cr+', 'Critical Illness Riders', 'Accidental Death Benefit', 'Sec 80C Tax Exemption'],
      plansCount: 9,
      avgCsr: '99.2%'
    },
    {
      id: 'Home',
      title: 'Home & Content Insurance',
      icon: '🏠',
      desc: 'Total structure and belongings protection against fire, earthquakes, burglary, electrical surges, and plumbing bursts.',
      highlights: ['Structure Reconstruction', 'Valuable Electronic Cover', 'Alternative Rent Allowance', 'Public Liability Defense'],
      plansCount: 6,
      avgCsr: '96.5%'
    },
    {
      id: 'Travel',
      title: 'International Travel Insurance',
      icon: '✈️',
      desc: 'Worldwide emergency medical assistance, baggage loss compensation, passport replacement, and flight cancellation indemnification.',
      highlights: ['Overseas Medical Evacuation', 'Trip Cancellation / Interruption', 'Checked Baggage Delay', 'COVID-19 Inclusions'],
      plansCount: 11,
      avgCsr: '95.8%'
    },
    {
      id: 'Business',
      title: 'Business & SME Insurance',
      icon: '💼',
      desc: 'Operational safety net protecting commercial premises, machinery breakdown, cyber liability, and third-party liabilities.',
      highlights: ['Property Damage & Fire', 'Public & Product Liability', 'Business Interruption Cover', 'Employee Compensation'],
      plansCount: 8,
      avgCsr: '96.0%'
    }
  ];

  return (
    <CustomerLayout>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px 64px' }}>
        
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: 32, textAlign: 'center', maxWidth: 700, margin: '0 auto 40px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e50b3', background: '#eff6ff', padding: '4px 12px', borderRadius: 9999, textTransform: 'uppercase' }}>
            Insurance Portfolio
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', margin: '12px 0 8px' }}>
            Explore Insurance Categories
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            Discover tailored coverage options designed to protect your health, family, vehicles, and enterprise with transparent terms.
          </p>
        </div>

        {/* Categories Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                background: '#ffffff',
                borderRadius: 16,
                border: '1px solid #e2e8f0',
                padding: '28px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{
                    width: 50,
                    height: 50,
                    borderRadius: 12,
                    background: '#eff6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24
                  }}>
                    {cat.icon}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#16a34a', background: '#ecfdf5', padding: '2px 8px', borderRadius: 4 }}>
                      Avg CSR {cat.avgCsr}
                    </span>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: 2 }}>{cat.plansCount} Plans Available</div>
                  </div>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: '0 0 16px' }}>
                  {cat.desc}
                </p>

                {/* Highlights */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8 }}>
                    Standard Inclusions
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {cat.highlights.map((h, i) => (
                      <div key={i} style={{ fontSize: '12px', color: '#334155', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link
                  to={`/plans?category=${cat.id}`}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    borderRadius: 8,
                    background: '#1e50b3',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    textAlign: 'center'
                  }}
                >
                  View {cat.id} Plans ({cat.plansCount}) →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </CustomerLayout>
  );
}
