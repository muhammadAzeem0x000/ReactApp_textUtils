export default function About() {
  return (
    <div className="about-container">
      <h1>About TextUtils</h1>
      <p>
        TextUtils is a free, fast, and privacy-friendly text utility tool built with React.
        Manipulate your text instantly — no data is sent to any server.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Convert text to UPPERCASE, lowercase, or Title Case</li>
        <li>Reverse your text</li>
        <li>Remove extra whitespace</li>
        <li>Copy text to clipboard in one click</li>
        <li>Real-time word count, character count, and reading time</li>
        <li>Live text preview</li>
        <li>Dark mode for comfortable reading</li>
      </ul>

      <hr />
      <p className="developer-credit">
        Developed by <strong>Muhammad Azeem</strong>
      </p>
    </div>
  );
}
