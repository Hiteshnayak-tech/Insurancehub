import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { useAuth, initialPlans } from '../context/AuthContext';
import { PlanCard } from '../components/shared/PlanCard';
import api from '../api/axios';
import type { Plan } from '../types';

export default function PlansPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategoryParam = searchParams.get('category') || 'All';
  
  const [plansData, setPlansData] = useState<Plan[]>(initialPlans);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(selectedCategoryParam);
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [minCsr, setMinCsr] = useState<number>(90);
  const [sortBy, setSortBy] = useState<'recommended' | 'priceLow' | 'priceHigh' | 'rating' | 'csr'>('recommended');
  
  const { compareList } = useAuth();

  useEffect(() => {
    api.get('/plans')
      .then(res => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          setPlansData(res.data.data);
        }
      })
      .catch(err => {
        console.warn('Using local plan cache:', err);
      });
  }, []);

  const categories = [
    { label: 'All Categories', value: 'All' },
    { label: 'Health Insurance', value: 'Health' },
    { label: 'Motor Insurance', value: 'Motor' },
    { label: 'Term Life', value: 'Life' },
    { label: 'Home Protection', value: 'Home' },
    { label: 'Travel Insurance', value: 'Travel' },
    { label: 'Business & SME', value: 'Business' },
  ];

  const filteredPlans = useMemo(() => {
    return plansData
      .filter((plan) => {
        const matchesCategory = selectedCategory === 'All' || plan.category === selectedCategory;
        const matchesSearch =
          plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plan.insurerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plan.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = plan.basePremium <= maxPrice;
        const matchesCsr = plan.claimSettlementRatio >= minCsr;
        return matchesCategory && matchesSearch && matchesPrice && matchesCsr;
      })
      .sort((a, b) => {
        if (sortBy === 'priceLow') return a.basePremium - b.basePremium;
        if (sortBy === 'priceHigh') return b.basePremium - a.basePremium;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'csr') return b.claimSettlementRatio - a.claimSettlementRatio;
        return 0; // recommended
      });
  }, [selectedCategory, searchQuery, maxPrice, minCsr, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <CustomerLayout>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px 64px' }}>
        
        {/* Header Breadcrumbs & Title */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: 8, display: 'flex', gap: 6 }}>
            <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: '#1e50b3', fontWeight: 600 }}>Insurance Plans</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{selectedCategory}</span>
              </>
            )}
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Compare &amp; Buy Insurance Plans
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: 4 }}>
            Explore verified policies from leading insurers with zero hidden clauses and verified claim ratios.
          </p>
        </div>

        {/* Layout Grid: Sidebar Filters (left) + Results (right) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 300px) 1fr', gap: 28, alignItems: 'start' }}>
          
          {/* ── SIDEBAR FILTERS ── */}
          <aside style={{
            background: '#ffffff',
            borderRadius: 14,
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            position: 'sticky',
            top: 84
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>⚙️</span> Filters
              </h3>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setMaxPrice(20000);
                  setMinCsr(90);
                  setSortBy('recommended');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563eb',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Reset All
              </button>
            </div>

            {/* Categories */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
                Categories
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.value;
                  const count = cat.value === 'All' 
                    ? initialPlans.length 
                    : initialPlans.filter(p => p.category === cat.value).length;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => handleCategoryChange(cat.value)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: 'none',
                        background: isSelected ? '#eff6ff' : 'transparent',
                        color: isSelected ? '#1e50b3' : '#475569',
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: '13px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s'
                      }}
                    >
                      <span>{cat.label}</span>
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 6px',
                        borderRadius: 9999,
                        background: isSelected ? '#dbeafe' : '#f1f5f9',
                        color: isSelected ? '#1e40af' : '#64748b'
                      }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Max Annual Premium Slider */}
            <div style={{ marginBottom: 24, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Max Annual Premium
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e50b3' }}>
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1500"
                max="25000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1e50b3', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: 4 }}>
                <span>₹1.5K</span>
                <span>₹25K</span>
              </div>
            </div>

            {/* Min Claim Settlement Ratio */}
            <div style={{ marginBottom: 24, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Min Settlement Ratio
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a' }}>
                  {minCsr}%
                </span>
              </div>
              <input
                type="range"
                min="90"
                max="99"
                step="1"
                value={minCsr}
                onChange={(e) => setMinCsr(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#16a34a', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: 4 }}>
                <span>90%</span>
                <span>99%</span>
              </div>
            </div>

            {/* Trust Assurance Card */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 10,
              padding: '12px',
              fontSize: '12px',
              color: '#475569'
            }}>
              <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>
                🛡️ Zero Commission Bias
              </div>
              All plans displayed reflect transparent insurer-direct pricing with no artificial markups.
            </div>
          </aside>

          {/* ── RESULTS AREA (RIGHT) ── */}
          <main>
            {/* Search & Sort Controls Bar */}
            <div style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #e2e8f0',
              padding: '14px 20px',
              marginBottom: 20,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}>
              {/* Search input */}
              <div style={{ position: 'relative', flex: '1 1 240px' }}>
                <input
                  type="text"
                  placeholder="Search by insurer, plan name, or benefits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: 8,
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <span style={{ position: 'absolute', left: 12, top: 8, color: '#94a3b8', fontSize: '13px' }}>🔍</span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 7,
                      background: '#e2e8f0',
                      border: 'none',
                      borderRadius: 4,
                      fontSize: '11px',
                      cursor: 'pointer',
                      padding: '2px 6px'
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '13px', color: '#64748b', whiteSpace: 'nowrap' }}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    background: '#ffffff',
                    color: '#0f172a',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="recommended">Recommended (Default)</option>
                  <option value="priceLow">Premium: Low to High</option>
                  <option value="priceHigh">Premium: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="csr">Claim Settlement Ratio</option>
                </select>
              </div>
            </div>

            {/* Results Header Count */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: '14px', color: '#64748b' }}>
                Showing <strong style={{ color: '#0f172a' }}>{filteredPlans.length}</strong> plans
                {selectedCategory !== 'All' && <span> in <strong style={{ color: '#1e50b3' }}>{selectedCategory}</strong></span>}
              </div>
            </div>

            {/* Empty State */}
            {filteredPlans.length === 0 ? (
              <div style={{
                background: '#ffffff',
                borderRadius: 14,
                border: '1.5px dashed #cbd5e1',
                padding: '60px 24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: 12 }}>🔍</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>
                  No matching plans found
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', maxWidth: 400, margin: '0 auto 20px' }}>
                  We couldn't find any insurance plans matching your filters. Try relaxing your premium limit or search term.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setMaxPrice(20000);
                    setMinCsr(90);
                  }}
                  style={{
                    padding: '9px 18px',
                    borderRadius: 8,
                    background: '#1e50b3',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Plans Grid */
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                {filteredPlans.map((plan: Plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Floating Compare Banner */}
        {compareList.length > 0 && (
          <div style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: '#0f172a',
            color: '#ffffff',
            borderRadius: 12,
            padding: '14px 20px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            zIndex: 90,
            border: '1px solid #334155'
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>
                Comparison Dock
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>
                {compareList.length} Plan{compareList.length > 1 ? 's' : ''} Ready to Compare
              </div>
            </div>
            <Link
              to="/compare"
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: '#38bdf8',
                color: '#0f172a',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              Compare Now →
            </Link>
          </div>
        )}

      </div>
    </CustomerLayout>
  );
}
