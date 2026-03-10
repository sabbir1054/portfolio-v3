"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/admin/AuthProvider";

export default function AdminPortfolios() {
  const { token } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolios = () => {
    fetch("/api/portfolios")
      .then((r) => r.json())
      .then((data) => {
        setPortfolios(data);
        setLoading(false);
      });
  };

  useEffect(() => { fetchPortfolios(); }, []);

  const deletePortfolio = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await fetch(`/api/portfolios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPortfolios();
  };

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1>Portfolio Projects</h1>
          <p>{portfolios.length} total projects</p>
        </div>
        <Link href="/admin/portfolios/new" className="admin-btn admin-btn-primary">
          <i className="fa-solid fa-plus" /> New Project
        </Link>
      </div>

      {loading ? (
        <div className="admin-loading-inline"><div className="admin-spinner" /></div>
      ) : portfolios.length === 0 ? (
        <div className="admin-empty-state">
          <i className="fa-solid fa-briefcase" />
          <h3>No projects yet</h3>
          <p>Add your first portfolio project.</p>
          <Link href="/admin/portfolios/new" className="admin-btn admin-btn-primary">
            Add Project
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolios.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="admin-table-img">
                      {item.imageSrc ? (
                        <Image src={item.imageSrc} alt="" width={60} height={40} style={{ objectFit: "cover" }} />
                      ) : (
                        <div className="admin-table-img-placeholder">
                          <i className="fa-solid fa-image" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td><span className="admin-table-title">{item.title}</span></td>
                  <td><span className="admin-table-desc">{item.description}</span></td>
                  <td>
                    <div className="admin-table-tags">
                      {item.tags?.slice(0, 2).map((t, i) => (
                        <span key={i} className="admin-tag small">{t}</span>
                      ))}
                      {item.tags?.length > 2 && <span className="admin-tag small">+{item.tags.length - 2}</span>}
                    </div>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Link href={`/admin/portfolios/${item.id}`} className="admin-btn-icon" title="Edit">
                        <i className="fa-solid fa-pen" />
                      </Link>
                      <button onClick={() => deletePortfolio(item.id)} className="admin-btn-icon danger" title="Delete">
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
