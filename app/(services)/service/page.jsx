import Pricing from "@/components/common/Pricing";
import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Header5 from "@/components/headers/Header5";
import Services from "@/components/services/Services";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";

export const metadata = {
  title: "Services",
  description:
    "Full stack development services by Md Sabbir Hossain — frontend, backend, database design, cloud deployment, and AI-powered solutions.",
  alternates: { canonical: "/service" },
};

export default function page() {
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
                  <h1 className="title split-collab">Service</h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">Service</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Services />
        <Pricing parentClass="our-price-plan-area tmp-section-gapBottom" />
        <Footer1 />
        <Copyright />
        <CommonComponents />
      </div>
    </>
  );
}
