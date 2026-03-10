"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/admin/AuthProvider";

export default function AdminBlogs() {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = () => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      });
  };

  useEffect(() => { fetchBlogs(); }, []);

  const deleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBlogs();
  };

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1>Blog Posts</h1>
          <p>{blogs.length} total posts</p>
        </div>
        <Link href="/admin/blogs/new" className="admin-btn admin-btn-primary">
          <i className="fa-solid fa-plus" /> New Post
        </Link>
      </div>

      {loading ? (
        <div className="admin-loading-inline"><div className="admin-spinner" /></div>
      ) : blogs.length === 0 ? (
        <div className="admin-empty-state">
          <i className="fa-solid fa-newspaper" />
          <h3>No blog posts yet</h3>
          <p>Create your first blog post to get started.</p>
          <Link href="/admin/blogs/new" className="admin-btn admin-btn-primary">
            Create Post
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <div className="admin-table-img">
                      {blog.imageSrc ? (
                        <Image src={blog.imageSrc} alt="" width={60} height={40} style={{ objectFit: "cover" }} />
                      ) : (
                        <div className="admin-table-img-placeholder">
                          <i className="fa-solid fa-image" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td><span className="admin-table-title">{blog.title}</span></td>
                  <td>{blog.author}</td>
                  <td>{blog.date}</td>
                  <td>
                    <div className="admin-table-tags">
                      {blog.tags?.slice(0, 2).map((t, i) => (
                        <span key={i} className="admin-tag small">{t}</span>
                      ))}
                      {blog.tags?.length > 2 && <span className="admin-tag small">+{blog.tags.length - 2}</span>}
                    </div>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Link href={`/admin/blogs/${blog.id}`} className="admin-btn-icon" title="Edit">
                        <i className="fa-solid fa-pen" />
                      </Link>
                      <button onClick={() => deleteBlog(blog.id)} className="admin-btn-icon danger" title="Delete">
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
