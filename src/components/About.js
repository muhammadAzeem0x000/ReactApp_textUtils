export default function About() {
  const features = [
    { icon: '🔠', title: 'Case Conversion', desc: 'UPPERCASE, lowercase, or Title Case in one click' },
    { icon: '𝗕', title: 'Bold Unicode', desc: 'Generate bold text for Upwork & social platforms' },
    { icon: '🔄', title: 'Reverse Text', desc: 'Flip your text backwards instantly' },
    { icon: '✂️', title: 'Space Cleanup', desc: 'Remove extra whitespace with ease' },
    { icon: '📋', title: 'Quick Copy', desc: 'One-click copy to clipboard' },
    { icon: '📊', title: 'Text Analytics', desc: 'Word count, characters & reading time' },
    { icon: '👁️', title: 'Live Preview', desc: 'See changes as you type in real time' },
    { icon: '🌙', title: 'Dark Mode', desc: 'Easy on the eyes, day or night' },
  ];

  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="about-title">
          About <span className="about-title-accent">UpworkBold</span>
        </h1>
        <p className="about-subtitle">
          A free, fast, and privacy-friendly text utility — built with React.
          No data ever leaves your browser.
        </p>
      </div>

      <h2 className="about-section-heading">✨ Features</h2>
      <div className="about-features-grid">
        {features.map((f, i) => (
          <div className="about-feature-card" key={i}>
            <span className="about-feature-icon">{f.icon}</span>
            <h3 className="about-feature-title">{f.title}</h3>
            <p className="about-feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="about-credit-card">
        <div className="about-credit-left">
          <span className="about-credit-emoji">🚀</span>
          <p className="about-credit-text">
            Built with ❤️ by <strong>Muhammad Azeem</strong>
          </p>
        </div>
        <a 
          href="https://github.com/muhammadAzeem0x000/ReactApp_textUtils" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="about-github-link"
          title="View Source Code on GitHub"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>Source Code</span>
        </a>
      </div>
    </div>
  );
}
