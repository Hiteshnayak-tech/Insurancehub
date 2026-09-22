/**
 * InsureHub — Shared TypeScript Types
 * Mirrors backend DTOs for type-safe API communication.
 */

// ── Auth ──
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPPORT_AGENT';
  createdAt: string;
  phone?: string;
}

// ── Plan ──
export interface Plan {
  id: number;
  name: string;
  category: 'Health' | 'Motor' | 'Home' | 'Travel' | 'Life' | 'Business';
  insurerName: string;
  rating: number;
  reviewsCount: number;
  basePremium: number;
  coverageLimit: number;
  cashlessHospitals?: number;
  claimSettlementRatio: number;
  description: string;
  features: string[];
  exclusions: string[];
  waitingPeriod?: string;
  deductible?: number;
  popular?: boolean;
  active?: boolean;
}

// ── Policy ──
export interface Policy {
  id: number;
  policyNumber: string;
  planName: string;
  insurerName: string;
  category: string;
  coverageLimit: number;
  premiumAmount: number;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'PENDING';
  startDate: string;
  endDate: string;
  holderName: string;
  paymentMethod: string;
  renewalDueDate?: string;
}

// ── Claim ──
export interface Claim {
  id: number;
  claimNumber: string;
  policyNumber: string;
  planName: string;
  insurerName: string;
  claimType: string;
  amountClaimed: number;
  amountApproved?: number;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'SETTLED';
  submittedDate: string;
  lastUpdated: string;
  description: string;
  documents: string[];
  customerName?: string;
  customerEmail?: string;
  adminRemarks?: string;
}

// ── Renewal ──
export interface Renewal {
  id: number;
  policyNumber: string;
  planName: string;
  insurerName: string;
  category: string;
  currentPremium: number;
  renewalPremium: number;
  dueDate: string;
  daysLeft: number;
  status: 'DUE_SOON' | 'OVERDUE' | 'RENEWED';
}

// ── Support Ticket ──
export interface SupportTicket {
  id: number;
  ticketNumber: string;
  subject: string;
  category: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_CUSTOMER' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  message: string;
  assignedTo?: string;
  lastReply?: string;
}

// ── Health ──
export interface HealthResponse {
  status: string;
  application: string;
  version: string;
  timestamp: string;
}

// ── API Error ──
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string>;
  timestamp: string;
}
