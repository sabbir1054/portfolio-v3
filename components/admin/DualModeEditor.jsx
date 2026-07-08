"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-mde/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold", "italic", "underline", "strike",
  "color", "background",
  "list",
  "blockquote", "code-block",
  "link", "image",
];

export default function DualModeEditor({ value, onChange, contentType = "html" }) {
  const [mode, setMode] = useState(contentType === "markdown" ? "markdown" : "rich");
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pasteContent, setPasteContent] = useState("");

  const handleMarkdownPaste = () => {
    if (pasteContent.trim()) {
      onChange(pasteContent);
      setMode("markdown");
      setShowPasteModal(false);
      setPasteContent("");
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="dual-mode-editor-wrapper">
      <div className="editor-tabs">
        <button
          type="button"
          className={`editor-tab-btn ${mode === "rich" ? "active" : ""}`}
          onClick={() => switchMode("rich")}
        >
          <i className="fa-solid fa-pen-fancy" /> Rich Text
        </button>
        <button
          type="button"
          className={`editor-tab-btn ${mode === "markdown" ? "active" : ""}`}
          onClick={() => switchMode("markdown")}
        >
          <i className="fa-solid fa-file-code" /> Markdown
        </button>
        <button
          type="button"
          className="editor-tab-btn paste-btn"
          onClick={() => setShowPasteModal(true)}
          title="Paste markdown or HTML content"
        >
          <i className="fa-solid fa-paste" /> Paste Content
        </button>
      </div>

      {/* Paste Modal */}
      {showPasteModal && (
        <div className="modal-overlay" onClick={() => setShowPasteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Paste Markdown or HTML Content</h3>
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
                placeholder="Paste your markdown or HTML content here..."
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
                onClick={handleMarkdownPaste}
              >
                <i className="fa-solid fa-check" /> Paste Content
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rich Text Editor */}
      {mode === "rich" && (
        <div className="rich-text-editor">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder="Write your content using rich text formatting..."
          />
        </div>
      )}

      {/* Markdown Editor */}
      {mode === "markdown" && (
        <div className="markdown-editor" data-color-mode="light">
          <MDEditor
            value={value}
            onChange={onChange}
            preview="edit"
            height={400}
            visibleDragbar={true}
            textareaProps={{
              placeholder:
                "Enter markdown content here...",
            }}
            hideToolbar={false}
          />
        </div>
      )}

      <div className="editor-hint">
        <i className="fa-solid fa-lightbulb" />
        {mode === "rich" && " Tip: Switch to Markdown mode for better control over formatting"}
        {mode === "markdown" && " Tip: Use standard Markdown syntax for content. Switch to Rich Text for WYSIWYG editing"}
      </div>

      <style jsx>{`
        .dual-mode-editor-wrapper {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
        }

        .editor-tabs {
          display: flex;
          gap: 8px;
          padding: 12px;
          border-bottom: 1px solid #eee;
          background: #f9f9f9;
          flex-wrap: wrap;
        }

        .editor-tab-btn {
          padding: 8px 16px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .editor-tab-btn:hover {
          border-color: #666;
          background: #f0f0f0;
        }

        .editor-tab-btn.active {
          background: #1e90ff;
          color: white;
          border-color: #1e90ff;
        }

        .editor-tab-btn.paste-btn {
          margin-left: auto;
          background: #28a745;
          color: white;
          border-color: #28a745;
        }

        .editor-tab-btn.paste-btn:hover {
          background: #218838;
          border-color: #218838;
        }

        .rich-text-editor {
          padding: 12px;
        }

        .markdown-editor {
          padding: 0;
        }

        .editor-hint {
          padding: 10px 12px;
          background: #f0f8ff;
          border-top: 1px solid #ddd;
          font-size: 13px;
          color: #666;
          display: flex;
          gap: 8px;
          align-items: center;
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
          .editor-tabs {
            flex-direction: column;
          }

          .editor-tab-btn.paste-btn {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
