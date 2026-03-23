import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Portfolio({ isLight = false, items = [] }) {
  const portfolioData = items;

  return (
    <div
      className="latest-portfolio-area custom-column-grid tmp-section-gapTop"
      id="portfolio"
    >
      <div className="container">
        <div className="section-head mb--60">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Latest Portfolio</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Transforming Ideas into <br />
            Exceptional
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            A curated selection of my recent projects showcasing full stack
            development, from responsive frontends to scalable backend systems.
          </p>
        </div>
        <div className="row">
          {portfolioData.map((item, index) => (
            <div className="col-lg-6 col-sm-6" key={item.id || index}>
              <div
                className={`latest-portfolio-card tmp-hover-link tmp-scroll-trigger tmp-fade-in animation-order-${index + 1}`}
              >
                <div className="portfoli-card-img">
                  <div className="img-box v2">
                    <Link
                      className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                      href={`/project-details/${item.slug}`}
                    >
                      {item.imageSrc ? (
                        <Image
                          className="w-100"
                          alt={item.title || "Thumbnail"}
                          src={item.imageSrc}
                          width={item.width || 1920}
                          height={item.height || 1572}
                        />
                      ) : (
                        <div className="w-100" style={{ background: "var(--background-color-4)", aspectRatio: "16/9", borderRadius: "8px" }} />
                      )}
                    </Link>
                  </div>
                </div>
                <div className="portfolio-card-content-wrap">
                  <div className="content-left">
                    <h3 className="portfolio-card-title">
                      <Link
                        className="link"
                        href={`/project-details/${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="portfoli-card-para">{item.description}</p>
                  </div>
                  <Link
                    href={`/project-details/${item.slug}`}
                    className="tmp-arrow-icon-btn"
                  >
                    <div className="btn-inner">
                      <i className="tmp-icon fa-solid fa-arrow-up-right" />
                      <i className="tmp-icon-bottom fa-solid fa-arrow-up-right" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt--50">
          <Link href="/project" className="tmp-btn hover-icon-reverse radius-round">
            <span>All Portfolio</span>
            <span className="icon">
              <i className="fa-solid fa-arrow-right" />
              <i className="fa-solid fa-arrow-right" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
