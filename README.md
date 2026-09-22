# 🛡️ InsureHub

**Insurance Comparison, Transparency & Policy Management Platform**

> A full-stack insurance marketplace platform featuring transparent plan comparison, client-side premium estimation, digital policy management, persistent claims filing & adjudication, admin plan lifecycle management, and AI-powered policy document analysis.

⚠️ **Disclaimer**: This is a simulated demonstration platform. It is not connected to real insurance companies, payment gateways, or financial institutions.

---

## 🚀 Key Modules & Capabilities

- **Unified Scrolling Landing Page**: Integrates Marketplace Hero, Insurance Categories, Popular Plans, Side-by-Side Comparison, Premium Calculator, AI Policy Explainer, Cashless Claims, and Support Portals into one seamless experience.
- **Side-by-Side Policy Comparison (`/compare`)**: Evaluate policies across sum insured limits, Claim Settlement Ratios (CSR), room rent capping, network hospitals, and fine print exclusions.
- **Fair Pricing Engine (`/calculator`)**: Instant client-side premium estimation modeling actuarial risk factors across Health, Motor, and Life Term insurance with 18% GST tax breakdown.
- **AI Policy Wordings Explainer (`/ai-explainer`)**: Natural Language Processing (NLP) pattern analyzer extracting plain-English summaries, hidden exclusions, waiting periods, and sub-limit red flags.
- **Persistent Claims System**: Customer claim submissions and admin adjudication (approve/reject/review) stored in PostgreSQL — survives navigation, refresh, and re-login.
- **Customer Portal**: Policy discovery, digital purchase, persistent claims filing, and profile management.
- **Admin Management & Analytics**: Insurer registry, plan lifecycle (create/activate/deactivate), claims adjudication, fraud detection alerts, and user administration.
- **Database Seeding**: Auto-populates 8 insurers, 8 insurance plans, and demo claims on first startup via `DataInitializer`.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS v4, Custom CSS Design System |
| **Backend** | Java 21+, Spring Boot 3.4, Spring Security, Spring Data JPA |
| **Database** | PostgreSQL (persistent source of truth for claims, plans, users) |
| **Security & Auth** | JWT (JSON Web Tokens) with HMAC-SHA256 |
| **API Documentation** | SpringDoc OpenAPI / Swagger UI |

---

## 📂 Project Structure

```
insurancehub/
├── backend/          # Spring Boot REST API
│   ├── src/main/java/com/insurehub/
│   │   ├── config/      # Security & JWT configurations
│   │   ├── controller/  # REST endpoints (auth, plans, claims, etc.)
│   │   ├── model/       # JPA entities
│   │   ├── repository/  # Spring Data repositories
│   │   └── service/     # Business logic
│   └── src/main/resources/
│       └── application.yml
├── frontend/         # React + TypeScript + Vite SPA
│   ├── src/
│   │   ├── components/  # Shared, customer, and admin components
│   │   ├── context/     # AuthContext and state management
│   │   ├── layouts/     # CustomerLayout & AdminLayout
│   │   ├── pages/       # LandingPage, ComparePage, CalculatorPage, etc.
│   │   └── index.css    # InsureHub design tokens and layout rules
└── README.md
```

---

## 💻 Getting Started

### Prerequisites

- **Java 21+** (JDK)
- **Node.js 18+** and npm

---

### 1. Backend Setup

```bash
cd backend
# Windows:
./mvnw.cmd spring-boot:run
# Linux/macOS:
./mvnw spring-boot:run
```
- Backend runs at: `http://localhost:8080`
- Health check: `http://localhost:8080/api/health`
- Swagger UI docs: `http://localhost:8080/swagger-ui.html`

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
- Frontend dev server runs at: `http://localhost:5173`

---

### 3. Verify Build

```bash
cd frontend
npm run build
```

---

## 🔌 REST API Reference

### Customer Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/claims/my` | Fetch claims for the logged-in customer |
| `POST` | `/api/claims` | Submit a new insurance claim |
| `GET` | `/api/plans` | List all active insurance plans (marketplace) |
| `GET` | `/api/health` | Health check |

### Admin Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/claims` | List all claims across all customers |
| `PATCH` | `/api/admin/claims/{id}/status` | Adjudicate a claim (approve/reject/review) |
| `GET` | `/api/admin/plans` | List all plans (including inactive) |
| `POST` | `/api/admin/plans` | Create a new insurance plan |
| `PATCH` | `/api/admin/plans/{id}/status` | Activate or deactivate a plan |

> **Identity Headers**: All requests include `X-User-Email` and `X-User-Name` headers via the Axios interceptor for backend user identification.

---

## 🗄️ Database & Seeding

- **PostgreSQL** is the persistent source of truth for claims, plans, and insurers.
- On first startup, `DataInitializer` seeds:
  - **8 Insurers** (Star Health, HDFC ERGO, ICICI Lombard, Tata AIG, etc.)
  - **8 Insurance Plans** across Health, Motor, Home, Travel, Life, and Business categories
  - **Demo claims** for the `demo@insurehub.com` user
- Database connection is configured in `backend/src/main/resources/application.yml`.

---

## 📋 Features Status

| Feature / Module | Status | Notes |
| :--- | :---: | :--- |
| **Architecture & Core Layout** | ✅ Complete | Sticky navbar, design tokens, responsive layout |
| **Unified Landing Page** | ✅ Complete | Embedded sections with smooth anchor scroll & scroll-spy |
| **Side-by-Side Comparison** | ✅ Complete | Multi-plan comparison matrix with exclusion analysis |
| **Premium Pricing Engine** | ✅ Complete | Real-time actuarial calculation for Health, Motor & Life |
| **AI Policy Explainer** | ✅ Complete | In-browser NLP clause simplification & red-flag detection |
| **Persistent Claims System** | ✅ Complete | Customer file → DB persist → Admin adjudicate → DB update |
| **Admin Plan Management** | ✅ Complete | Create, activate, deactivate plans — persisted to PostgreSQL |
| **Authentication & Profile** | ✅ Complete | JWT login, registration, and role-based routes |
| **Admin & Compliance** | ✅ Complete | Metrics dashboard, insurer management, fraud monitoring |
| **Database Seeding** | ✅ Complete | Auto-seeds insurers, plans, and demo claims on startup |

---

## 📄 License

This project is for educational and portfolio demonstration purposes only.
