import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { countWords, getReadingTime, removeExtraSpaces, toTitleCase, reverseText, toBoldText, fromBoldText } from '../utils/textHelpers';

export default function TextForm({ heading }) {
  const [text, setText] = useState('');
  const [fontFamily, setFontFamily] = useState('inherit');
  const [upworkMode, setUpworkMode] = useState(false);
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const dropdownRef = useRef(null);
  const isPastingRef = useRef(false);
  const { showAlert } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFontDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const wordCount = useMemo(() => countWords(text), [text]);
  const readingTime = useMemo(() => getReadingTime(text), [text]);

  const handleChange = useCallback((e) => {
    if (isPastingRef.current) return;
    let newVal = e.target.value;
    
    if (upworkMode) {
      const lengthDiff = newVal.length - text.length;
      if (lengthDiff > 1) {
        if (e.nativeEvent?.data) {
          newVal = e.nativeEvent.data;
        } else if (newVal.endsWith(text)) {
          newVal = newVal.substring(0, lengthDiff);
        } else if (newVal.startsWith(text)) {
          newVal = newVal.substring(text.length);
        }
      }
      newVal = toBoldText(newVal);
      navigator.clipboard.writeText(newVal).catch(() => {});
    }
    setText(newVal);
  }, [upworkMode, text]);

  const handlePaste = useCallback((e) => {
    if (upworkMode) {
      e.preventDefault();
      isPastingRef.current = true;
      const pastedData = e.clipboardData.getData('text');
      const bolded = toBoldText(pastedData);
      setText(bolded);
      navigator.clipboard.writeText(bolded).catch(() => {});
      showAlert('Text overwritten, auto-bolded & copied!', 'Success');
      setTimeout(() => {
        isPastingRef.current = false;
      }, 50);
    }
  }, [upworkMode, showAlert]);

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
          <div className="d-flex align-items-center gap-3">
            <div className="form-check form-switch d-flex align-items-center mb-0">
              <input 
                className="form-check-input mt-0" 
                type="checkbox" 
                role="switch" 
                id="upworkModeSwitch" 
                checked={upworkMode}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setUpworkMode(isChecked);
                  showAlert(`Upwork Mode (Auto Bold) ${isChecked ? 'Enabled' : 'Disabled'}`, 'Success');
                  if (isChecked && text.length > 0) {
                    const bolded = toBoldText(text);
                    setText(bolded);
                    navigator.clipboard.writeText(bolded).catch(() => {});
                  }
                }}
                style={{ width: '2.5rem', height: '1.25rem', cursor: 'pointer' }}
              />
              <div 
                className="form-check-label ms-2 d-flex align-items-center gap-1" 
                style={{ fontWeight: 600, color: 'var(--text-primary)', cursor: 'default', userSelect: 'none' }}
              >
                Upwork Mode
                <span 
                  title="Upwork Mode Info"
                  onClick={() => setShowInfoPopup(!showInfoPopup)}
                  style={{ cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', position: 'relative' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                  </svg>
                  {showInfoPopup && (
                    <div 
                      style={{
                        position: 'absolute',
                        top: '150%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '240px',
                        padding: '1rem',
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--accent-secondary)',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow-lg)',
                        fontSize: '0.85rem',
                        fontWeight: 400,
                        opacity: 0.96,
                        backdropFilter: 'blur(8px)',
                        zIndex: 1050,
                        textAlign: 'left',
                        cursor: 'default',
                        lineHeight: 1.6
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ fontWeight: 600, marginBottom: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.9rem' }}>Upwork Mode</div>
                      Automatically converts your typed or pasted text to <strong>bold</strong> and instantly copies it to your clipboard. It also automatically clears your previous input when new text is pasted.
                      <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setShowInfoPopup(false); }}
                          style={{ 
                            background: 'var(--border-color)', 
                            border: 'none', 
                            color: 'var(--text-primary)', 
                            padding: '0.2rem 0.6rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem', 
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  )}
                </span>
              </div>
            </div>
            <div className="position-relative d-flex align-items-center" ref={dropdownRef}>
              <span 
                className="position-absolute" 
                style={{ left: '1rem', pointerEvents: 'none', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-muted)' }}
              >
                Font:
              </span>
              <div 
                className={`form-select font-select-modern position-relative d-flex align-items-center ${isFontDropdownOpen ? 'focus' : ''}`}
                onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
                style={{ paddingLeft: '3.6rem', paddingRight: '2.5rem', minWidth: '170px', cursor: 'pointer', userSelect: 'none', backgroundColor: 'var(--bg-card)' }}
              >
                <span style={{ fontFamily: fontFamily, display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                  {fontOptions.find(f => f.value === fontFamily)?.label || 'Default'}
                </span>
              </div>
              <span 
                className="position-absolute" 
                style={{ right: '1rem', pointerEvents: 'none', fontSize: '0.75rem', color: 'var(--text-muted)', zIndex: 10, transform: isFontDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
              >
                ▼
              </span>
              
              {isFontDropdownOpen && (
                <div 
                  className="custom-dropdown-menu position-absolute w-100" 
                  style={{ 
                    top: '100%', 
                    left: 0, 
                    marginTop: '0.5rem', 
                    backgroundColor: 'var(--bg-card)', 
                    border: '2px solid var(--border-color)', 
                    borderRadius: 'var(--radius)', 
                    boxShadow: 'var(--shadow-lg)', 
                    zIndex: 1000,
                    overflow: 'hidden'
                  }}
                >
                  {fontOptions.map((font) => (
                    <div 
                      key={font.value} 
                      className="custom-dropdown-item"
                      onClick={() => {
                        setFontFamily(font.value);
                        setIsFontDropdownOpen(false);
                      }}
                      style={{ 
                        padding: '0.5rem 1rem', 
                        fontFamily: font.value, 
                        cursor: 'pointer',
                        backgroundColor: fontFamily === font.value ? 'var(--bg-secondary)' : 'transparent',
                        color: fontFamily === font.value ? 'var(--accent-primary)' : 'var(--text-primary)',
                        transition: 'background-color 0.2s, color 0.2s',
                        fontWeight: fontFamily === font.value ? 600 : 500
                      }}
                    >
                      {font.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <textarea
            className="form-control text-area"
            value={text}
            onChange={handleChange}
            onPaste={handlePaste}
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
