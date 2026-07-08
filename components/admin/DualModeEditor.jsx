"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["table"],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold", "italic", "underline", "strike",
  "list",
  "blockquote", "code-block",
  "table",
  "link", "image", "video",
];

export default function DualModeEditor({ value, onChange }) {
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pasteContent, setPasteContent] = useState("");

  const handleHtmlPaste = () => {
    if (pasteContent.trim()) {
      onChange(pasteContent);
      setShowPasteModal(false);
      setPasteContent("");
    }
  };

  return (
    <div className="rich-text-editor-wrapper">
      <div className="editor-actions">
        <button
          type="button"
          className="paste-btn"
          onClick={() => setShowPasteModal(true)}
        >
          <i className="fa-solid fa-paste" /> Paste HTML
        </button>
      </div>

      {showPasteModal && (
        <div className="modal-overlay" onClick={() => setShowPasteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Paste HTML Content</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setShowPasteModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <textarea
                value={pasteContent}
                onChange={(e) => setPasteContent(e.target.value)}
                placeholder="Paste your HTML content here..."
                rows={12}
                className="paste-textarea"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="modal-btn modal-btn-cancel"
                onClick={() => setShowPasteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-btn modal-btn-submit"
                onClick={handleHtmlPaste}
              >
                <i className="fa-solid fa-check" /> Paste
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rich-text-editor">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Write your blog content here..."
        />
      </div>

      <style jsx global>{`
        .rich-text-editor-wrapper {
          background: var(--background-color-4);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          overflow: hidden;
        }

        .rich-text-editor-wrapper .ql-toolbar {
          background: var(--background-color-3) !important;
          border: 1px solid var(--color-border) !important;
          border-bottom: 1px solid var(--color-border) !important;
        }

        .rich-text-editor-wrapper .ql-toolbar button,
        .rich-text-editor-wrapper .ql-toolbar button:hover,
        .rich-text-editor-wrapper .ql-toolbar button.ql-active,
        .rich-text-editor-wrapper .ql-toolbar.ql-snow button:hover,
        .rich-text-editor-wrapper .ql-toolbar.ql-snow button.ql-active {
          color: var(--color-heading) !important;
        }

        .rich-text-editor-wrapper .ql-toolbar.ql-snow button:hover,
        .rich-text-editor-wrapper .ql-toolbar.ql-snow button.ql-active {
          color: #00FF88 !important;
        }

        .rich-text-editor-wrapper .ql-container {
          background: var(--background-color-4) !important;
          border: none !important;
          font-family: var(--font-secondary) !important;
        }

        .rich-text-editor-wrapper .ql-editor {
          color: var(--color-body) !important;
          min-height: 400px;
        }

        .rich-text-editor-wrapper .ql-editor.ql-blank::before {
          color: var(--color-gray) !important;
        }

        .rich-text-editor-wrapper .ql-editor h1,
        .rich-text-editor-wrapper .ql-editor h2,
        .rich-text-editor-wrapper .ql-editor h3,
        .rich-text-editor-wrapper .ql-editor h4 {
          color: var(--color-heading);
        }

        .editor-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          padding: 10px 12px;
          border-bottom: 1px solid var(--color-border);
          background: var(--background-color-3);
        }

        .paste-btn {
          padding: 6px 12px;
          background: transparent;
          color: #00FF88;
          border: 1px solid #00FF88;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s;
          font-family: var(--font-secondary);
        }

        .paste-btn:hover {
          background: rgba(0, 255, 136, 0.1);
          color: #00FF88;
        }

        .rich-text-editor {
          padding: 0;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: var(--background-color-4);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid var(--color-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          color: var(--color-heading);
          font-family: var(--font-primary);
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: var(--color-gray);
          padding: 0;
          transition: color 0.3s;
        }

        .modal-close:hover {
          color: var(--color-heading);
        }

        .modal-body {
          padding: 20px;
        }

        .paste-textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--color-border);
          background: var(--background-color-3);
          color: var(--color-body);
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          resize: vertical;
        }

        .paste-textarea::placeholder {
          color: var(--color-gray);
        }

        .modal-footer {
          padding: 15px 20px;
          border-top: 1px solid var(--color-border);
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .modal-btn {
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-secondary);
          transition: all 0.3s;
          border: 1px solid var(--color-border);
        }

        .modal-btn-cancel {
          background: transparent;
          color: var(--color-body);
        }

        .modal-btn-cancel:hover {
          background: var(--background-color-3);
          color: var(--color-heading);
        }

        .modal-btn-submit {
          background: #7B2FFF;
          color: white;
          border-color: #7B2FFF;
        }

        .modal-btn-submit:hover {
          background: #6a1fdd;
          border-color: #6a1fdd;
        }

        @media (max-width: 768px) {
          .editor-actions {
            flex-direction: column;
          }

          .paste-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
