import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Header5 from "@/components/headers/Header5";
import Projects from "@/components/projects/Projects";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";
import { getPortfolios } from "@/lib/db";

export const dynamic = "force-dynamic";

const SITE_URL = "https://mdsabbir.dev";

export const metadata = {
  title: "Projects",
  description:
    "Browse projects by Md Sabbir Hossain — Penetration Tester | Software Engineer | Full Stack Developer | Cyber Security Researcher | DevOps | Freelancer — full stack web applications, management systems, e-commerce platforms, and AI-powered solutions.",
  alternates: { canonical: "/project" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/project`,
    siteName: "mdsabbir.dev",
    title: "Projects | Md Sabbir Hossain's Portfolio",
    description:
      "Explore my full stack web applications, security-focused projects, management systems, e-commerce platforms, and AI-powered solutions built with React, Next.js, and Node.js.",
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
    title: "Projects | Md Sabbir Hossain's Portfolio",
    description:
      "Check out my portfolio of web applications, penetration testing, and development projects.",
    images: [`${SITE_URL}/assets/images/banner/banner-user-image-04.png`],
  },
};

export default async function page() {
  const portfolios = await getPortfolios();

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
                  <h1 className="title split-collab">All Projects</h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">Project</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Projects items={portfolios} />
        <Footer1 />
        <Copyright />
        <CommonComponents />
      </div>
    </>
  );
}
