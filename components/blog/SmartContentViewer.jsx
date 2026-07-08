"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const MDPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

const detectContentType = (content) => {
  if (!content) return "html";

  const markdownIndicators = [
    /^#+\s/m,
    /\*{1,3}\w+\*{1,3}/m,
    /_{1,3}\w+_{1,3}/m,
    /\[.+\]\(.+\)/m,
    /!\[.+\]\(.+\)/m,
    /^-\s/m,
    /^\d+\.\s/m,
    /^```/m,
    /^>/m,
    /^\|.+\|/m,
  ];

  const htmlIndicators = [/<\w+[^>]*>/m, /&\w+;/m];

  const markdownCount = markdownIndicators.filter((regex) =>
    regex.test(content)
  ).length;

  const hasHtml = htmlIndicators.some((regex) => regex.test(content));

  if (hasHtml) return "html";
  if (markdownCount >= 2) return "markdown";

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
    <div className={`smart-content-viewer ${viewerType}-content blog-details-discription`}>
      {viewerType === "markdown" ? (
        <MDPreview
          source={content}
          disableCopy
          className="wmde-markdown-var"
          style={{
            backgroundColor: "transparent",
            color: "inherit",
            padding: "0",
          }}
        />
      ) : (
        <div
          className="html-content disc"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      <style jsx global>{`
        .smart-content-viewer.markdown-content .wmde-markdown-var {
          color: var(--color-body);
          line-height: 1.8;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var h1,
        .smart-content-viewer.markdown-content .wmde-markdown-var h2,
        .smart-content-viewer.markdown-content .wmde-markdown-var h3,
        .smart-content-viewer.markdown-content .wmde-markdown-var h4,
        .smart-content-viewer.markdown-content .wmde-markdown-var h5,
        .smart-content-viewer.markdown-content .wmde-markdown-var h6 {
          margin: 30px 0 15px 0;
          font-weight: 600;
          color: var(--color-heading);
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var h1 {
          font-size: 2.5em;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var h2 {
          font-size: 2em;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var h3 {
          font-size: 1.5em;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var h4 {
          font-size: 1.25em;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var p {
          margin: 20px 0;
          color: var(--color-body);
          line-height: 1.8;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var strong,
        .smart-content-viewer.markdown-content .wmde-markdown-var b {
          color: var(--color-heading);
          font-weight: 700;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var code {
          background: var(--background-color-4);
          padding: 2px 6px;
          border-radius: 4px;
          color: #00FF88;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var pre {
          background: var(--background-color-4);
          border: 1px solid var(--color-border);
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 20px 0;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var pre code {
          background: none;
          padding: 0;
          color: #00FF88;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var blockquote {
          border-left: 4px solid #7B2FFF;
          padding: 15px 20px;
          margin: 20px 0;
          background: var(--background-color-3);
          border-radius: 4px;
          color: var(--color-body);
          font-style: italic;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var ul,
        .smart-content-viewer.markdown-content .wmde-markdown-var ol {
          margin: 20px 0 20px 30px;
          line-height: 1.8;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var li {
          margin-bottom: 10px;
          color: var(--color-body);
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var a {
          color: #7B2FFF;
          text-decoration: none;
          transition: 0.3s;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var a:hover {
          text-decoration: underline;
          color: #00FF88;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var img {
          max-width: 100%;
          height: auto;
          margin: 20px 0;
          border-radius: 8px;
          display: block;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var th,
        .smart-content-viewer.markdown-content .wmde-markdown-var td {
          border: 1px solid var(--color-border);
          padding: 12px;
          text-align: left;
          color: var(--color-body);
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var th {
          background: var(--background-color-4);
          color: var(--color-heading);
          font-weight: 600;
        }

        .smart-content-viewer.markdown-content .wmde-markdown-var hr {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: 30px 0;
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
