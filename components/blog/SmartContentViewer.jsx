"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const MDPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
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
        <div className="markdown-content" data-color-mode="light">
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
          color: #333;
        }

        .smart-content-viewer.markdown-content :global(h1),
        .smart-content-viewer.markdown-content :global(h2),
        .smart-content-viewer.markdown-content :global(h3),
        .smart-content-viewer.markdown-content :global(h4),
        .smart-content-viewer.markdown-content :global(h5),
        .smart-content-viewer.markdown-content :global(h6) {
          margin: 1.5em 0 0.5em 0;
          font-weight: 600;
        }

        .smart-content-viewer.markdown-content :global(h1) {
          font-size: 2em;
        }

        .smart-content-viewer.markdown-content :global(h2) {
          font-size: 1.5em;
        }

        .smart-content-viewer.markdown-content :global(h3) {
          font-size: 1.25em;
        }

        .smart-content-viewer.markdown-content :global(p) {
          margin: 1em 0;
        }

        .smart-content-viewer.markdown-content :global(code) {
          background: #f4f4f4;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
          font-size: 0.95em;
        }

        .smart-content-viewer.markdown-content :global(pre) {
          background: #f4f4f4;
          padding: 15px;
          border-radius: 5px;
          overflow-x: auto;
          margin: 1em 0;
        }

        .smart-content-viewer.markdown-content :global(pre code) {
          background: none;
          padding: 0;
        }

        .smart-content-viewer.markdown-content :global(blockquote) {
          border-left: 4px solid #ddd;
          padding: 0 0 0 15px;
          margin: 1em 0;
          color: #666;
        }

        .smart-content-viewer.markdown-content :global(ul),
        .smart-content-viewer.markdown-content :global(ol) {
          margin: 1em 0;
          padding-left: 2em;
        }

        .smart-content-viewer.markdown-content :global(li) {
          margin: 0.5em 0;
        }

        .smart-content-viewer.markdown-content :global(a) {
          color: #1e90ff;
          text-decoration: none;
        }

        .smart-content-viewer.markdown-content :global(a:hover) {
          text-decoration: underline;
        }

        .smart-content-viewer.markdown-content :global(img) {
          max-width: 100%;
          height: auto;
          border-radius: 5px;
          margin: 1em 0;
        }

        .smart-content-viewer.markdown-content :global(table) {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
        }

        .smart-content-viewer.markdown-content :global(th),
        .smart-content-viewer.markdown-content :global(td) {
          border: 1px solid #ddd;
          padding: 8px 12px;
          text-align: left;
        }

        .smart-content-viewer.markdown-content :global(th) {
          background: #f9f9f9;
          font-weight: 600;
        }

        .smart-content-viewer.html-content {
          line-height: 1.8;
        }

        .no-content {
          padding: 40px 20px;
          text-align: center;
          color: #999;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
