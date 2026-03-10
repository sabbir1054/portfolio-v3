"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import LoginForm from "./LoginForm";

export default function AdminLayout({ children }) {
  const { token, logout, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
      </div>
    );
  }

  if (!token) return <LoginForm />;

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "fa-solid fa-grid-2" },
    { href: "/admin/blogs", label: "Blogs", icon: "fa-solid fa-newspaper" },
    { href: "/admin/portfolios", label: "Portfolios", icon: "fa-solid fa-briefcase" },
  ];

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link href="/admin" className="admin-logo">
            <span className="logo-icon">S</span>
            <span className="logo-text">Admin Panel</span>
          </Link>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${pathname === item.href ? "active" : ""}`}
            >
              <i className={item.icon} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-nav-item" target="_blank">
            <i className="fa-solid fa-arrow-up-right-from-square" />
            <span>View Site</span>
          </Link>
          <button onClick={logout} className="admin-nav-item admin-logout-btn">
            <i className="fa-solid fa-right-from-bracket" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
