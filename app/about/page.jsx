import Contact from "@/components/common/Contact2";
import Education from "@/components/common/Education";
import Facts from "@/components/common/Facts";
import Pricing from "@/components/common/Pricing";
import Services from "@/components/common/Services";
import Skills from "@/components/common/Skills";
import Footer1 from "@/components/footers/Footer1";
import Copyright from "@/components/footers/Copyright";
import Header3 from "@/components/headers/Header3";
import Header5 from "@/components/headers/Header5";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";

const SITE_URL = "https://mdsabbir.dev";

export const metadata = {
  title: "About Me",
  description:
    "Learn about Md Sabbir Hossain — Full Stack Developer with expertise in React, Next.js, Node.js, and Cyber Security. B.Sc. in Software Engineering from Daffodil International University.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/about`,
    siteName: "mdsabbir.dev",
    title: "About Md Sabbir Hossain | Full Stack Developer",
    description:
      "Discover my journey as a Full Stack Developer specializing in React, Next.js, Node.js, cloud technologies, and cybersecurity research.",
    images: [
      {
        url: `${SITE_URL}/assets/images/banner/banner-user-image-04.png`,
        width: 525,
        height: 525,
        alt: "Md Sabbir Hossain - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Md Sabbir Hossain | Full Stack Developer",
    description:
      "Learn about my expertise in full stack development, cloud deployment, and cybersecurity research.",
    images: [`${SITE_URL}/assets/images/banner/banner-user-image-04.png`],
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
                  <h1 className="title split-collab">About Me</h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">About Me</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Services />
        <Skills parentClass="tmp-skill-area tmp-section-gapBottom" />
        <Facts />
        <Education />
        <Pricing />
        <Contact parentClass="get-in-touch-area tmp-section-gapBottom tmp-section-gapTop" />
        <Footer1 />
        <Copyright />
        <CommonComponents />
      </div>
    </>
  );
}
