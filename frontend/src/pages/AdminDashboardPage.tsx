import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth, initialPlans } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  const { user, policies, tickets } = useAuth();
  const [plansList, setPlansList] = useState(initialPlans);

  // New Plan form state
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'Health' | 'Motor' | 'Home' | 'Travel' | 'Life' | 'Business'>('Health');
  const [newInsurer, setNewInsurer] = useState('');
  const [newPremium, setNewPremium] = useState(7999);
  const [newCoverage, setNewCoverage] = useState(1000000);
  const [newDesc, setNewDesc] = useState('');

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newInsurer) return;

    const newPlan = {
      id: Date.now(),
      name: newName,
      category: newCategory,
      insurerName: newInsurer,
      rating: 4.8,
      reviewsCount: 1,
      basePremium: Number(newPremium),
      coverageLimit: Number(newCoverage),
      cashlessHospitals: 5000,
      claimSettlementRatio: 98.0,
      description: newDesc || 'Comprehensive customized protection coverage.',
      features: ['Cashless Settlement', '24x7 Assistance', 'Quick Processing'],
      exclusions: ['Standard waiting periods apply']
    };

    setPlansList([newPlan, ...plansList]);
    setShowAddPlan(false);
    setNewName('');
    setNewInsurer('');
    setNewDesc('');
    alert(`Plan "${newName}" successfully created and made active in the market!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full">
                  ⚡ Administrator Control Center
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
                  Platform Operations Management
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Logged in as {user?.email || 'admin@insurehub.com'} (Role: {user?.role || 'ADMIN'})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddPlan(!showAddPlan)}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                {showAddPlan ? '✕ Close Form' : '+ Add New Insurance Plan'}
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-slate-400">Published Plans</p>
                <p className="text-2xl font-extrabold text-white mt-0.5">{plansList.length}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-slate-400">Total Issued Policies</p>
                <p className="text-2xl font-extrabold text-cyan-400 mt-0.5">{policies.length}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-slate-400">Support Tickets</p>
                <p className="text-2xl font-extrabold text-amber-400 mt-0.5">{tickets.length}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-slate-400">System Security</p>
                <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">Active</p>
              </div>
            </div>
          </div>

          {/* Add Plan Modal / In-line Form */}
          {showAddPlan && (
            <div className="bg-white rounded-3xl border border-purple-200 p-6 sm:p-8 shadow-lg mb-8 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Plan in Marketplace</h3>
              <form onSubmit={handleAddPlan} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Plan Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Star Gold Premier"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Insurer Partner *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Care Health / HDFC"
                      value={newInsurer}
                      onChange={(e) => setNewInsurer(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e: any) => setNewCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50"
                    >
                      <option value="Health">Health</option>
                      <option value="Motor">Motor</option>
                      <option value="Home">Home</option>
                      <option value="Travel">Travel</option>
                      <option value="Life">Life</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Base Premium (₹/yr)</label>
                    <input
                      type="number"
                      required
                      value={newPremium}
                      onChange={(e) => setNewPremium(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Sum Insured (₹)</label>
                    <input
                      type="number"
                      required
                      value={newCoverage}
                      onChange={(e) => setNewCoverage(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Plan Description</label>
                  <textarea
                    rows={2}
                    placeholder="Short summary of key benefits..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-slate-50"
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddPlan(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs"
                  >
                    Publish to Marketplace →
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Current Marketplace Inventory */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Active Plans Inventory ({plansList.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Plan &amp; Insurer</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Sum Insured</th>
                    <th className="py-3 px-4">Base Premium</th>
                    <th className="py-3 px-4">Claim Ratio</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {plansList.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{p.name}</p>
                        <p className="text-[11px] text-slate-500">{p.insurerName}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold">
                        ₹{(p.coverageLimit / 100000).toFixed(1)} Lakhs
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        ₹{p.basePremium.toLocaleString()}/yr
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-600">
                        {p.claimSettlementRatio}%
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/plans/${p.id}`}
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          Preview →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
