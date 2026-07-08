"use client";

import Markdown from "react-markdown";
import { useMemo } from "react";

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

const MarkdownComponents = {
  h1: ({ node, ...props }) => (
    <h1
      style={{
        fontSize: "2.5em",
        margin: "30px 0 15px 0",
        fontWeight: 600,
        color: "var(--color-heading)",
      }}
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h2
      style={{
        fontSize: "2em",
        margin: "30px 0 15px 0",
        fontWeight: 600,
        color: "var(--color-heading)",
      }}
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h3
      style={{
        fontSize: "1.5em",
        margin: "30px 0 15px 0",
        fontWeight: 600,
        color: "var(--color-heading)",
      }}
      {...props}
    />
  ),
  h4: ({ node, ...props }) => (
    <h4
      style={{
        fontSize: "1.25em",
        margin: "30px 0 15px 0",
        fontWeight: 600,
        color: "var(--color-heading)",
      }}
      {...props}
    />
  ),
  h5: ({ node, ...props }) => (
    <h5
      style={{
        fontSize: "1.1em",
        margin: "30px 0 15px 0",
        fontWeight: 600,
        color: "var(--color-heading)",
      }}
      {...props}
    />
  ),
  h6: ({ node, ...props }) => (
    <h6
      style={{
        fontSize: "1em",
        margin: "30px 0 15px 0",
        fontWeight: 600,
        color: "var(--color-heading)",
      }}
      {...props}
    />
  ),
  p: ({ node, ...props }) => (
    <p
      style={{
        margin: "20px 0",
        color: "var(--color-body)",
        lineHeight: 1.8,
      }}
      {...props}
    />
  ),
  strong: ({ node, ...props }) => (
    <strong
      style={{
        color: "var(--color-heading)",
        fontWeight: 700,
      }}
      {...props}
    />
  ),
  em: ({ node, ...props }) => (
    <em
      style={{
        color: "var(--color-heading)",
      }}
      {...props}
    />
  ),
  code: ({ node, inline, ...props }) => (
    <code
      style={{
        background: inline ? "var(--background-color-4)" : "transparent",
        padding: inline ? "2px 6px" : "0",
        borderRadius: inline ? "4px" : "0",
        color: "#00FF88",
        fontFamily: "'Courier New', monospace",
        fontSize: "0.9em",
      }}
      {...props}
    />
  ),
  pre: ({ node, ...props }) => (
    <pre
      style={{
        background: "var(--background-color-4)",
        border: "1px solid var(--color-border)",
        padding: "20px",
        borderRadius: "8px",
        overflowX: "auto",
        margin: "20px 0",
      }}
      {...props}
    />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      style={{
        borderLeft: "4px solid #7B2FFF",
        padding: "15px 20px",
        margin: "20px 0",
        background: "var(--background-color-3)",
        borderRadius: "4px",
        color: "var(--color-body)",
        fontStyle: "italic",
      }}
      {...props}
    />
  ),
  ul: ({ node, ...props }) => (
    <ul
      style={{
        margin: "20px 0 20px 30px",
        lineHeight: 1.8,
      }}
      {...props}
    />
  ),
  ol: ({ node, ...props }) => (
    <ol
      style={{
        margin: "20px 0 20px 30px",
        lineHeight: 1.8,
      }}
      {...props}
    />
  ),
  li: ({ node, ...props }) => (
    <li
      style={{
        marginBottom: "10px",
        color: "var(--color-body)",
      }}
      {...props}
    />
  ),
  a: ({ node, ...props }) => (
    <a
      style={{
        color: "#7B2FFF",
        textDecoration: "none",
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.target.style.textDecoration = "underline";
        e.target.style.color = "#00FF88";
      }}
      onMouseLeave={(e) => {
        e.target.style.textDecoration = "none";
        e.target.style.color = "#7B2FFF";
      }}
      {...props}
    />
  ),
  img: ({ node, ...props }) => (
    <img
      style={{
        maxWidth: "100%",
        height: "auto",
        margin: "20px 0",
        borderRadius: "8px",
        display: "block",
      }}
      {...props}
    />
  ),
  table: ({ node, ...props }) => (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        margin: "20px 0",
      }}
      {...props}
    />
  ),
  thead: ({ node, ...props }) => <thead {...props} />,
  tbody: ({ node, ...props }) => <tbody {...props} />,
  th: ({ node, ...props }) => (
    <th
      style={{
        border: "1px solid var(--color-border)",
        padding: "12px",
        textAlign: "left",
        background: "var(--background-color-4)",
        color: "var(--color-heading)",
        fontWeight: 600,
      }}
      {...props}
    />
  ),
  td: ({ node, ...props }) => (
    <td
      style={{
        border: "1px solid var(--color-border)",
        padding: "12px",
        textAlign: "left",
        color: "var(--color-body)",
      }}
      {...props}
    />
  ),
  hr: ({ node, ...props }) => (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid var(--color-border)",
        margin: "30px 0",
      }}
      {...props}
    />
  ),
};

export default function SmartContentViewer({ content, contentType = null }) {
  const viewerType = useMemo(() => {
    if (contentType) return contentType;
    return detectContentType(content);
  }, [content, contentType]);

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
    <div
      className={`smart-content-viewer ${viewerType}-content blog-details-discription`}
    >
      {viewerType === "markdown" ? (
        <Markdown components={MarkdownComponents}>{content}</Markdown>
      ) : (
        <div
          className="html-content disc"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
