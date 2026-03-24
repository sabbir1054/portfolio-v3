import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogSidebar from "./BlogSidebar";
import ShareButtons from "./ShareButtons";
import { slugify } from "@/utlis/slugify";

export default function BlogDetails({ blog, isLight = false }) {
  const blogTags = Array.isArray(blog.tags) ? blog.tags : [];
  const categories = Array.isArray(blog.categories) ? blog.categories : [];

  return (
    <div className="blog-classic-area-wrapper tmp-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="blog-details-left-area">
              {blog.imageSrc && (
                <div className="thumbnail-top">
                  <Image
                    alt={blog.title}
                    src={blog.imageSrc}
                    width={850}
                    height={440}
                  />
                </div>
              )}
              <div className="blog-details-discription">
                <div className="blog-classic-tag">
                  <h4 className="title">By {blog.author || "Sabbir"}</h4>
                  <ul>
                    {categories.length > 0 && (
                      <li>
                        <div className="tag-wrap">
                          <i className="fa-solid fa-tag" />
                          <h4 className="tag-title">{categories[0]}</h4>
                        </div>
                      </li>
                    )}
                    <li>
                      <div className="tag-wrap">
                        <i className="fa-solid fa-calendar-day" />
                        <h4 className="tag-title">
                          {blog.date ||
                            new Date(blog.createdAt).toLocaleDateString(
                              "en-US",
                              { month: "long", day: "numeric", year: "numeric" }
                            )}
                        </h4>
                      </div>
                    </li>
                  </ul>
                </div>
                <h3 className="title split-collab">{blog.title}</h3>
                {blog.content ? (
                  <div
                    className="disc"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                ) : (
                  <p className="disc">{blog.description}</p>
                )}
              </div>

              <div className="blog-details-discription">
                <div className="blog-details-navigation">
                  {blogTags.length > 0 && (
                    <div className="navigation-tags">
                      <h3 className="tag-title">Tags:</h3>
                      <ul>
                        {blogTags.map((tag, index) => (
                          <li key={index}>
                            <p className="tag">
                              <Link href={`/blog/tag/${slugify(tag)}`}>
                                {tag}
                              </Link>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <ShareButtons title={blog.title} slug={blog.slug} />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <BlogSidebar isLight={isLight} />
          </div>
        </div>
      </div>
    </div>
  );
}
