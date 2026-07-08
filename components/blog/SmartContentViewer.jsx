"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const MDPreview = dynamic(
  () => import("@uiw/react-markdown-preview"),
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

      <style jsx>{`
        .smart-content-viewer {
          width: 100%;
        }

        .smart-content-viewer.markdown-content {
          line-height: 1.8;
          color: var(--color-body);
        }

        .smart-content-viewer.markdown-content :global(h1),
        .smart-content-viewer.markdown-content :global(h2),
        .smart-content-viewer.markdown-content :global(h3),
        .smart-content-viewer.markdown-content :global(h4),
        .smart-content-viewer.markdown-content :global(h5),
        .smart-content-viewer.markdown-content :global(h6) {
          margin: 30px 0 15px 0;
          font-weight: 600;
          color: var(--color-heading);
        }

        .smart-content-viewer.markdown-content :global(h1) {
          font-size: 2.5em;
        }

        .smart-content-viewer.markdown-content :global(h2) {
          font-size: 2em;
        }

        .smart-content-viewer.markdown-content :global(h3) {
          font-size: 1.5em;
        }

        .smart-content-viewer.markdown-content :global(h4) {
          font-size: 1.25em;
        }

        .smart-content-viewer.markdown-content :global(p) {
          margin: 20px 0;
          color: var(--color-body);
        }

        .smart-content-viewer.markdown-content :global(strong),
        .smart-content-viewer.markdown-content :global(b) {
          color: var(--color-heading);
          font-weight: 700;
        }

        .smart-content-viewer.markdown-content :global(code) {
          background: var(--background-color-4);
          padding: 2px 6px;
          border-radius: 4px;
          color: #00FF88;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }

        .smart-content-viewer.markdown-content :global(pre) {
          background: var(--background-color-4);
          border: 1px solid var(--color-border);
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 20px 0;
        }

        .smart-content-viewer.markdown-content :global(pre code) {
          background: none;
          padding: 0;
          color: #00FF88;
        }

        .smart-content-viewer.markdown-content :global(blockquote) {
          border-left: 4px solid #7B2FFF;
          padding: 15px 20px;
          margin: 20px 0;
          background: var(--background-color-3);
          border-radius: 4px;
          color: var(--color-body);
          font-style: italic;
        }

        .smart-content-viewer.markdown-content :global(ul),
        .smart-content-viewer.markdown-content :global(ol) {
          margin: 20px 0 20px 30px;
          line-height: 1.8;
        }

        .smart-content-viewer.markdown-content :global(li) {
          margin-bottom: 10px;
          color: var(--color-body);
        }

        .smart-content-viewer.markdown-content :global(a) {
          color: #7B2FFF;
          text-decoration: none;
          transition: 0.3s;
        }

        .smart-content-viewer.markdown-content :global(a:hover) {
          text-decoration: underline;
          color: #00FF88;
        }

        .smart-content-viewer.markdown-content :global(img) {
          max-width: 100%;
          height: auto;
          margin: 20px 0;
          border-radius: 8px;
          display: block;
        }

        .smart-content-viewer.markdown-content :global(table) {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }

        .smart-content-viewer.markdown-content :global(th),
        .smart-content-viewer.markdown-content :global(td) {
          border: 1px solid var(--color-border);
          padding: 12px;
          text-align: left;
          color: var(--color-body);
        }

        .smart-content-viewer.markdown-content :global(th) {
          background: var(--background-color-4);
          color: var(--color-heading);
          font-weight: 600;
        }

        .smart-content-viewer.markdown-content :global(hr) {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: 30px 0;
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
