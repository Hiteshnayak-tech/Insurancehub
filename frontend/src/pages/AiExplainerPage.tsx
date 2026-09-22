import { CustomerLayout } from '../layouts/CustomerLayout';
import { AiExplainerCore } from '../components/shared/AiExplainerCore';

export default function AiExplainerPage() {
  return (
    <CustomerLayout>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px 64px' }}>
        <AiExplainerCore showHeader={true} />
      </div>
    </CustomerLayout>
  );
}
