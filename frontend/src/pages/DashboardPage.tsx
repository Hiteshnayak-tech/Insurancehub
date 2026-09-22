import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user, policies, tickets } = useAuth();

  const activePolicies = policies.filter((p) => p.status === 'ACTIVE');
  const totalCoverage = policies.reduce((acc, p) => acc + p.coverageLimit, 0);
  const totalPremiumPaid = policies.reduce((acc, p) => acc + p.premiumAmount, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Welcome User Banner */}
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Customer Dashboard
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Welcome back, {user ? `${user.firstName} ${user.lastName}` : 'Customer'}!
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Account: {user ? user.email : 'demo@insurehub.com'} • Member Since {user?.createdAt || '2026'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/plans"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  + Explore New Plan
                </Link>
                <Link
                  to="/support"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                >
                  Support Help
                </Link>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-slate-400">Active Policies</p>
                <p className="text-2xl font-extrabold text-white mt-0.5">{activePolicies.length}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-slate-400">Total Sum Protected</p>
                <p className="text-2xl font-extrabold text-cyan-400 mt-0.5">
                  ₹{(totalCoverage / 100000).toFixed(1)} Lakhs
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-slate-400">Annual Simulated Premiums</p>
                <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">
                  ₹{totalPremiumPaid.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Active Policies list */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Your Insurance Policies</h2>
                    <p className="text-xs text-slate-500">Manage digital policy bonds, certificates and renewal windows</p>
                  </div>
                  <Link to="/plans" className="text-xs text-blue-600 font-semibold hover:underline">
                    + Buy Another Plan
                  </Link>
                </div>

                {policies.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl">
                    <p className="text-3xl mb-2">📋</p>
                    <h4 className="font-bold text-slate-700">No active policies found</h4>
                    <p className="text-xs text-slate-500 mt-1 mb-4">Choose a plan from our market to issue your first policy.</p>
                    <Link to="/plans" className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs">
                      Explore Plans
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {policies.map((pol) => (
                      <div
                        key={pol.id}
                        className="p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-md transition-all space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                              {pol.policyNumber}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-sm">
                              {pol.category}
                            </span>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                            ● {pol.status}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-slate-900">{pol.planName}</h3>
                          <p className="text-xs text-slate-500 font-medium">Underwritten by {pol.insurerName}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl text-xs">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Sum Insured</span>
                            <span className="font-bold text-slate-800">₹{(pol.coverageLimit / 100000).toFixed(1)} Lakhs</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Annual Premium</span>
                            <span className="font-bold text-slate-800">₹{pol.premiumAmount.toLocaleString()} ({pol.paymentMethod})</span>
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <span className="text-slate-400 block text-[10px]">Validity</span>
                            <span className="font-bold text-slate-800">{pol.startDate} to {pol.endDate}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <span className="text-slate-500 font-medium">Insured: <strong>{pol.holderName}</strong></span>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => alert(`Downloaded simulated tax deduction certificate for policy ${pol.policyNumber}`)}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
                            >
                              📥 Certificate
                            </button>
                            <Link
                              to="/support"
                              className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold"
                            >
                              Raise Claim
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Quick actions & tickets summary */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Claims & Quick Action Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900">Hospital Cashless Desk</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Need to initiate cashless admission or emergency reimbursement? Connect with your dedicated TPA desk immediately.
                </p>
                <Link
                  to="/support"
                  className="w-full block text-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
                >
                  Initiate Claim Request →
                </Link>
              </div>

              {/* Tickets Snapshot */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Recent Support Requests</h3>
                  <Link to="/support" className="text-xs text-blue-600 font-semibold hover:underline">
                    View All
                  </Link>
                </div>

                {tickets.slice(0, 3).map((t) => (
                  <div key={t.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-800 truncate pr-2">{t.subject}</span>
                      <span className="text-[10px] text-blue-600">{t.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{t.ticketNumber} • {t.createdAt}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
