"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ShareButtons({ title, slug }) {
  const [copied, setCopied] = useState(false);
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://mdsabbir.dev";
  const postUrl = `${siteUrl}/blog-details/${slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Facebook",
      icon: "fa-brands fa-facebook-f",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "#1877F2",
    },
    {
      name: "LinkedIn",
      icon: "fa-brands fa-linkedin-in",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "#0A66C2",
    },
    {
      name: "X (Twitter)",
      icon: "fa-brands fa-x-twitter",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "#000000",
    },
    {
      name: "WhatsApp",
      icon: "fa-brands fa-whatsapp",
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "#25D366",
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="blog-share-section">
      <h4 className="share-title">
        <i className="fa-solid fa-share-nodes" /> Share this article
      </h4>
      <div className="share-buttons">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
            title={`Share on ${link.name}`}
          >
            <i className={link.icon} />
            <span>{link.name}</span>
          </a>
        ))}
        <button
          onClick={copyLink}
          className="share-btn copy-btn"
          title="Copy link"
        >
          <i className={copied ? "fa-solid fa-check" : "fa-solid fa-link"} />
          <span>{copied ? "Copied!" : "Copy Link"}</span>
        </button>
      </div>
    </div>
  );
}
