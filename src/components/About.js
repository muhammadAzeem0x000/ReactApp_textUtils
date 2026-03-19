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
        <span className="about-credit-emoji">🚀</span>
        <p className="about-credit-text">
          Built with ❤️ by <strong>Muhammad Azeem</strong>
        </p>
      </div>
    </div>
  );
}
