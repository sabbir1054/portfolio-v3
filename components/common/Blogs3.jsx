import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Blogs3({
  parentClass = "blog-and-news-are tmp-section-gap",
  isLight = false,
  items = [],
}) {
  const blogData = items;

  return (
    <section className={parentClass} id="blog">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Blog and news</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Latest Articles &amp; <br /> Technical Insights
          </h2>
        </div>
        <div className="row">
          {blogData.map((blog, index) => (
            <div key={blog.id || index} className="col-lg-4 col-md-6 col-sm-6">
              <div
                className={`blog-card tmp-hover-link tmp-scroll-trigger tmp-fade-in animation-order-${index + 1}`}
              >
                {blog.imageSrc && (
                  <div className="img-box">
                    <Link href={`/blog-details/${blog.slug}`}>
                      <Image
                        className="img-primary hidden-on-mobile"
                        alt={blog.title || "Blog"}
                        width={410}
                        height={294}
                        src={blog.imageSrc}
                      />
                      <Image
                        className="img-secondary"
                        alt={blog.title || "Blog"}
                        width={410}
                        height={294}
                        src={blog.imageSrc}
                      />
                    </Link>
                    <ul className="blog-tags">
                      <li>
                        <span className="tag-icon">
                          <i className="fa-regular fa-user" />
                        </span>
                        {blog.author || "Sabbir"}
                      </li>
                      <li>
                        <span className="tag-icon">
                          <i className="fa-solid fa-calendar-days" />
                        </span>
                        {blog.date || new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </li>
                    </ul>
                  </div>
                )}
                <div className="blog-content-wrap">
                  <h3 className="blog-title v2">
                    <Link className="link" href={`/blog-details/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>
                  <Link
                    href={`/blog-details/${blog.slug}`}
                    className="read-more-btn v2"
                  >
                    Read More{" "}
                    <span className="read-more-icon">
                      <i className="fa-solid fa-angle-right" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt--50">
          <Link href="/blog" className="tmp-btn hover-icon-reverse radius-round">
            <span>All Blogs</span>
            <span className="icon">
              <i className="fa-solid fa-arrow-right" />
              <i className="fa-solid fa-arrow-right" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
