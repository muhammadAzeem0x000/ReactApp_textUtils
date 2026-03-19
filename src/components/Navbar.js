import { useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ title = 'UpworkBold', aboutText = 'About' }) {
  const { mode, toggleMode } = useTheme();
  const location = useLocation();
  const isDark = mode === 'dark';
  const collapseRef = useRef(null);

  // Close the mobile hamburger menu when a nav link is clicked
  const collapseNav = useCallback(() => {
    const el = collapseRef.current;
    if (el && el.classList.contains('show')) {
      // Use Bootstrap's Collapse API if available, otherwise toggle classes manually
      const bsCollapse = window.bootstrap?.Collapse?.getInstance(el);
      if (bsCollapse) {
        bsCollapse.hide();
      } else {
        el.classList.remove('show');
      }
    }
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg sticky-top ${isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}
         style={{ backgroundColor: isDark ? 'var(--bg-navbar)' : 'var(--bg-navbar)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/" onClick={collapseNav}>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={collapseRef}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                aria-current={location.pathname === '/' ? 'page' : undefined}
                to="/"
                onClick={collapseNav}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                to="/about"
                onClick={collapseNav}
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
