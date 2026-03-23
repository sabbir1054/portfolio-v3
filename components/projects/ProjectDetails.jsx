import React from "react";
import Image from "next/image";
import Appointment from "./Appointment";

export default function ProjectDetails({ portfolioItem }) {
  const tags = Array.isArray(portfolioItem.tags) ? portfolioItem.tags : [];
  const categories = Array.isArray(portfolioItem.categories) ? portfolioItem.categories : [];

  return (
    <div className="project-details-area-wrapper tmp-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {portfolioItem.imageSrc && (
              <div className="project-details-thumnail-wrap">
                <Image
                  alt={portfolioItem.title}
                  src={portfolioItem.imageSrc}
                  width={1290}
                  height={560}
                />
              </div>
            )}
          </div>
          <div className="col-lg-8">
            <div className="project-details-content-wrap">
              <h2 className="title">{portfolioItem.title}</h2>
              {portfolioItem.content ? (
                <div
                  className="docs"
                  dangerouslySetInnerHTML={{ __html: portfolioItem.content }}
                />
              ) : (
                <p className="docs">{portfolioItem.description}</p>
              )}

              {(portfolioItem.liveUrl || portfolioItem.githubUrl) && (
                <div className="check-box-wrap mt--30 mb--30">
                  <ul>
                    {portfolioItem.liveUrl && (
                      <li>
                        <h4 className="check-box-item">
                          <span>
                            <i className="fa-solid fa-circle-check" />
                          </span>
                          <a href={portfolioItem.liveUrl} target="_blank" rel="noopener noreferrer">
                            Live Preview
                          </a>
                        </h4>
                      </li>
                    )}
                    {portfolioItem.githubUrl && (
                      <li>
                        <h4 className="check-box-item">
                          <span>
                            <i className="fa-solid fa-circle-check" />
                          </span>
                          <a href={portfolioItem.githubUrl} target="_blank" rel="noopener noreferrer">
                            GitHub Repository
                          </a>
                        </h4>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <Appointment />
          </div>
          <div className="col-lg-4">
            <div className="signle-side-bar project-details-area tmponhover">
              <div className="header">
                <h3 className="title">Project Details</h3>
              </div>
              <div className="body">
                <div className="project-details-info">
                  Name: <span>{portfolioItem.title}</span>
                </div>
                <div className="project-details-info">
                  Date:{" "}
                  <span>
                    {new Date(portfolioItem.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {tags.length > 0 && (
                  <div className="project-details-info">
                    Tags: <span>{tags.join(", ")}</span>
                  </div>
                )}
                {categories.length > 0 && (
                  <div className="project-details-info">
                    Category: <span>{categories.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
