"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/admin/AuthProvider";
import ImageUpload from "@/components/admin/ImageUpload";
import TagInput from "@/components/admin/TagInput";
import RichTextEditor from "@/components/admin/RichTextEditor";
import Link from "next/link";

export default function NewPortfolio() {
  const { token } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", content: "", imageSrc: "", tags: [], categories: [],
    liveUrl: "", githubUrl: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/portfolios", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/admin/portfolios");
    setSaving(false);
  };

  return (
    <>
      <div className="admin-page-header">
        <div>
          <Link href="/admin/portfolios" className="admin-back-link">
            <i className="fa-solid fa-arrow-left" /> Back to Portfolios
          </Link>
          <h1>New Project</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-grid">
          <div className="admin-form-main">
            <div className="admin-card">
              <div className="admin-card-header"><h3>Project Details</h3></div>
              <div className="admin-card-body">
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Project title" required />
                </div>
                <div className="admin-form-group">
                  <label>Short Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." rows={3} />
                </div>
                <div className="admin-form-group">
                  <label>Content</label>
                  <RichTextEditor
                    value={form.content}
                    onChange={(value) => setForm({ ...form, content: value })}
                  />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Live URL</label>
                    <input type="url" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} placeholder="https://..." />
                  </div>
                  <div className="admin-form-group">
                    <label>GitHub URL</label>
                    <input type="url" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} placeholder="https://github.com/..." />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-form-sidebar">
            <div className="admin-card">
              <div className="admin-card-header"><h3>Project Image</h3></div>
              <div className="admin-card-body">
                <ImageUpload value={form.imageSrc} onChange={(v) => setForm({ ...form, imageSrc: v })} />
              </div>
            </div>
            <div className="admin-card">
              <div className="admin-card-header"><h3>Meta</h3></div>
              <div className="admin-card-body">
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
              {saving ? "Creating..." : "Create Project"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
