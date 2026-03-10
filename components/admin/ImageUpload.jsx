"use client";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import Image from "next/image";

export default function ImageUpload({ value, onChange }) {
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setUploading(false);
  };

  return (
    <div className="admin-image-upload">
      {value && (
        <div className="admin-image-preview">
          <Image src={value} alt="Preview" width={300} height={200} style={{ objectFit: "cover" }} />
          <button type="button" className="admin-remove-img" onClick={() => onChange("")}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      )}
      <div
        className={`admin-upload-zone ${dragOver ? "drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleUpload(e.dataTransfer.files[0]);
        }}
      >
        {uploading ? (
          <div className="admin-upload-loading">
            <div className="admin-spinner small" />
            <span>Uploading...</span>
          </div>
        ) : (
          <>
            <i className="fa-solid fa-cloud-arrow-up" />
            <p>Drag & drop or click to upload</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e.target.files[0])}
            />
          </>
        )}
      </div>
      <div className="admin-form-group" style={{ marginTop: "8px" }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL..."
          className="admin-input-sm"
        />
      </div>
    </div>
  );
}
