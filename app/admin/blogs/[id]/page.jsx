"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/components/admin/AuthProvider";
import ImageUpload from "@/components/admin/ImageUpload";
import TagInput from "@/components/admin/TagInput";
import Link from "next/link";

export default function EditBlog() {
  const { token } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "", description: "", content: "", imageSrc: "", author: "", tags: [], categories: [],
  });

  useEffect(() => {
    fetch(`/api/blogs/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setForm(data);
        setLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/blogs/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/admin/blogs");
    setSaving(false);
  };

  if (loading) return <div className="admin-loading-inline"><div className="admin-spinner" /></div>;

  return (
    <>
      <div className="admin-page-header">
        <div>
          <Link href="/admin/blogs" className="admin-back-link">
            <i className="fa-solid fa-arrow-left" /> Back to Blogs
          </Link>
          <h1>Edit Blog Post</h1>
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
                  <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
                </div>
                <div className="admin-form-group">
                  <label>Content</label>
                  <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} />
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
                  <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
                </div>
                <div className="admin-form-group">
                  <label>Tags</label>
                  <TagInput value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} />
                </div>
                <div className="admin-form-group">
                  <label>Categories</label>
                  <TagInput value={form.categories} onChange={(v) => setForm({ ...form, categories: v })} />
                </div>
              </div>
            </div>
            <button type="submit" className="admin-btn admin-btn-primary admin-btn-full" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
