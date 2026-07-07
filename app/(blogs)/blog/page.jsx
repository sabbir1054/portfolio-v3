import Blogs from "@/components/blog/Blogs";
import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Header5 from "@/components/headers/Header5";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";
import { getBlogs } from "@/lib/db";

export const dynamic = "force-dynamic";

const SITE_URL = "https://mdsabbir.dev";

export const metadata = {
  title: "Blog",
  description:
    "Technical articles and insights by Md Sabbir Hossain — Penetration Tester | Software Engineer | Full Stack Developer | Cyber Security Researcher | DevOps | Freelancer — on full stack development, React, Next.js, Node.js, DevOps, and cyber security.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/blog`,
    siteName: "mdsabbir.dev",
    title: "Blog | Md Sabbir Hossain's Technical Insights",
    description:
      "Explore technical articles on full stack development, penetration testing, React, Next.js, Node.js, DevOps, database design, and cybersecurity research.",
    images: [
      {
        url: `${SITE_URL}/assets/images/banner/banner-user-image-04.png`,
        width: 525,
        height: 525,
        alt: "Md Sabbir Hossain - Penetration Tester & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Md Sabbir Hossain's Technical Insights",
    description:
      "Read my technical articles on full stack development, penetration testing, React, Next.js, Node.js, DevOps, and more.",
    images: [`${SITE_URL}/assets/images/banner/banner-user-image-04.png`],
  },
};

export default async function page() {
  const blogs = await getBlogs();

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
                  <h1 className="title split-collab">All Blogs</h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">Blog</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Blogs allBlogs={blogs} />
        <Footer1 />
        <Copyright />
        <CommonComponents />
      </div>
    </>
  );
}
