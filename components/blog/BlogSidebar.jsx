"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { slugify } from "@/utlis/slugify";

export default function BlogSidebar({ isLight = false }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
      })
      .catch(() => {});
  }, []);

  // Extract unique categories and tags from DB blogs
  const categoryMap = {};
  const tagSet = new Set();
  blogs.forEach((blog) => {
    (Array.isArray(blog.categories) ? blog.categories : []).forEach((cat) => {
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });
    (Array.isArray(blog.tags) ? blog.tags : []).forEach((tag) => {
      tagSet.add(tag);
    });
  });

  const recentPosts = blogs.slice(0, 3);

  return (
    <div className="tmp-sidebar">
      {Object.keys(categoryMap).length > 0 && (
        <div className="signle-side-bar recent-post-area tmponhover">
          <div className="header">
            <h3 className="title">Category</h3>
          </div>
          <div className="body">
            {Object.entries(categoryMap).map(([cat, count], index) => (
              <Link
                href={`/blog/category/${slugify(cat)}`}
                className="single-post"
                key={index}
              >
                <span className="single-post-left">
                  <i className="fa-solid fa-arrow-right" />
                  <span className="post-title">{cat}</span>
                </span>
                <span className="post-num">({count})</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {recentPosts.length > 0 && (
        <div className="signle-side-bar recent-post-area tmponhover">
          <div className="header">
            <h3 className="title">Recent Post</h3>
          </div>
          <div className="body">
            {recentPosts.map((post) => (
              <div key={post.id} className="single-post-card tmp-hover-link">
                {post.imageSrc && (
                  <div className="single-post-card-img">
                    <Image alt={post.title} src={post.imageSrc} width={82} height={92} />
                  </div>
                )}
                <div className="single-post-right">
                  <div className="single-post-top">
                    <i className="fa-regular fa-folder-open" />
                    <p className="post-title">
                      {(Array.isArray(post.categories) && post.categories[0]) || "Blog"}
                    </p>
                  </div>
                  <h3 className="post-title">
                    <Link className="link" href={`/blog-details/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="signle-side-bar tmponhover">
        <div className="header">
          <h3 className="title">About Me</h3>
        </div>
        <div className="body">
          <div className="about-me-details">
            <div className="about-me-details-head">
              <div className="about-me-img">
                <Image
                  alt="Md Sabbir Hossain"
                  src="/assets/images/banner/banner-user-image-04.png"
                  width={600}
                  height={600}
                />
              </div>
              <div className="about-me-right-content">
                <h3 className="title">Md Sabbir Hossain</h3>
                <p className="para">Full Stack Developer</p>
                <div className="social-link">
                  <a href="https://github.com/sabbir1054" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github" />
                  </a>
                  <a href="https://www.linkedin.com/in/md-sabbir-hossain-1054" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                  <a href="https://www.upwork.com/freelancers/~01a76df77f79bd0eaa" target="_blank" rel="noopener noreferrer">
                    <span className="upwork-icon">UP</span>
                  </a>
                  <a href="https://www.facebook.com/sabbir.1054" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook-f" />
                  </a>
                </div>
              </div>
            </div>
            <p className="about-me-para">
              Full Stack Developer specializing in React, Next.js, Node.js, and
              cloud technologies. Building scalable web applications with modern
              tech stacks.
            </p>
          </div>
        </div>
      </div>

      {tagSet.size > 0 && (
        <div className="signle-side-bar tmponhover">
          <div className="header">
            <h3 className="title">Tags</h3>
          </div>
          <div className="body">
            <div className="tags-wrapper">
              {[...tagSet].map((tag, index) => (
                <Link
                  href={`/blog/tag/${slugify(tag)}`}
                  className="tag-link"
                  key={index}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
