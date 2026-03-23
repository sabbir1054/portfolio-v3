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

export const metadata = {
  title:
    "Project || Personal Portfolio | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio | Freelancer & Developer Portfolio",
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
