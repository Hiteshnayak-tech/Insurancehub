
interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const norm = status?.toUpperCase() || 'UNKNOWN';

  let bg = '#f1f5f9';
  let color = '#475569';
  let border = '#cbd5e1';
  let dot = '#94a3b8';

  if (['ACTIVE', 'APPROVED', 'SETTLED', 'RESOLVED', 'SUCCESS'].includes(norm)) {
    bg = '#ecfdf5';
    color = '#065f46';
    border = '#a7f3d0';
    dot = '#10b981';
  } else if (['PENDING', 'UNDER_REVIEW', 'IN_PROGRESS', 'WAITING_CUSTOMER', 'DUE_SOON'].includes(norm)) {
    bg = '#fffbeb';
    color = '#92400e';
    border = '#fef08a';
    dot = '#f59e0b';
  } else if (['EXPIRED', 'REJECTED', 'CANCELLED', 'OVERDUE', 'CLOSED'].includes(norm)) {
    bg = '#fef2f2';
    color = '#991b1b';
    border = '#fecaca';
    dot = '#ef4444';
  } else if (['SUBMITTED', 'OPEN', 'URGENT', 'HIGH'].includes(norm)) {
    bg = '#eff6ff';
    color = '#1e40af';
    border = '#bfdbfe';
    dot = '#3b82f6';
  }

  const padding = size === 'sm' ? '2px 8px' : '4px 12px';
  const fontSize = size === 'sm' ? '11px' : '12px';

  const label = norm.replace(/_/g, ' ');

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: bg,
      color: color,
      border: `1px solid ${border}`,
      borderRadius: 9999,
      padding: padding,
      fontSize: fontSize,
      fontWeight: 600,
      letterSpacing: '0.2px',
      textTransform: 'capitalize'
    }}>
      <span style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: dot
      }} />
      {label.toLowerCase()}
    </span>
  );
}
