"use client";

import dynamic from "next/dynamic";
import "react-quill-new/lib/styles/core.css";
import "react-quill-new/lib/styles/snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

export default function SmartContentViewer({ content }) {
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
    <div className="smart-content-viewer blog-details-discription">
      <ReactQuill
        value={content}
        readOnly={true}
        theme="snow"
        modules={{
          toolbar: false,
        }}
      />

      <style jsx global>{`
        .smart-content-viewer .ql-container {
          background: transparent;
          border: none;
          font-family: var(--font-secondary);
          font-size: 16px;
        }

        .smart-content-viewer .ql-editor {
          padding: 0;
          background: transparent;
          color: var(--color-body);
          line-height: 1.8;
        }

        .smart-content-viewer .ql-editor h1,
        .smart-content-viewer .ql-editor h2,
        .smart-content-viewer .ql-editor h3,
        .smart-content-viewer .ql-editor h4,
        .smart-content-viewer .ql-editor h5,
        .smart-content-viewer .ql-editor h6 {
          margin: 30px 0 15px 0;
          font-weight: 600;
          color: var(--color-heading);
          font-family: var(--font-primary);
        }

        .smart-content-viewer .ql-editor h1 {
          font-size: 2.5em;
        }

        .smart-content-viewer .ql-editor h2 {
          font-size: 2em;
        }

        .smart-content-viewer .ql-editor h3 {
          font-size: 1.5em;
        }

        .smart-content-viewer .ql-editor h4 {
          font-size: 1.25em;
        }

        .smart-content-viewer .ql-editor h5 {
          font-size: 1.1em;
        }

        .smart-content-viewer .ql-editor h6 {
          font-size: 1em;
        }

        .smart-content-viewer .ql-editor p {
          margin: 20px 0;
          color: var(--color-body);
          line-height: 1.8;
        }

        .smart-content-viewer .ql-editor strong,
        .smart-content-viewer .ql-editor b {
          color: var(--color-heading);
          font-weight: 700;
        }

        .smart-content-viewer .ql-editor em,
        .smart-content-viewer .ql-editor i {
          color: var(--color-body);
          font-style: italic;
        }

        .smart-content-viewer .ql-editor code {
          background: var(--background-color-4);
          padding: 2px 6px;
          border-radius: 4px;
          color: #00FF88;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }

        .smart-content-viewer .ql-editor pre {
          background: var(--background-color-4);
          border: 1px solid var(--color-border);
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 20px 0;
        }

        .smart-content-viewer .ql-editor pre code {
          background: none;
          padding: 0;
          color: #00FF88;
        }

        .smart-content-viewer .ql-editor blockquote {
          border-left: 4px solid #7B2FFF;
          padding: 15px 20px;
          margin: 20px 0;
          background: var(--background-color-3);
          border-radius: 4px;
          color: var(--color-body);
          font-style: italic;
          border: none;
        }

        .smart-content-viewer .ql-editor ul,
        .smart-content-viewer .ql-editor ol {
          margin: 20px 0 20px 30px;
          line-height: 1.8;
        }

        .smart-content-viewer .ql-editor li {
          margin-bottom: 10px;
          color: var(--color-body);
        }

        .smart-content-viewer .ql-editor a {
          color: #7B2FFF;
          text-decoration: none;
          transition: 0.3s;
        }

        .smart-content-viewer .ql-editor a:hover {
          text-decoration: underline;
          color: #00FF88;
        }

        .smart-content-viewer .ql-editor img {
          max-width: 100%;
          height: auto;
          margin: 20px 0;
          border-radius: 8px;
          display: block;
        }

        .smart-content-viewer .ql-editor table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }

        .smart-content-viewer .ql-editor th,
        .smart-content-viewer .ql-editor td {
          border: 1px solid var(--color-border);
          padding: 12px;
          text-align: left;
          color: var(--color-body);
        }

        .smart-content-viewer .ql-editor th {
          background: var(--background-color-4);
          color: var(--color-heading);
          font-weight: 600;
        }

        .smart-content-viewer .ql-editor hr {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: 30px 0;
        }
      `}</style>
    </div>
  );
}
