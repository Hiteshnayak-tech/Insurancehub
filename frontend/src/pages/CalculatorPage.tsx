import { CustomerLayout } from '../layouts/CustomerLayout';
import { CalculatorCore } from '../components/shared/CalculatorCore';

export default function CalculatorPage() {
  return (
    <CustomerLayout>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px 64px' }}>
        <CalculatorCore showHeader={true} />
      </div>
    </CustomerLayout>
  );
}
