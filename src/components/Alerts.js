import { useTheme } from '../context/ThemeContext';

export default function Alert() {
  const { alert } = useTheme();

  if (!alert) return null;

  const isSuccess = alert.type.toLowerCase() !== 'danger';

  return (
    <div className="toast-container">
      <div className={`toast-alert ${isSuccess ? 'toast-success' : 'toast-danger'}`}>
        <span className={`toast-dot ${isSuccess ? 'dot-success' : 'dot-danger'}`}></span>
        <span className="toast-message">{alert.message}</span>
      </div>
    </div>
  );
}
