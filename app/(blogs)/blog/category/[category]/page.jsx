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

export const metadata = {
  title:
    "Blog || Personal Portfolio | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio | Freelancer & Developer Portfolio",
};

export default async function CategoryPage({ params }) {
  let categoryTitle = "";
  const { category } = await params;
  const blogs = allBlogs.filter((blog) =>
    blog.categories?.some((el) => slugify(el) == category)
  );
  allBlogs[0].categories.forEach((element) => {
    if (slugify(element) == category) {
      categoryTitle = element;
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
                    {categoryTitle ? categoryTitle : <> {category}</>}
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
                    <li className="tmp-breadcrumb-item active">Category</li>
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
