import React, { useState, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { toBoldText, fromBoldText } from '../utils/textHelpers';

export default function WriteProposal() {
  const [text, setText] = useState('');
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const textareaRef = useRef(null);
  const { showAlert } = useTheme();

  const handleSelection = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;

    if (start !== end) {
      const selectedText = text.substring(start, end);
      
      const isAlreadyBold = selectedText === toBoldText(selectedText) && selectedText !== fromBoldText(selectedText);
      
      let newTextPart = selectedText;
      if (!isAlreadyBold) {
        newTextPart = toBoldText(selectedText);
        showAlert('Selection bolded', 'Success');
      } else {
        newTextPart = fromBoldText(selectedText);
        showAlert('Selection unbolded', 'Success');
      }
      
      if (newTextPart === selectedText) return; 

      const newText = text.substring(0, start) + newTextPart + text.substring(end);
      setText(newText);
      
      // Restore selection after state update
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(start, start + newTextPart.length);
        }
      }, 0);
    }
  }, [text, showAlert]);

  const handleClear = () => {
    setText('');
    showAlert('Proposal cleared', 'Success');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showAlert('Proposal copied to clipboard', 'Success');
    } catch {
      showAlert('Failed to copy', 'Danger');
    }
  };

  return (
    <div className="proposal-container fade-in">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <h1 className="text-form-heading mb-0 d-flex align-items-center gap-2">
          Write Proposal
          <span 
            title="How it works"
            onClick={() => setShowInfoPopup(!showInfoPopup)}
            style={{ cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', position: 'relative' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
            {showInfoPopup && (
              <div 
                style={{
                  position: 'absolute',
                  top: '150%',
                  left: '0',
                  width: '280px',
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
                <div style={{ fontWeight: 600, marginBottom: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.9rem' }}>How it works</div>
                Paste or write your entire proposal. To make specific text <strong>bold</strong>, simply highlight the desired text and press <strong>Ctrl+B</strong> (or <strong>Cmd+B</strong>). To undo, select the bolded text and press <strong>Ctrl+B</strong> again.
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
        </h1>
        <div className="proposal-controls">
          <button className="btn btn-info me-2" onClick={handleCopy} disabled={!text}>
            📋 Copy All
          </button>
          <button className="btn btn-outline-danger" onClick={handleClear} disabled={!text}>
            ✕ Clear
          </button>
        </div>
      </div>
      
      <div className="proposal-editor-wrapper">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
              e.preventDefault();
              handleSelection();
            }
          }}
          className="form-control text-area proposal-textarea"
          rows={16}
          placeholder="Paste or write your entire proposal here...&#10;&#10;✨ Bold Text: Highlight any text and press Ctrl+B (or Cmd+B) to make it bold!&#10;🔄 Undo: Highlight the bolded text and press Ctrl+B again to revert it."
        />
      </div>
    </div>
  );
}
