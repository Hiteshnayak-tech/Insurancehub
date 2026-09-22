import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function SupportPage() {
  const { tickets, createTicket } = useAuth();

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Claim Assistance');
  const [priority, setPriority] = useState('MEDIUM');
  const [message, setMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    createTicket(subject, category, priority, message);
    setSubject('');
    setMessage('');
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 5000);
  };

  const categories = [
    'Claim Assistance',
    'Policy Endorsement',
    'Payment & Invoicing',
    'Cancellation Request',
    'General Inquiry'
  ];

  const faqs = [
    {
      q: 'How does cashless hospital admission work?',
      a: 'Present your InsureHub digital policy card at the hospital TPA insurance desk 48 hours prior for planned procedures, or within 24 hours for emergency admissions.'
    },
    {
      q: 'What is the standard claim reimbursement turnaround?',
      a: 'Simulated claim settlements are typically acknowledged within 24 hours and settled within 7 business days following document verification.'
    },
    {
      q: 'Can I change my nominated beneficiary anytime?',
      a: 'Yes! Open a Policy Endorsement ticket with the new nominee details and updated government ID proof.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              24x7 Customer Support
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Help Center &amp; Claim Assistance
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Need assistance with an ongoing hospital claim, policy renewal, or coverage endorsement? Raise a ticket or review existing tickets below.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Create Ticket Form */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Support Request</h3>

              {successNotice && (
                <div className="mb-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <span className="text-base font-bold">✓</span>
                  <span>Ticket created successfully! Track status in the list below.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Request Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Claim pre-approval for upcoming admission"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-slate-50 focus:outline-hidden focus:bg-white focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-slate-50 focus:outline-hidden"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-slate-50 focus:outline-hidden"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">Urgent / High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Detailed Explanation *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide policy number, hospital name, dates or details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-slate-50 focus:outline-hidden focus:bg-white focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors"
                >
                  Submit Support Ticket
                </button>
              </form>
            </div>

            {/* Right Column: Active Tickets & FAQs */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Existing Support Tickets */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Your Support Tickets</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {tickets.length} Recorded
                  </span>
                </div>

                {tickets.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">No tickets created yet.</p>
                ) : (
                  <div className="space-y-3">
                    {tickets.map((t) => (
                      <div
                        key={t.id}
                        className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-blue-600">{t.ticketNumber}</span>
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                              t.status === 'RESOLVED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : t.status === 'IN_PROGRESS'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {t.status}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-800">{t.subject}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2">{t.message}</p>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                          <span>Category: {t.category}</span>
                          <span>{t.createdAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <p className="text-xs font-bold text-slate-800">{faq.q}</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
