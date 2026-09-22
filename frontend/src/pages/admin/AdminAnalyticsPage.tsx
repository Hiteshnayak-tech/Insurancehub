import { AdminLayout } from '../../layouts/AdminLayout';

export default function AdminAnalyticsPage() {
  const categoryGwp = [
    { category: 'Health Insurance', gwp: '₹48.2 Lakh', share: 44, color: '#2563eb' },
    { category: 'Motor Insurance', gwp: '₹28.4 Lakh', share: 26, color: '#0ea5e9' },
    { category: 'Term Life', gwp: '₹18.0 Lakh', share: 16, color: '#10b981' },
    { category: 'Home & Travel', gwp: '₹10.5 Lakh', share: 10, color: '#f59e0b' },
    { category: 'SME Commercial', gwp: '₹4.4 Lakh', share: 4, color: '#8b5cf6' }
  ];

  return (
    <AdminLayout
      title="Actuarial &amp; Underwriting Analytics"
      breadcrumb={[{ label: 'Admin Console' }, { label: 'Analytics' }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>GROSS WRITTEN PREMIUM</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>₹1.09 Cr</div>
            <div style={{ fontSize: '11px', color: '#16a34a' }}>↑ 18.4% YoY Run-Rate (Demo)</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>INCURRED CLAIM RATIO (ICR)</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#16a34a', margin: '4px 0' }}>68.2%</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Healthy underwriter corridor (65-75%)</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>POLICY RENEWAL RETENTION</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#2563eb', margin: '4px 0' }}>89.5%</div>
            <div style={{ fontSize: '11px', color: '#16a34a' }}>Industry benchmark: 82%</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>AVG SETTLEMENT TIME</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>42 mins</div>
            <div style={{ fontSize: '11px', color: '#16a34a' }}>Cashless Pre-Auth speed</div>
          </div>
        </div>

        {/* Breakdown by Domain */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>
            Premium Distribution by Line of Business
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {categoryGwp.map((item) => (
              <div key={item.category}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.category}</span>
                  <span style={{ color: '#64748b' }}><strong>{item.gwp}</strong> ({item.share}%)</span>
                </div>
                <div style={{ height: 10, background: '#f1f5f9', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.share}%`, background: item.color, borderRadius: 5 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
