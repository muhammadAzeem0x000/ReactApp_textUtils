import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ title = 'TextUtils', aboutText = 'About' }) {
  const { mode, toggleMode } = useTheme();
  const location = useLocation();
  const isDark = mode === 'dark';

  return (
    <nav className={`navbar navbar-expand-lg ${isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}
         style={{ backgroundColor: isDark ? 'var(--bg-navbar)' : 'var(--bg-navbar)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          {title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                aria-current={location.pathname === '/' ? 'page' : undefined}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                to="/about"
              >
                {aboutText}
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <div className="form-check form-switch mb-0">
              <input
                className="form-check-input"
                onChange={toggleMode}
                type="checkbox"
                role="switch"
                id="darkModeSwitch"
                checked={isDark}
                aria-label="Toggle dark mode"
              />
              <label className="form-check-label" htmlFor="darkModeSwitch">
                {isDark ? '☀️ Light' : '🌙 Dark'}
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
