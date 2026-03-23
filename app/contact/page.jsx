import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Header5 from "@/components/headers/Header5";
import Contact from "@/components/others/Contact";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Md Sabbir Hossain for full stack development projects, freelance work, or collaboration. Based in Dhaka, Bangladesh.",
  alternates: { canonical: "/contact" },
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
                  <h1 className="title split-collab">Contact</h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">Contact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Contact />
        <Footer1 />
        <Copyright />
        <CommonComponents />
      </div>
    </>
  );
}
