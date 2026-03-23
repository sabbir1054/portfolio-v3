import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Projects({ isLight = false, items = [] }) {
  const portfolioData = items;

  return (
    <section className="tmp-latest-portfolio tmp-section-gap">
      <div className="container">
        <div className="row">
          {portfolioData.map((item, index) => (
            <div key={item.id || index} className="col-lg-6 col-md-6 col-12">
              <div className="latest-portfolio-card v5 tmp-hover-link">
                <div className="portfoli-card-img">
                  <div className="img-box v2">
                    <Link href={`/project-details/${item.slug}`}>
                      <Image
                        className="img-primary hidden-on-mobile"
                        alt={item.title}
                        src={item.imageSrc || "/assets/images/portfolio/portfolio-01.jpg"}
                        width={item.width || 1920}
                        height={item.height || 1572}
                      />
                      <Image
                        className="img-secondary"
                        alt={item.title}
                        src={item.imageSrc || "/assets/images/portfolio/portfolio-01.jpg"}
                        width={item.width || 1920}
                        height={item.height || 1572}
                      />
                    </Link>
                  </div>
                  <Link
                    href={`/project-details/${item.slug}`}
                    className="img-link-icon"
                  >
                    <i className="fa-solid fa-arrow-up-long" />
                  </Link>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
