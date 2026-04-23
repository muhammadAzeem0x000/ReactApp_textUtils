import React, { useState, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { toBoldText, fromBoldText } from '../utils/textHelpers';

export default function WriteProposal() {
  const [text, setText] = useState('');
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
        <h1 className="text-form-heading mb-0">Write Proposal</h1>
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
          onMouseUp={handleSelection}
          onKeyUp={(e) => {
            // Trigger selection on keyboard selection commands (Shift + Arrow keys)
            if (e.shiftKey && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
              handleSelection();
            }
          }}
          className="form-control text-area proposal-textarea"
          rows={16}
          placeholder="Paste or write your entire proposal here...&#10;&#10;✨ Magic Select: Just highlight any text to instantly make it bold!&#10;🔄 Undo: Highlight the bolded text again to revert it."
        />
      </div>
    </div>
  );
}
