"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
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
  "color", "background",
  "list",
  "blockquote", "code-block",
  "table",
  "link", "image", "video",
];

export default function DualModeEditor({ value, onChange, contentType = "html" }) {
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
      <div className="editor-toolbar">
        <div className="toolbar-info">
          <i className="fa-solid fa-pen-fancy" /> Rich Text Editor
          <small>(Supports: Text, Tables, YouTube Videos, Images, Links)</small>
        </div>
        <button
          type="button"
          className="editor-paste-btn"
          onClick={() => setShowPasteModal(true)}
          title="Paste HTML content"
        >
          <i className="fa-solid fa-paste" /> Paste HTML
        </button>
      </div>

      {/* Paste Modal */}
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
                className="admin-btn admin-btn-default"
                onClick={() => setShowPasteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={handleHtmlPaste}
              >
                <i className="fa-solid fa-check" /> Paste Content
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rich Text Editor */}
      <div className="rich-text-editor">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Write your content using rich text formatting... Insert tables, embed YouTube videos, add links and images."
        />
      </div>

      <div className="editor-hint">
        <i className="fa-solid fa-circle-info" />
        <div>
          <strong>YouTube Videos:</strong> Click the video button and enter the YouTube video URL<br/>
          <strong>Tables:</strong> Click the table button to insert/manage tables<br/>
          <strong>Images:</strong> Click the image button or paste image URL
        </div>
      </div>

      <style jsx>{`
        .rich-text-editor-wrapper {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
        }

        .editor-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-bottom: 1px solid #eee;
          background: #f9f9f9;
          flex-wrap: wrap;
        }

        .toolbar-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 14px;
        }

        .toolbar-info small {
          color: #666;
          font-size: 12px;
        }

        .editor-paste-btn {
          padding: 8px 16px;
          background: #28a745;
          color: white;
          border: 1px solid #28a745;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .editor-paste-btn:hover {
          background: #218838;
          border-color: #218838;
        }

        .rich-text-editor {
          padding: 12px;
          min-height: 400px;
        }

        .editor-hint {
          padding: 12px;
          background: #e7f3ff;
          border-top: 1px solid #ddd;
          font-size: 13px;
          color: #004085;
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }

        .editor-hint i {
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          padding: 0;
        }

        .modal-body {
          padding: 20px;
        }

        .paste-textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: monospace;
          font-size: 13px;
          resize: vertical;
        }

        .modal-footer {
          padding: 15px 20px;
          border-top: 1px solid #eee;
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .editor-toolbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .editor-paste-btn {
            align-self: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
