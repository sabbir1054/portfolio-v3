"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blogs: 0, portfolios: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/blogs").then((r) => r.json()),
      fetch("/api/portfolios").then((r) => r.json()),
    ]).then(([blogs, portfolios]) => {
      setStats({ blogs: blogs.length, portfolios: portfolios.length });
    });
  }, []);

  return (
    <>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Welcome back. Manage your portfolio content.</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon purple">
            <i className="fa-solid fa-newspaper" />
          </div>
          <div className="admin-stat-info">
            <h3>{stats.blogs}</h3>
            <p>Blog Posts</p>
          </div>
          <Link href="/admin/blogs" className="admin-stat-link">
            Manage <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon green">
            <i className="fa-solid fa-briefcase" />
          </div>
          <div className="admin-stat-info">
            <h3>{stats.portfolios}</h3>
            <p>Portfolio Projects</p>
          </div>
          <Link href="/admin/portfolios" className="admin-stat-link">
            Manage <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>

      <div className="admin-quick-actions">
        <h2>Quick Actions</h2>
        <div className="admin-actions-grid">
          <Link href="/admin/blogs/new" className="admin-action-card">
            <i className="fa-solid fa-plus" />
            <span>New Blog Post</span>
          </Link>
          <Link href="/admin/portfolios/new" className="admin-action-card">
            <i className="fa-solid fa-plus" />
            <span>New Project</span>
          </Link>
          <Link href="/" className="admin-action-card" target="_blank">
            <i className="fa-solid fa-eye" />
            <span>View Site</span>
          </Link>
        </div>
      </div>
    </>
  );
}
