"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-markdown-preview/markdown-light.css";

const MDPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then(mod => mod.default),
  { ssr: false, loading: () => <div>Loading...</div> }
);

// Function to detect if content is markdown or HTML
const detectContentType = (content) => {
  if (!content) return "html";

  // Check for markdown indicators
  const markdownIndicators = [
    /^#+\s/m, // Headers
    /\*{1,3}\w+\*{1,3}/m, // Bold/italic with asterisks
    /_{1,3}\w+_{1,3}/m, // Bold/italic with underscores
    /\[.+\]\(.+\)/m, // Links
    /!\[.+\]\(.+\)/m, // Images
    /^-\s/m, // Unordered lists
    /^\d+\.\s/m, // Ordered lists
    /^```/m, // Code blocks
    /^>/m, // Blockquotes
    /^\|.+\|/m, // Tables
  ];

  const htmlIndicators = [
    /<\w+[^>]*>/m, // HTML tags
    /&\w+;/m, // HTML entities
  ];

  // Count markdown-like patterns
  const markdownCount = markdownIndicators.filter((regex) =>
    regex.test(content)
  ).length;

  // Check for HTML tags
  const hasHtml = htmlIndicators.some((regex) => regex.test(content));

  // If content has HTML tags, treat as HTML
  if (hasHtml) return "html";

  // If markdown patterns found, treat as markdown
  if (markdownCount >= 2) return "markdown";

  // Default to HTML for backward compatibility
  return "html";
};

export default function SmartContentViewer({ content, contentType = null }) {
  const viewerType = useMemo(() => {
    if (contentType) return contentType;
    return detectContentType(content);
  }, [content, contentType]);

  if (!content) {
    return <div className="no-content">No content available</div>;
  }

  return (
    <div className={`smart-content-viewer ${viewerType}-content`}>
      {viewerType === "markdown" ? (
        <div className="markdown-content">
          <MDPreview
            source={content}
            style={{
              backgroundColor: "transparent",
              color: "inherit",
              padding: "0",
            }}
          />
        </div>
      ) : (
        <div
          className="html-content disc"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      <style jsx global>{`
        .smart-content-viewer {
          width: 100%;
        }

        .smart-content-viewer.markdown-content .wmde-markdown {
          background: transparent !important;
          color: var(--color-body) !important;
          line-height: 1.8;
        }

        .smart-content-viewer.markdown-content .wmde-markdown h1,
        .smart-content-viewer.markdown-content .wmde-markdown h2,
        .smart-content-viewer.markdown-content .wmde-markdown h3,
        .smart-content-viewer.markdown-content .wmde-markdown h4,
        .smart-content-viewer.markdown-content .wmde-markdown h5,
        .smart-content-viewer.markdown-content .wmde-markdown h6 {
          margin: 30px 0 15px 0 !important;
          font-weight: 600 !important;
          color: var(--color-heading) !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown h1 {
          font-size: 2.5em !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown h2 {
          font-size: 2em !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown h3 {
          font-size: 1.5em !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown h4 {
          font-size: 1.25em !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown p {
          margin: 20px 0 !important;
          color: var(--color-body) !important;
          line-height: 1.8 !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown strong,
        .smart-content-viewer.markdown-content .wmde-markdown b {
          color: var(--color-heading) !important;
          font-weight: 700 !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown code {
          background: var(--background-color-4) !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          color: #00FF88 !important;
          font-family: 'Courier New', monospace !important;
          font-size: 0.9em !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown pre {
          background: var(--background-color-4) !important;
          border: 1px solid var(--color-border) !important;
          padding: 20px !important;
          border-radius: 8px !important;
          overflow-x: auto !important;
          margin: 20px 0 !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown pre code {
          background: none !important;
          padding: 0 !important;
          color: #00FF88 !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown blockquote {
          border-left: 4px solid #7B2FFF !important;
          padding: 15px 20px !important;
          margin: 20px 0 !important;
          background: var(--background-color-3) !important;
          border-radius: 4px !important;
          color: var(--color-body) !important;
          font-style: italic !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown ul,
        .smart-content-viewer.markdown-content .wmde-markdown ol {
          margin: 20px 0 20px 30px !important;
          line-height: 1.8 !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown li {
          margin-bottom: 10px !important;
          color: var(--color-body) !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown a {
          color: #7B2FFF !important;
          text-decoration: none !important;
          transition: 0.3s !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown a:hover {
          text-decoration: underline !important;
          color: #00FF88 !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown img {
          max-width: 100% !important;
          height: auto !important;
          margin: 20px 0 !important;
          border-radius: 8px !important;
          display: block !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin: 20px 0 !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown th,
        .smart-content-viewer.markdown-content .wmde-markdown td {
          border: 1px solid var(--color-border) !important;
          padding: 12px !important;
          text-align: left !important;
          color: var(--color-body) !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown th {
          background: var(--background-color-4) !important;
          color: var(--color-heading) !important;
          font-weight: 600 !important;
        }

        .smart-content-viewer.markdown-content .wmde-markdown hr {
          border: none !important;
          border-top: 1px solid var(--color-border) !important;
          margin: 30px 0 !important;
        }

        .smart-content-viewer.html-content {
          line-height: 1.8;
        }

        .no-content {
          padding: 40px 20px;
          text-align: center;
          color: var(--color-gray);
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
