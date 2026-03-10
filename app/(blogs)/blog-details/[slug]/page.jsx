import BlogDetails from "@/components/blog/BlogDetails";
import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Header5 from "@/components/headers/Header5";
import { allBlogs } from "@/data/blogs";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";

export const metadata = {
  title:
    "Blog Details || Personal Portfolio | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio | Freelancer & Developer Portfolio",
};

export default async function page({ params }) {
  const { slug } = await params;
  const blog = allBlogs.find((blog) => blog.slug == slug) || allBlogs[0];
  return (
    <>
      <Header3 />
      <Header5 />
      <div className="page-with-left-header">
        <div className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h1 className="title split-collab">{blog.title}</h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">Blog Details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BlogDetails blog={blog} />
        <Footer1 />
        <Copyright />
        <CommonComponents />
      </div>
    </>
  );
}
