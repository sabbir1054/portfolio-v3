"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.core.css";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div style={{ padding: "20px", color: "var(--color-body)" }}>
      Loading content...
    </div>
  ),
});

export default function SmartContentViewer({ content, contentType = "html" }) {
  if (!content) {
    return (
      <div
        className="no-content"
        style={{
          padding: "40px 20px",
          textAlign: "center",
          color: "var(--color-gray)",
          fontSize: "16px",
        }}
      >
        No content available
      </div>
    );
  }

  return (
    <div className="smart-content-viewer blog-details-discription quill-viewer">
      <ReactQuill
        value={content}
        readOnly={true}
        theme="snow"
        modules={{
          toolbar: false,
          clipboard: false,
          history: false,
        }}
        style={{
          border: "none",
          background: "transparent",
        }}
      />

      <style jsx global>{`
        .quill-viewer.smart-content-viewer .ql-container {
          background: transparent !important;
          border: none !important;
          font-family: var(--font-secondary) !important;
          font-size: 16px !important;
        }

        .quill-viewer.smart-content-viewer .ql-container.ql-disabled .ql-editor {
          background: transparent !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor {
          padding: 0 !important;
          background: transparent !important;
          color: var(--color-body) !important;
          line-height: 1.8 !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor.ql-blank::before {
          color: transparent !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor h1,
        .quill-viewer.smart-content-viewer .ql-editor h2,
        .quill-viewer.smart-content-viewer .ql-editor h3,
        .quill-viewer.smart-content-viewer .ql-editor h4,
        .quill-viewer.smart-content-viewer .ql-editor h5,
        .quill-viewer.smart-content-viewer .ql-editor h6 {
          margin: 30px 0 15px 0 !important;
          font-weight: 600 !important;
          color: var(--color-heading) !important;
          font-family: var(--font-primary) !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor h1 {
          font-size: 2.5em !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor h2 {
          font-size: 2em !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor h3 {
          font-size: 1.5em !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor h4 {
          font-size: 1.25em !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor h5 {
          font-size: 1.1em !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor h6 {
          font-size: 1em !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor p {
          margin: 20px 0 !important;
          color: var(--color-body) !important;
          line-height: 1.8 !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor strong,
        .quill-viewer.smart-content-viewer .ql-editor b {
          color: var(--color-heading) !important;
          font-weight: 700 !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor em,
        .quill-viewer.smart-content-viewer .ql-editor i {
          color: var(--color-body) !important;
          font-style: italic !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor u {
          text-decoration: underline !important;
          color: var(--color-body) !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor s {
          text-decoration: line-through !important;
          color: var(--color-body) !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor code {
          background: var(--background-color-4) !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          color: #00FF88 !important;
          font-family: 'Courier New', monospace !important;
          font-size: 0.9em !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor pre {
          background: var(--background-color-4) !important;
          border: 1px solid var(--color-border) !important;
          padding: 20px !important;
          border-radius: 8px !important;
          overflow-x: auto !important;
          margin: 20px 0 !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor pre code {
          background: none !important;
          padding: 0 !important;
          color: #00FF88 !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor blockquote {
          border-left: 4px solid #7B2FFF !important;
          padding: 15px 20px !important;
          margin: 20px 0 !important;
          background: var(--background-color-3) !important;
          border-radius: 4px !important;
          color: var(--color-body) !important;
          font-style: italic !important;
          border: none !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor ul,
        .quill-viewer.smart-content-viewer .ql-editor ol {
          margin: 20px 0 20px 30px !important;
          line-height: 1.8 !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor li {
          margin-bottom: 10px !important;
          color: var(--color-body) !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor a {
          color: #7B2FFF !important;
          text-decoration: none !important;
          transition: 0.3s !important;
          cursor: pointer !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor a:hover {
          text-decoration: underline !important;
          color: #00FF88 !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor img {
          max-width: 100% !important;
          height: auto !important;
          margin: 20px 0 !important;
          border-radius: 8px !important;
          display: block !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin: 20px 0 !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor th,
        .quill-viewer.smart-content-viewer .ql-editor td {
          border: 1px solid var(--color-border) !important;
          padding: 12px !important;
          text-align: left !important;
          color: var(--color-body) !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor th {
          background: var(--background-color-4) !important;
          color: var(--color-heading) !important;
          font-weight: 600 !important;
        }

        .quill-viewer.smart-content-viewer .ql-editor hr {
          border: none !important;
          border-top: 1px solid var(--color-border) !important;
          margin: 30px 0 !important;
        }
      `}</style>
    </div>
  );
}
