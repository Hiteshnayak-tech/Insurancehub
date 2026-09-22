import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { useAuth, initialPlans } from '../context/AuthContext';
import type { Plan } from '../types';

export default function PlanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, addPolicy, toggleCompare, isInCompare } = useAuth();

  const plan: Plan | undefined = initialPlans.find((p) => p.id === Number(id));

  // Purchase Modal State
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [tenureYears, setTenureYears] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [generatedPolicyNumber, setGeneratedPolicyNumber] = useState('');

  if (!plan) {
    return (
      <CustomerLayout>
        <div style={{ padding: '80px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>Plan Not Found</h2>
          <p style={{ color: '#64748b', marginTop: '8px', marginBottom: '24px' }}>The insurance plan you requested does not exist or has been discontinued.</p>
          <Link to="/plans" style={{ padding: '10px 20px', borderRadius: '8px', background: '#1e50b3', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
            Back to Marketplace
          </Link>
        </div>
      </CustomerLayout>
    );
  }

  const inComp = isInCompare(plan.id);
  const finalPrice = plan.basePremium * tenureYears;

  const handlePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const created = addPolicy(plan, tenureYears, paymentMethod);
      setIsProcessing(false);
      setGeneratedPolicyNumber(created.policyNumber);
      setPurchaseSuccess(true);
    }, 1200);
  };

  return (
    <CustomerLayout>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px 64px' }}>
          
          {/* Back breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="hover:text-blue-600 flex items-center gap-1"
            >
              ← Back
            </button>
            <span>/</span>
            <Link to="/plans" className="hover:text-blue-600">Plans</Link>
            <span>/</span>
            <span className="text-slate-800">{plan.name}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Plan In-Depth Details */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Primary Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                      {plan.category} Insurance
                    </span>
                    {plan.popular && (
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                        ⭐ Popular Choice
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleCompare(plan)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      inComp ? 'bg-cyan-50 border-cyan-400 text-cyan-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {inComp ? '✓ In Compare List' : '+ Add to Compare'}
                  </button>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {plan.name}
                </h1>
                <p className="text-sm font-semibold text-slate-500 mt-1">
                  Offered by <span className="text-blue-600 font-bold">{plan.insurerName}</span>
                </p>

                <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                  {plan.description}
                </p>

                {/* Quantitative Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
                  <div className="p-3.5 bg-slate-50 rounded-2xl">
                    <p className="text-xs text-slate-400">Sum Insured Limit</p>
                    <p className="text-base sm:text-lg font-bold text-slate-800 mt-0.5">
                      ₹{(plan.coverageLimit / 100000).toFixed(1)} Lakhs
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl">
                    <p className="text-xs text-slate-400">Claim Settlement Ratio</p>
                    <p className="text-base sm:text-lg font-bold text-emerald-600 mt-0.5">
                      {plan.claimSettlementRatio}%
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl col-span-2 sm:col-span-1">
                    <p className="text-xs text-slate-400">Cashless Network</p>
                    <p className="text-base sm:text-lg font-bold text-slate-800 mt-0.5">
                      {plan.cashlessHospitals ? `${plan.cashlessHospitals.toLocaleString()}+ centers` : 'Nationwide Claim'}
                    </p>
                  </div>
                </div>
              </div>

              {/* What's Covered (Features) */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    ✓
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">What is Covered (Key Features)</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 text-xs sm:text-sm text-slate-700">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Exclusions (Transparency highlight) */}
              <div className="bg-white rounded-3xl border border-rose-200/80 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm">
                    ✕
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">Transparent Exclusions &amp; Waiting Periods</h2>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  We believe in zero surprises when filing a claim. The following circumstances are strictly not covered under this standard contract:
                </p>
                <div className="space-y-2.5">
                  {plan.exclusions.map((excl, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-xs sm:text-sm text-slate-700">
                      <span className="text-rose-500 font-bold mt-0.5">✕</span>
                      <span>{excl}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Pricing & Checkout Action */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl sticky top-24 space-y-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Premium</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold text-slate-900">₹{finalPrice.toLocaleString()}</span>
                    <span className="text-xs text-slate-500">for {tenureYears} {tenureYears > 1 ? 'years' : 'year'}</span>
                  </div>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">✓ Includes all applicable regulatory GST &amp; fees</p>
                </div>

                {/* Tenure Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">Policy Duration</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((yr) => (
                      <button
                        type="button"
                        key={yr}
                        onClick={() => setTenureYears(yr)}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                          tenureYears === yr
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {yr} {yr === 1 ? 'Year' : 'Years'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Purchase Button */}
                <button
                  type="button"
                  onClick={() => setPurchaseModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>⚡</span> Instant Simulated Purchase
                </button>

                <div className="text-center">
                  <Link
                    to="/calculator"
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Calculate custom quotation with age factor →
                  </Link>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span>🛡️</span>
                    <span>15-Day Free Look Guarantee Cancellation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⚡</span>
                    <span>Instant Digital Policy Issuance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📜</span>
                    <span>Recognized Tax Saving Certificate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

      {/* ── PURCHASE SIMULATION MODAL ── */}
      {purchaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 animate-fade-in max-h-[90vh] overflow-y-auto">
            {!purchaseSuccess ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900">Simulate Policy Purchase</h3>
                  <button
                    type="button"
                    onClick={() => setPurchaseModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 text-lg p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100 text-xs">
                  <p className="font-bold text-blue-900">{plan.name}</p>
                  <p className="text-blue-700 mt-0.5">{plan.insurerName} • {tenureYears} Year Coverage</p>
                  <p className="font-bold text-slate-900 text-sm mt-1">Total: ₹{finalPrice.toLocaleString()}</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Insured Member Name</label>
                  <input
                    type="text"
                    defaultValue={user ? `${user.firstName} ${user.lastName}` : 'Rahul Sharma'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Select Simulated Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['UPI', 'Credit Card', 'Net Banking'].map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all text-center ${
                          paymentMethod === method
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span>Confirming Simulated Payment...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay ₹{finalPrice.toLocaleString()} &amp; Issue Policy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Policy Issued Successfully!</h3>
                  <p className="text-xs text-slate-500 mt-1">Your coverage is active. Stored in your dashboard.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Policy Number:</span>
                    <span className="font-bold text-blue-600">{generatedPolicyNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Plan:</span>
                    <span className="font-bold text-slate-800">{plan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold text-emerald-600">ACTIVE</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPurchaseModalOpen(false);
                      setPurchaseSuccess(false);
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPurchaseModalOpen(false);
                      navigate('/dashboard');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                  >
                    Go to Dashboard →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      </div>
    </CustomerLayout>
  );
}
