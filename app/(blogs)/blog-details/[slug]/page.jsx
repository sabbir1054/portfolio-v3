import BlogDetails from "@/components/blog/BlogDetails";
import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Header5 from "@/components/headers/Header5";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: blog.title,
    description: blog.description || `Blog post: ${blog.title} by Md Sabbir Hossain`,
    alternates: { canonical: `/blog-details/${slug}` },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.description,
      images: blog.imageSrc ? [{ url: blog.imageSrc }] : [],
      authors: [blog.author || "Md Sabbir Hossain"],
    },
  };
}

export default async function page({ params }) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) notFound();

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
