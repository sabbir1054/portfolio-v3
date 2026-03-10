import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Header5 from "@/components/headers/Header5";
import ServiceDetails from "@/components/services/ServiceDetails";
import { allServices } from "@/data/services";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";

export const metadata = {
  title:
    "Service Details || Personal Portfolio | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio | Freelancer & Developer Portfolio",
};

export default async function page({ params }) {
  const { slug } = await params;
  const serviceItem =
    allServices.find((item) => item.slug == slug) || allServices[0];
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
                  <h1 className="title split-collab">{serviceItem.title}</h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">Service Details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ServiceDetails serviceItem={serviceItem} />
        <Footer1 />
        <Copyright />
        <CommonComponents />
      </div>
    </>
  );
}
