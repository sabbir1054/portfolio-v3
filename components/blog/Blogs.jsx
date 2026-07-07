"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlogSidebar from "./BlogSidebar";

import Link from "next/link";

const BLOGS_PER_PAGE = 3;

export default function Blogs({ allBlogs = [], isLight = false }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(allBlogs.length / BLOGS_PER_PAGE));

  useEffect(() => {
    setCurrentPage(1);
  }, [allBlogs]);

  const paginatedBlogs = allBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="blog-classic-area-wrapper tmp-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {paginatedBlogs.map((blog, i) => (
              <div
                key={i}
                className={`blog-classic-card tmp-scroll-trigger tmponhover tmp-fade-in ${
                  i + 1
                }`}
              >
                {blog.imageSrc && (
                  <div className="img-box">
                    <Link
                      href={`/blog-details${isLight ? "-white" : ""}/${
                        blog.slug
                      }`}
                    >
                      <Image
                        className="img-primary hidden-on-mobile"
                        alt={blog.title || "Blog"}
                        src={blog.imageSrc}
                        width={850}
                        height={462}
                      />
                      <Image
                        className="img-secondary"
                        alt={blog.title || "Blog"}
                        src={blog.imageSrc}
                        width={850}
                        height={462}
                      />
                    </Link>
                  </div>
                )}
                <div className="blog-classic-content">
                  <div className="blog-classic-tag">
                    <ul>
                      <li>
                        <div className="tag-wrap">
                          <i className="fa-solid fa-tag" />
                          <h4 className="tag-title">Web design</h4>
                        </div>
                      </li>
                      <li>
                        <div className="tag-wrap">
                          <i className="fa-regular fa-comment" />
                          <h4 className="tag-title">Comments (05)</h4>
                        </div>
                      </li>
                      <li>
                        <div className="tag-wrap">
                          <i className="fa-solid fa-calendar-day" />
                          <h4 className="tag-title">Comments (05)</h4>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <h2 className="title">
                    <Link
                      href={`/blog-details${isLight ? "-white" : ""}/${
                        blog.slug
                      }`}
                    >
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="para">{blog.description}</p>
                  <div className="tmp-button-here">
                    <Link
                      className="tmp-btn hover-icon-reverse radius-round btn-border btn-md"
                      href={`/blog-details${isLight ? "-white" : ""}/${
                        blog.slug
                      }`}
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Read More</span>
                        <span className="btn-icon">
                          <i className="fa-sharp fa-regular fa-arrow-right" />
                        </span>
                        <span className="btn-icon">
                          <i className="fa-sharp fa-regular fa-arrow-right" />
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {allBlogs.length ? (
              totalPages > 1 && (
                <div className="tmp-pagination-button">
                  <a
                    href="#"
                    className={`pagination-btn ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(currentPage - 1);
                    }}
                  >
                    <i className="fa-sharp fa-regular fa-arrow-left" />
                  </a>
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                    (page) => (
                      <a
                        key={page}
                        href="#"
                        className={`pagination-btn ${
                          currentPage === page ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(page);
                        }}
                      >
                        {page}
                      </a>
                    )
                  )}
                  <a
                    href="#"
                    className={`pagination-btn ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(currentPage + 1);
                    }}
                  >
                    <i className="fa-sharp fa-regular fa-arrow-right" />
                  </a>
                </div>
              )
            ) : (
              <h3 className="text-center">No Blogs Found</h3>
            )}
          </div>
          <div className="col-lg-4">
            <BlogSidebar isLight={isLight} />
          </div>
        </div>
      </div>
    </div>
  );
}
