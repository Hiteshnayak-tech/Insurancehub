import { CustomerNavbar } from '../components/customer/CustomerNavbar';
import { CustomerFooter } from '../components/shared/CustomerFooter';

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <div className="ih-page">
      <div className="ih-demo-banner">
        ⚠️ Academic Demonstration — Not connected to actual insurers or financial institutions.
      </div>
      <CustomerNavbar />
      <main className="ih-customer-main" style={{ flex: 1 }}>
        {children}
      </main>
      <CustomerFooter />
    </div>
  );
}
