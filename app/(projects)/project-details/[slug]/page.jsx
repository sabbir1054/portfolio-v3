import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Header5 from "@/components/headers/Header5";
import ProjectDetails from "@/components/projects/ProjectDetails";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await prisma.portfolio.findUnique({ where: { slug } });
  if (!item) return { title: "Project Not Found" };
  return {
    title: item.title,
    description: item.description || `Project: ${item.title} by Md Sabbir Hossain`,
    alternates: { canonical: `/project-details/${slug}` },
    openGraph: {
      title: item.title,
      description: item.description,
      images: item.imageSrc ? [{ url: item.imageSrc }] : [],
    },
  };
}

export default async function page({ params }) {
  const { slug } = await params;

  const portfolioItem = await prisma.portfolio.findUnique({ where: { slug } });
  if (!portfolioItem) notFound();

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
                  <h1 className="title split-collab">{portfolioItem.title}</h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">Project Details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProjectDetails portfolioItem={portfolioItem} />
        <Footer1 />
        <Copyright />
        <CommonComponents />
      </div>
    </>
  );
}
