import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Header5 from "@/components/headers/Header5";
import ServiceDetails from "@/components/services/ServiceDetails";
import { allServices } from "@/data/services";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";

const SITE_URL = "https://mdsabbir.dev";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const serviceItem = allServices.find((item) => item.slug == slug);

  if (!serviceItem) {
    return { title: "Service Not Found" };
  }

  const imageUrl = `${SITE_URL}/assets/images/banner/banner-user-image-04.png`;
  const serviceDescription = serviceItem?.description || `Professional ${serviceItem?.title} services by Md Sabbir Hossain.`;

  return {
    title: serviceItem.title,
    description: serviceDescription,
    alternates: { canonical: `/service-details/${slug}` },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${SITE_URL}/service-details/${slug}`,
      siteName: "mdsabbir.dev",
      title: `${serviceItem.title} | Md Sabbir Hossain`,
      description: serviceDescription,
      images: [
        {
          url: imageUrl,
          width: 525,
          height: 525,
          alt: `${serviceItem.title} - Md Sabbir Hossain`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${serviceItem.title} | Md Sabbir Hossain`,
      description: serviceDescription,
      images: [imageUrl],
    },
  };
}

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
