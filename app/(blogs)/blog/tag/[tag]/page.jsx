import Blogs from "@/components/blog/Blogs";
import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Header5 from "@/components/headers/Header5";
import { allBlogs } from "@/data/blogs";
import { slugify } from "@/utlis/slugify";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";

const SITE_URL = "https://mdsabbir.dev";

export async function generateMetadata({ params }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  let tagTitle = "";

  allBlogs[0]?.tags?.forEach((element) => {
    if (slugify(element) == tag) {
      tagTitle = element;
    }
  });

  const displayTitle = tagTitle || decodedTag;
  const description = `Blog articles tagged with ${displayTitle} by Md Sabbir Hossain`;

  return {
    title: `${displayTitle} - Blog Tag`,
    description,
    alternates: { canonical: `/blog/tag/${tag}` },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${SITE_URL}/blog/tag/${tag}`,
      siteName: "mdsabbir.dev",
      title: `${displayTitle} - Blog | Md Sabbir Hossain`,
      description,
      images: [
        {
          url: `${SITE_URL}/assets/images/banner/banner-user-image-04.png`,
          width: 525,
          height: 525,
          alt: `${displayTitle} - Md Sabbir Hossain's Blog`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayTitle} - Blog | Md Sabbir Hossain`,
      description,
      images: [`${SITE_URL}/assets/images/banner/banner-user-image-04.png`],
    },
  };
}

export default async function TagPage({ params }) {
  let tagTitle = "";
  const { tag } = await params;
  const blogs = allBlogs.filter((blog) =>
    blog.tags?.some((el) => slugify(el) == tag)
  );
  allBlogs[0].tags.forEach((element) => {
    if (slugify(element) == tag) {
      tagTitle = element;
    }
  });
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
                  <h1 className="title split-collab">
                    {tagTitle ? tagTitle : <> {tag}</>}
                  </h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item">Blog</li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">Tag</li>
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
