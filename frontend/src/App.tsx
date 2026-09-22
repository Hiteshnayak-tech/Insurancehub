import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public Pages
import LandingPage from './pages/LandingPage';
import PlansPage from './pages/PlansPage';
import PlanDetailPage from './pages/PlanDetailPage';
import ComparePage from './pages/ComparePage';
import CalculatorPage from './pages/CalculatorPage';
import AiExplainerPage from './pages/AiExplainerPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Customer Portal Pages
import CustomerDashboardPage from './pages/customer/DashboardPage';
import MyPoliciesPage from './pages/customer/MyPoliciesPage';
import ClaimsPage from './pages/customer/ClaimsPage';
import RenewalsPage from './pages/customer/RenewalsPage';
import CustomerSupportPage from './pages/customer/SupportPage';
import CustomerProfilePage from './pages/customer/ProfilePage';
import NotificationsPage from './pages/customer/NotificationsPage';
import InsuranceCategoriesPage from './pages/customer/InsuranceCategoriesPage';

// Admin Portal Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminInsurersPage from './pages/admin/AdminInsurersPage';
import AdminPlansPage from './pages/admin/AdminPlansPage';
import AdminPoliciesPage from './pages/admin/AdminPoliciesPage';
import AdminClaimsPage from './pages/admin/AdminClaimsPage';
import AdminSupportPage from './pages/admin/AdminSupportPage';
import AdminFraudPage from './pages/admin/AdminFraudPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminAuditLogsPage from './pages/admin/AdminAuditLogsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

/**
 * Route Guard for Customer Portal
 * If user is logged in as ADMIN, redirect them to admin console.
 */
function CustomerRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (user && user.role === 'ADMIN') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <>{children}</>;
}

/**
 * Route Guard for Admin Portal
 * Requires ADMIN role. Customers are redirected to /dashboard.
 */
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ── PUBLIC DIRECTORY ── */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/insurance" element={<InsuranceCategoriesPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/plans/:id" element={<PlanDetailPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/ai-explainer" element={<AiExplainerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ── CUSTOMER PORTAL (Guarded from Admin leakage) ── */}
          <Route path="/dashboard" element={<CustomerRoute><CustomerDashboardPage /></CustomerRoute>} />
          <Route path="/my-policies" element={<CustomerRoute><MyPoliciesPage /></CustomerRoute>} />
          <Route path="/claims" element={<CustomerRoute><ClaimsPage /></CustomerRoute>} />
          <Route path="/renewals" element={<CustomerRoute><RenewalsPage /></CustomerRoute>} />
          <Route path="/support" element={<CustomerRoute><CustomerSupportPage /></CustomerRoute>} />
          <Route path="/profile" element={<CustomerRoute><CustomerProfilePage /></CustomerRoute>} />
          <Route path="/notifications" element={<CustomerRoute><NotificationsPage /></CustomerRoute>} />

          {/* ── ADMIN PORTAL (Guarded: Admin only) ── */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
          <Route path="/admin/insurers" element={<AdminRoute><AdminInsurersPage /></AdminRoute>} />
          <Route path="/admin/plans" element={<AdminRoute><AdminPlansPage /></AdminRoute>} />
          <Route path="/admin/policies" element={<AdminRoute><AdminPoliciesPage /></AdminRoute>} />
          <Route path="/admin/claims" element={<AdminRoute><AdminClaimsPage /></AdminRoute>} />
          <Route path="/admin/support" element={<AdminRoute><AdminSupportPage /></AdminRoute>} />
          <Route path="/admin/fraud" element={<AdminRoute><AdminFraudPage /></AdminRoute>} />
          <Route path="/admin/analytics" element={<AdminRoute><AdminAnalyticsPage /></AdminRoute>} />
          <Route path="/admin/audit-logs" element={<AdminRoute><AdminAuditLogsPage /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminSettingsPage /></AdminRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
