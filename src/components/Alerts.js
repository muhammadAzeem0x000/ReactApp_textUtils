import { useTheme } from '../context/ThemeContext';

export default function Alert() {
  const { alert } = useTheme();

  const typeClass = alert
    ? `alert-${alert.type.toLowerCase() === 'danger' ? 'danger' : 'success'}`
    : '';

  return (
    <div className="alert-container" style={{ minHeight: '48px' }}>
      {alert && (
        <div className={`alert ${typeClass} alert-dismissible fade show`} role="alert">
          <strong>{alert.type}:</strong> {alert.message}
        </div>
      )}
    </div>
  );
}
