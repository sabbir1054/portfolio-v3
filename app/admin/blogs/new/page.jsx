"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/admin/AuthProvider";
import ImageUpload from "@/components/admin/ImageUpload";
import TagInput from "@/components/admin/TagInput";
import DualModeEditor from "@/components/admin/DualModeEditor";
import Link from "next/link";

export default function NewBlog() {
  const { token } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    imageSrc: "",
    author: "",
    tags: [],
    categories: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/admin/blogs");
    setSaving(false);
  };

  return (
    <>
      <div className="admin-page-header">
        <div>
          <Link href="/admin/blogs" className="admin-back-link">
            <i className="fa-solid fa-arrow-left" /> Back to Blogs
          </Link>
          <h1>New Blog Post</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-grid">
          <div className="admin-form-main">
            <div className="admin-card">
              <div className="admin-card-header"><h3>Post Details</h3></div>
              <div className="admin-card-body">
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter blog title"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Short description..."
                    rows={3}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Content</label>
                  <DualModeEditor
                    value={form.content}
                    onChange={(value) => setForm({ ...form, content: value })}
                  />
                  <small style={{ marginTop: "8px", display: "block", color: "#666" }}>
                    💡 Tip: Use the rich text editor to add formatting, tables, YouTube videos, and images.
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-form-sidebar">
            <div className="admin-card">
              <div className="admin-card-header"><h3>Featured Image</h3></div>
              <div className="admin-card-body">
                <ImageUpload value={form.imageSrc} onChange={(v) => setForm({ ...form, imageSrc: v })} />
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-header"><h3>Meta</h3></div>
              <div className="admin-card-body">
                <div className="admin-form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="Author name"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Tags</label>
                  <TagInput value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} placeholder="Add tag..." />
                </div>
                <div className="admin-form-group">
                  <label>Categories</label>
                  <TagInput value={form.categories} onChange={(v) => setForm({ ...form, categories: v })} placeholder="Add category..." />
                </div>
              </div>
            </div>

            <button type="submit" className="admin-btn admin-btn-primary admin-btn-full" disabled={saving}>
              {saving ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
