import Blogs3 from "@/components/common/Blogs3";
import CommonComponents from "@/components/common/CommonComponents";
import Education from "@/components/common/Education2";
import Portfolio from "@/components/common/Portfolio2";
import Header3 from "@/components/headers/Header3";
import Contact from "@/components/common/Contact2";
import Hero from "@/components/homes/home-12/Hero";
import Services from "@/components/common/Services6";
import React from "react";
import Footer1 from "@/components/footers/Footer1";
import Copyright from "@/components/footers/Copyright";
import Header5 from "@/components/headers/Header5";
import { getPortfolios, getBlogs } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default async function Home() {
  const [portfolios, blogs] = await Promise.all([
    getPortfolios(),
    getBlogs(),
  ]);

  return (
    <>
      <Header3 />
      <Header5 />
      <div className="page-with-left-header">
        <Hero />
        <Services parentClass="latest-service-area pt--40" />
        <Portfolio items={portfolios.slice(0, 4)} />
        <Education />
        <Blogs3
          parentClass="blog-and-news-are tmp-section-gapTop"
          items={blogs.slice(0, 3)}
        />
        <Contact parentClass="get-in-touch-area tmp-section-gap" />
        <Footer1 />
        <Copyright /> <CommonComponents />
      </div>
    </>
  );
}
