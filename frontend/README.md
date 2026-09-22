# 🛡️ InsureHub — Frontend Client

The frontend client for **InsureHub**, a transparent insurance marketplace and policy management web application built with React, TypeScript, and Vite.

---

## 🚀 Key Features

- **Multi-Section Interactive Landing Page**: Continuous scrolling experience integrating Hero, Insurance Categories, Popular Marketplace Plans, Side-by-Side Comparison, Fair Pricing Calculator, AI Policy Explainer, Cashless Claims overview, and Customer Support.
- **Side-by-Side Policy Comparison (`/compare`)**: Compare coverage limits, room rent rules, claim settlement ratios (CSR), customer ratings, and critical exclusions.
- **Fair Pricing Engine (`/calculator`)**: Real-time client-side premium estimation for Health, Motor, and Term Life insurance with transparent risk-factor multipliers and 18% GST tax breakdown.
- **AI Policy Wordings Explainer (`/ai-explainer`)**: Analyzes dense insurance fine print to extract plain-English summaries, hidden exclusions, waiting periods, and sub-limit red flags.
- **Persistent Claims System**: Customer-filed claims are persisted to the PostgreSQL backend — survives navigation, refresh, and re-login. Admin can adjudicate claim status (approve/reject/review) from the dashboard.
- **Admin Plan Management**: Create new plans, activate/deactivate existing plans — all persisted to the database.
- **Customer Portal**: Policy purchase flows, persistent claims tracking, profile management, and notification feeds.
- **Admin & Compliance Dashboard**: Metrics overview, claims adjudication, plan lifecycle management, fraud monitoring, and insurer management.
- **Design System & Layout**: Responsive layout with sticky navigation, scroll spy anchor navigation, and high-contrast visual tokens.

---

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler & Dev Server**: Vite
- **Routing**: React Router DOM (v7)
- **Styling**: Vanilla CSS Design System (`src/index.css`) + Tailwind CSS utilities
- **HTTP Client**: Axios with JWT + user-identity (`X-User-Email`, `X-User-Name`) request interceptors

---

## 📂 Directory Structure

```
frontend/src/
├── api/
│   └── axios.ts              # Axios instance with JWT & identity headers
├── components/
│   ├── admin/                # Admin sidebar, tables, and metric cards
│   ├── customer/             # Customer navigation, sticky navbar, menus
│   └── shared/               # CalculatorCore, AiExplainerCore, ComparePreview, PlanCard, Footer
├── context/                  # AuthContext, user session, and compare list state
├── layouts/                  # CustomerLayout & AdminLayout
├── pages/
│   ├── LandingPage.tsx       # Unified scrolling homepage
│   ├── ComparePage.tsx       # Side-by-side policy comparison
│   ├── CalculatorPage.tsx    # Fair pricing engine
│   ├── AiExplainerPage.tsx   # AI policy explainer
│   ├── PlansPage.tsx         # Marketplace plans (fetched from GET /api/plans)
│   ├── admin/
│   │   ├── AdminClaimsPage.tsx   # All claims + adjudication (GET/PATCH /api/admin/claims)
│   │   └── AdminPlansPage.tsx    # Plan CRUD + activate/deactivate (GET/POST/PATCH /api/admin/plans)
│   └── customer/
│       └── ClaimsPage.tsx        # My claims + file new (GET/POST /api/claims)
├── types/
│   └── index.ts              # TypeScript interfaces (Plan, Claim, User, Policy)
├── App.tsx                   # Route definitions and authentication guards
├── index.css                 # Design tokens, variables, responsive grids, and layout rules
└── main.tsx                  # Application entry point
```

---

## 🔌 Backend API Integration

The frontend communicates with the Spring Boot backend via Axios. The interceptor in `src/api/axios.ts` automatically attaches:
- **JWT token** (`Authorization: Bearer <token>`) for authentication
- **`X-User-Email`** and **`X-User-Name`** headers for backend user identification

### Customer Pages → Backend Endpoints

| Page | Method | Endpoint | Action |
| :--- | :--- | :--- | :--- |
| `ClaimsPage.tsx` | `GET` | `/api/claims/my` | Load customer's claims from DB |
| `ClaimsPage.tsx` | `POST` | `/api/claims` | Submit new claim → persisted to DB |
| `PlansPage.tsx` | `GET` | `/api/plans` | Load active marketplace plans |

### Admin Pages → Backend Endpoints

| Page | Method | Endpoint | Action |
| :--- | :--- | :--- | :--- |
| `AdminClaimsPage.tsx` | `GET` | `/api/admin/claims` | Load all claims (all customers) |
| `AdminClaimsPage.tsx` | `PATCH` | `/api/admin/claims/{id}/status` | Approve/Reject/Review a claim |
| `AdminPlansPage.tsx` | `GET` | `/api/admin/plans` | Load all plans (incl. inactive) |
| `AdminPlansPage.tsx` | `POST` | `/api/admin/plans` | Create a new insurance plan |
| `AdminPlansPage.tsx` | `PATCH` | `/api/admin/plans/{id}/status` | Activate/deactivate a plan |

---

## 💻 Getting Started

### 1. Prerequisites
- **Node.js 18+** and npm
- Backend server running at `http://localhost:8080` (see root README)

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.
The Vite dev server proxies `/api/*` requests to the backend at `http://localhost:8080`.

### 4. Production Build & Verification
```bash
npm run build
```
Typechecks with `tsc` and outputs an optimized bundle to `dist/`.
