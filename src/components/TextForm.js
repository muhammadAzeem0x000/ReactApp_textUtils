import { useMemo, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { countWords, getReadingTime, removeExtraSpaces, toTitleCase, reverseText, toBoldText, fromBoldText } from '../utils/textHelpers';

export default function TextForm({ heading }) {
  const [text, setText] = useState('');
  const [fontFamily, setFontFamily] = useState('inherit');
  const { showAlert } = useTheme();

  const wordCount = useMemo(() => countWords(text), [text]);
  const readingTime = useMemo(() => getReadingTime(text), [text]);

  const handleChange = useCallback((e) => setText(e.target.value), []);

  const handleUpperCase = () => {
    setText(text.toUpperCase());
    showAlert('Converted to UPPERCASE', 'Success');
  };

  const handleLowerCase = () => {
    setText(text.toLowerCase());
    showAlert('Converted to lowercase', 'Success');
  };

  const handleTitleCase = () => {
    setText(toTitleCase(text));
    showAlert('Converted to Title Case', 'Success');
  };

  const handleReverse = () => {
    setText(reverseText(text));
    showAlert('Text reversed', 'Success');
  };

  const handleRemoveSpaces = () => {
    setText(removeExtraSpaces(text));
    showAlert('Extra spaces removed', 'Success');
  };

  const handleBold = () => {
    setText(toBoldText(text));
    showAlert('Converted to 𝗕𝗼𝗹𝗱 text', 'Success');
  };

  const handleUnbold = () => {
    setText(fromBoldText(text));
    showAlert('Converted back to normal text', 'Success');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showAlert('Copied to clipboard', 'Success');
    } catch {
      showAlert('Failed to copy', 'Danger');
    }
  };

  const handleClear = () => {
    setText('');
    showAlert('Text cleared', 'Success');
  };

  const isDisabled = text.length === 0;

  const fontOptions = [
    { label: 'Default', value: 'inherit' },
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
    { label: 'Courier New', value: '"Courier New", Courier, monospace' },
    { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
    { label: 'Impact', value: 'Impact, Charcoal, sans-serif' }
  ];

  return (
    <>
      <div className="text-form-container">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <h1 className="text-form-heading mb-0">{heading}</h1>
          <div className="position-relative d-flex align-items-center">
            <span 
              className="position-absolute text-muted" 
              style={{ left: '0.8rem', pointerEvents: 'none', fontWeight: 600, fontSize: '0.95rem' }}
            >
              Font:
            </span>
            <select 
              className="form-select font-select-modern"
              title="Select a font"
              value={fontFamily} 
              onChange={(e) => setFontFamily(e.target.value)}
              style={{ paddingLeft: '3.2rem', minWidth: '160px' }}
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-3">
          <textarea
            className="form-control text-area"
            value={text}
            onChange={handleChange}
            id="myBox"
            rows="8"
            style={{ fontFamily }}
            placeholder="Type or paste your text here..."
          />
        </div>

        <div className="button-group">
          <button disabled={isDisabled} className="btn btn-primary" onClick={handleUpperCase}>
            UPPERCASE
          </button>
          <button disabled={isDisabled} className="btn btn-primary" onClick={handleLowerCase}>
            lowercase
          </button>
          <button disabled={isDisabled} className="btn btn-primary" onClick={handleTitleCase}>
            Title Case
          </button>
          <button disabled={isDisabled} className="btn btn-secondary" onClick={handleReverse}>
            Reverse
          </button>
          <button disabled={isDisabled} className="btn btn-secondary" onClick={handleRemoveSpaces}>
            Remove Spaces
          </button>
          <button disabled={isDisabled} className="btn btn-bold" onClick={handleBold}>
            𝗕 Bold
          </button>
          <button disabled={isDisabled} className="btn btn-bold-outline" onClick={handleUnbold}>
            Unbold
          </button>
          <button disabled={isDisabled} className="btn btn-info" onClick={handleCopy}>
            📋 Copy
          </button>
          <button disabled={isDisabled} className="btn btn-outline-danger" onClick={handleClear}>
            ✕ Clear
          </button>
        </div>
      </div>

      <div className="summary-container">
        <h2>Summary</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{wordCount}</span>
            <span className="stat-label">Words</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{text.length}</span>
            <span className="stat-label">Characters</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{readingTime}</span>
            <span className="stat-label">Min Read</span>
          </div>
        </div>
        <h3>Preview</h3>
        <p className="text-preview" style={{ fontFamily }}>{text.length > 0 ? text : 'Nothing to preview'}</p>
      </div>
    </>
  );
}
