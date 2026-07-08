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
    <div
      className="blog-details-discription html-content disc"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
