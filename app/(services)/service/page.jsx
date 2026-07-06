import Pricing from "@/components/common/Pricing";
import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Header5 from "@/components/headers/Header5";
import Services from "@/components/services/Services";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";

const SITE_URL = "https://mdsabbir.dev";

export const metadata = {
  title: "Services",
  description:
    "Full stack development services by Md Sabbir Hossain — frontend, backend, database design, cloud deployment, and AI-powered solutions.",
  alternates: { canonical: "/service" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/service`,
    siteName: "mdsabbir.dev",
    title: "Services | Md Sabbir Hossain's Development Services",
    description:
      "Comprehensive full stack development services: frontend, backend, database design, cloud deployment, AI integration, and full stack consulting.",
    images: [
      {
        url: "/assets/images/banner/banner-user-image-04.png",
        width: 525,
        height: 525,
        alt: "Md Sabbir Hossain - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Md Sabbir Hossain's Development Services",
    description:
      "Full stack development services including frontend, backend, database design, cloud deployment, and AI solutions.",
    images: ["/assets/images/banner/banner-user-image-04.png"],
  },
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
