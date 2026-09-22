import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Plan, Policy, Claim, Renewal, SupportTicket } from '../types';

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, role?: 'CUSTOMER' | 'ADMIN' | 'SUPPORT_AGENT') => Promise<void>;
  register: (data: { firstName: string; lastName: string; email: string; phone?: string; role?: string }) => Promise<void>;
  logout: () => void;
  // Plans
  policies: Policy[];
  addPolicy: (plan: Plan, durationYears: number, paymentMethod: string) => Policy;
  savedPlans: Plan[];
  toggleSavedPlan: (plan: Plan) => void;
  // Claims
  claims: Claim[];
  // Renewals
  renewals: Renewal[];
  // Compare
  compareList: Plan[];
  toggleCompare: (plan: Plan) => void;
  isInCompare: (planId: number) => boolean;
  clearCompare: () => void;
  // Support
  tickets: SupportTicket[];
  createTicket: (subject: string, category: string, priority: string, message: string) => SupportTicket;
}

// ── Demo Insurance Plans ──
export const initialPlans: Plan[] = [
  {
    id: 1, name: 'CareShield Comprehensive Health', category: 'Health',
    insurerName: 'Star Health Care', rating: 4.8, reviewsCount: 1240,
    basePremium: 8499, coverageLimit: 1500000, cashlessHospitals: 8400,
    claimSettlementRatio: 98.4, waitingPeriod: '24 months (PED)', deductible: 0,
    description: 'All-inclusive medical protection covering hospitalization, critical illnesses, daycare treatments with zero room rent cap.',
    features: ['Zero Room Rent Sub-limits', 'Pre & Post Hospitalization (60/180 days)', 'Free Annual Health Check-ups', 'No Claim Bonus up to 100%'],
    exclusions: ['Pre-existing diseases 24-month waiting period', 'Cosmetic surgeries', 'Self-inflicted injuries'],
    popular: true
  },
  {
    id: 2, name: 'Optima Secure Family Floater', category: 'Health',
    insurerName: 'HDFC ERGO', rating: 4.9, reviewsCount: 2890,
    basePremium: 11200, coverageLimit: 2500000, cashlessHospitals: 11000,
    claimSettlementRatio: 99.1, waitingPeriod: '30 days (illness)', deductible: 0,
    description: 'Double the coverage from day one. Perfect for families with comprehensive maternity and OPD add-on.',
    features: ['2X Coverage from Day 1', 'Unlimited Reinstatement of Sum Insured', 'Maternity & Newborn Cover', 'Worldwide Emergency Evacuation'],
    exclusions: ['First 30 days illness (except accidents)', 'Experimental treatments', 'Dental (unless accidental)'],
    popular: true
  },
  {
    id: 3, name: 'DriveProtect Comprehensive Motor', category: 'Motor',
    insurerName: 'ICICI Lombard', rating: 4.7, reviewsCount: 1520,
    basePremium: 4899, coverageLimit: 850000, cashlessHospitals: 7500,
    claimSettlementRatio: 97.8, waitingPeriod: 'N/A', deductible: 1000,
    description: 'Bumper-to-bumper zero-depreciation cover with rapid 24x7 on-road assistance.',
    features: ['Zero Depreciation Add-on', '24x7 Roadside Assistance', 'Engine Protection', 'Personal Accident Cover ₹15L'],
    exclusions: ['Normal wear and tear', 'Driving under influence', 'Consequential damages']
  },
  {
    id: 4, name: 'MotoShield 360 Plus', category: 'Motor',
    insurerName: 'Tata AIG', rating: 4.6, reviewsCount: 980,
    basePremium: 5499, coverageLimit: 1200000, cashlessHospitals: 6800,
    claimSettlementRatio: 98.2, waitingPeriod: 'N/A', deductible: 1500,
    description: 'Enhanced bumper protection with key replacement and return to invoice value.',
    features: ['Return to Invoice Cover', 'Key & Lock Replacement ₹25K', 'Consumables & Tyre Secure', 'Instant Cashless Settlement'],
    exclusions: ['Commercial usage of private vehicle', 'Outside geographical limits', 'Unlicensed driving']
  },
  {
    id: 5, name: 'SafeHaven Home & Content Secure', category: 'Home',
    insurerName: 'Bajaj Allianz', rating: 4.8, reviewsCount: 640,
    basePremium: 2999, coverageLimit: 4500000, cashlessHospitals: 0,
    claimSettlementRatio: 96.5, waitingPeriod: 'N/A', deductible: 5000,
    description: 'Total structure and contents shield against fire, earthquakes, burglary, and electrical short circuits.',
    features: ['Building Structure Cover', 'Valuable Content & Electronics', 'Alternative Accommodation', 'Public Liability'],
    exclusions: ['Willful destruction', 'War, terrorism, nuclear risks', 'Pre-existing structural defects']
  },
  {
    id: 6, name: 'GlobeTrekker International Travel', category: 'Travel',
    insurerName: 'Reliance General', rating: 4.5, reviewsCount: 810,
    basePremium: 1499, coverageLimit: 3500000, cashlessHospitals: 5200,
    claimSettlementRatio: 95.8, waitingPeriod: 'N/A', deductible: 0,
    description: 'International travel covering medical emergencies, passport loss, luggage delay, and flight cancellations.',
    features: ['Overseas Emergency Medical', 'Trip Cancellation & Delay', 'Loss of Baggage & Passport', 'Emergency Cash Advance'],
    exclusions: ['Traveling against medical advice', 'Hazardous extreme sports', 'Unattended luggage loss']
  },
  {
    id: 7, name: 'LifeGuard Pure Term 1 Crore', category: 'Life',
    insurerName: 'Max Life Insurance', rating: 4.9, reviewsCount: 3400,
    basePremium: 9800, coverageLimit: 10000000, cashlessHospitals: 0,
    claimSettlementRatio: 99.5, waitingPeriod: '12 months (suicide)', deductible: 0,
    description: 'High sum assured at affordable premiums with critical illness & accidental disability rider.',
    features: ['₹1 Crore Sum Assured', 'Critical Illness Benefit (40 diseases)', 'Waiver of Premium on Disability', 'Tax Benefits under Sec 80C'],
    exclusions: ['Suicide within 12 months', 'Criminal acts', 'Undisclosed pre-existing terminal conditions'],
    popular: true
  },
  {
    id: 8, name: 'BizShield SME Liability & Property', category: 'Business',
    insurerName: 'SBI General', rating: 4.6, reviewsCount: 520,
    basePremium: 14500, coverageLimit: 7500000, cashlessHospitals: 0,
    claimSettlementRatio: 96.2, waitingPeriod: 'N/A', deductible: 10000,
    description: 'Safeguard your office, inventory, machinery, and legal liabilities with customized commercial coverage.',
    features: ['Office Premises & Inventory', 'Commercial General Liability', 'Cyber Threat Recovery', 'Business Interruption'],
    exclusions: ['Pollution and contamination', 'Government fines', 'Professional confidentiality breach']
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_POLICIES: Policy[] = [
  {
    id: 101, policyNumber: 'POL-2026-98124', planName: 'CareShield Comprehensive Health',
    insurerName: 'Star Health Care', category: 'Health', coverageLimit: 1500000,
    premiumAmount: 8499, status: 'ACTIVE', startDate: '2026-02-01', endDate: '2027-02-01',
    holderName: 'Demo Customer', paymentMethod: 'UPI', renewalDueDate: '2027-02-01'
  },
  {
    id: 102, policyNumber: 'POL-2025-44219', planName: 'DriveProtect Comprehensive Motor',
    insurerName: 'ICICI Lombard', category: 'Motor', coverageLimit: 850000,
    premiumAmount: 4899, status: 'ACTIVE', startDate: '2025-08-10', endDate: '2026-10-10',
    holderName: 'Demo Customer', paymentMethod: 'Credit Card', renewalDueDate: '2026-10-10'
  }
];

const DEMO_CLAIMS: Claim[] = [
  {
    id: 301, claimNumber: 'CLM-2026-4521', policyNumber: 'POL-2026-98124',
    planName: 'CareShield Comprehensive Health', insurerName: 'Star Health Care',
    claimType: 'Hospitalization', amountClaimed: 45000, amountApproved: 42000,
    status: 'UNDER_REVIEW', submittedDate: '2026-09-12', lastUpdated: '2026-09-16',
    description: 'Hospitalization for appendectomy surgery at Apollo Hospital.',
    documents: ['Discharge Summary', 'Hospital Bills', 'Lab Reports']
  }
];

const DEMO_RENEWALS: Renewal[] = [
  {
    id: 401, policyNumber: 'POL-2025-44219', planName: 'DriveProtect Comprehensive Motor',
    insurerName: 'ICICI Lombard', category: 'Motor', currentPremium: 4899,
    renewalPremium: 5199, dueDate: '2026-10-10', daysLeft: 20, status: 'DUE_SOON'
  }
];

const DEMO_TICKETS: SupportTicket[] = [
  {
    id: 201, ticketNumber: 'TCK-8092', subject: 'Hospital cashless pre-authorization inquiry',
    category: 'Claim Assistance', priority: 'HIGH', status: 'IN_PROGRESS',
    createdAt: '2026-09-18 14:30', message: 'Confirm pre-auth requirements at Apollo Hospital.'
  },
  {
    id: 202, ticketNumber: 'TCK-7714', subject: 'Update nominee phone number on motor policy',
    category: 'Policy Endorsement', priority: 'LOW', status: 'RESOLVED',
    createdAt: '2026-08-22 10:15', message: 'Update registered phone number for primary nominee.'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem('ih_user') || 'null'); } catch { return null; }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('ih_token'));
  const [policies, setPolicies] = useState<Policy[]>(() => {
    try { return JSON.parse(localStorage.getItem('ih_policies') || JSON.stringify(DEMO_POLICIES)); } catch { return DEMO_POLICIES; }
  });
  const [savedPlans, setSavedPlans] = useState<Plan[]>([]);
  const [claims] = useState<Claim[]>(DEMO_CLAIMS);
  const [renewals] = useState<Renewal[]>(DEMO_RENEWALS);
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    try { return JSON.parse(localStorage.getItem('ih_tickets') || JSON.stringify(DEMO_TICKETS)); } catch { return DEMO_TICKETS; }
  });
  const [compareList, setCompareList] = useState<Plan[]>([]);

  useEffect(() => { localStorage.setItem('ih_policies', JSON.stringify(policies)); }, [policies]);
  useEffect(() => { localStorage.setItem('ih_tickets', JSON.stringify(tickets)); }, [tickets]);

  const login = async (email: string, role: 'CUSTOMER' | 'ADMIN' | 'SUPPORT_AGENT' = 'CUSTOMER') => {
    const firstName = email.split('@')[0];
    const loggedUser: User = {
      id: 1001,
      email,
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: role === 'ADMIN' ? 'Administrator' : 'Customer',
      role,
      createdAt: '2026-01-15',
      phone: '+91 98765 43210'
    };
    // Update policy holder names
    setPolicies(prev => prev.map(p => ({ ...p, holderName: `${loggedUser.firstName} ${loggedUser.lastName}` })));
    setUser(loggedUser);
    setToken('demo-jwt-' + Date.now());
    localStorage.setItem('ih_user', JSON.stringify(loggedUser));
    localStorage.setItem('ih_token', 'demo-jwt-' + Date.now());
  };

  const register = async (data: { firstName: string; lastName: string; email: string; phone?: string; role?: string }) => {
    const newUser: User = {
      id: Date.now(), email: data.email, firstName: data.firstName, lastName: data.lastName,
      role: (data.role as any) || 'CUSTOMER', createdAt: new Date().toISOString().split('T')[0], phone: data.phone
    };
    setUser(newUser);
    setToken('demo-jwt-' + Date.now());
    localStorage.setItem('ih_user', JSON.stringify(newUser));
    localStorage.setItem('ih_token', 'demo-jwt-' + Date.now());
  };

  const logout = () => {
    setUser(null); setToken(null);
    localStorage.removeItem('ih_user'); localStorage.removeItem('ih_token');
  };

  const addPolicy = (plan: Plan, durationYears: number, paymentMethod: string): Policy => {
    const now = new Date();
    const end = new Date(); end.setFullYear(now.getFullYear() + durationYears);
    const newPolicy: Policy = {
      id: Date.now(),
      policyNumber: `POL-${now.getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      planName: plan.name, insurerName: plan.insurerName, category: plan.category,
      coverageLimit: plan.coverageLimit, premiumAmount: plan.basePremium * durationYears,
      status: 'ACTIVE', startDate: now.toISOString().split('T')[0], endDate: end.toISOString().split('T')[0],
      holderName: user ? `${user.firstName} ${user.lastName}` : 'Customer',
      paymentMethod, renewalDueDate: end.toISOString().split('T')[0]
    };
    setPolicies(prev => [newPolicy, ...prev]);
    return newPolicy;
  };

  const toggleSavedPlan = (plan: Plan) => {
    setSavedPlans(prev => prev.find(p => p.id === plan.id) ? prev.filter(p => p.id !== plan.id) : [...prev, plan]);
  };

  const toggleCompare = (plan: Plan) => {
    setCompareList(prev => {
      if (prev.find(p => p.id === plan.id)) return prev.filter(p => p.id !== plan.id);
      if (prev.length >= 3) { alert('You can compare up to 3 plans at once.'); return prev; }
      return [...prev, plan];
    });
  };

  const isInCompare = (planId: number) => compareList.some(p => p.id === planId);
  const clearCompare = () => setCompareList([]);

  const createTicket = (subject: string, category: string, priority: string, message: string): SupportTicket => {
    const t: SupportTicket = {
      id: Date.now(), ticketNumber: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject, category, priority: priority as any, status: 'OPEN',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16), message
    };
    setTickets(prev => [t, ...prev]);
    return t;
  };

  return (
    <AuthContext.Provider value={{
      user, token, isAuthenticated: !!user && !!token,
      login, register, logout,
      policies, addPolicy, savedPlans, toggleSavedPlan,
      claims, renewals,
      compareList, toggleCompare, isInCompare, clearCompare,
      tickets, createTicket
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
