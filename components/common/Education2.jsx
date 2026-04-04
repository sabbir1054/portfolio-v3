import { coursesData, educationData } from "@/data/education";
import Image from "next/image";
export default function Education() {
  return (
    <section className="education-experience tmp-section-gapTop" id="resume">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Education &amp; Courses</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Academic Background <br />
            &amp; Learning
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            A strong academic foundation in Software Engineering and Cyber
            Security, combined with hands-on learning through professional
            courses and certifications.
          </p>
        </div>
        <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
          Education
          <span>
            <Image
              alt="custom-line"
              src="/assets/images/custom-line/custom-line.png"
              width={81}
              height={6}
            />
          </span>
        </h2>
        <div className="row g-5">
          {educationData.map((item, index) => (
            <div className="col-lg-6 col-sm-6" key={index}>
              <div
                className={`education-experience-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${item.animationOrder}`}
              >
                <h4 className="edu-sub-title">{item.role}</h4>
                <p
                  className="edu-institution"
                  style={{
                    color: "var(--color-primary-2nd)",
                    fontSize: "14px",
                    marginBottom: "5px",
                    fontFamily: "var(--font-secondary)",
                  }}
                >
                  {item.institution}
                </p>
                <h2 className="edu-title">{item.duration}</h2>
                <p className="edu-para">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {coursesData.length > 0 && (
          <div className="mt--50">
            <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
              Courses
              <span>
                <Image
                  alt="custom-line"
                  src="/assets/images/custom-line/custom-line.png"
                  width={81}
                  height={6}
                />
              </span>
            </h2>
            <div className="row g-5">
              {coursesData.map((item, index) => (
                <div className="col-lg-6 col-sm-6" key={index}>
                  <div
                    className={`education-experience-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${item.animationOrder}`}
                  >
                    <h4 className="edu-sub-title">{item.title}</h4>
                    {item.platform && (
                      <p
                        className="edu-institution"
                        style={{
                          color: "var(--color-primary-2nd)",
                          fontSize: "14px",
                          marginBottom: "5px",
                          fontFamily: "var(--font-secondary)",
                        }}
                      >
                        {item.platform}
                      </p>
                    )}
                    <h2 className="edu-title">{item.duration}</h2>
                    <p className="edu-para">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="experiences-wrapper">
          <div className="row">
            <div className="col-lg-6">
              <div className="experiences-wrap-left-content">
                <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
                  Experiences
                  <span>
                    <Image
                      alt="custom-line"
                      src="/assets/images/custom-line/custom-line.png"
                      width={81}
                      height={6}
                    />
                  </span>
                </h2>
                <div className="experience-content tmp-scroll-trigger tmp-fade-in animation-order-1">
                  <p className="ex-subtitle">experience</p>
                  <h2 className="ex-name">
                    Code Studio (March 2026 - Present)
                  </h2>
                  <h3 className="ex-title">Software Engineer</h3>
                  <p className="ex-para">
                    Building and maintaining scalable web applications at a
                    software for Code studio, collaborating with
                    cross-functional teams to architect solutions, write clean
                    code, and ship features across the full stack.
                  </p>
                </div>
                <div className="experience-content tmp-scroll-trigger tmp-fade-in animation-order-1">
                  <p className="ex-subtitle">experience</p>
                  <h2 className="ex-name">Freelancer (Oct 2025 - Present)</h2>
                  <h3 className="ex-title">Full Stack Developer</h3>
                  <p className="ex-para">
                    Working as a freelance Full Stack Developer, delivering
                    end-to-end web solutions including AI-powered platforms,
                    management systems, and e-commerce applications.
                  </p>
                </div>

                <div className="experience-content tmp-scroll-trigger tmp-fade-in animation-order-3">
                  <p className="ex-subtitle">experience</p>
                  <h2 className="ex-name">
                    Infinity Algo Station (Sep 2023 - Oct 2025)
                  </h2>
                  <h3 className="ex-title">Full Stack Developer</h3>
                  <p className="ex-para">
                    Built scalable web applications using React, Next.js,
                    Node.js, and PostgreSQL. Implemented secure backend systems
                    with JWT authentication, RBAC, and cloud deployments on AWS
                    and GCP.
                  </p>
                </div>

                <div className="experience-content tmp-scroll-trigger tmp-fade-in animation-order-2">
                  <p className="ex-subtitle">experience</p>
                  <h2 className="ex-name">
                    Cyber Security Centre, DIU (2025 - Present)
                  </h2>
                  <h3 className="ex-title">Cyber Security Researcher</h3>
                  <p className="ex-para">
                    Conducting security research at the Cyber Security Centre in
                    Daffodil International University, focusing on vulnerability
                    assessment, penetration testing, and secure system analysis.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="experiences-wrap-right-content">
                <Image
                  className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                  alt="Sabbir Hossain"
                  src="/assets/images/banner/banner-user-image-04.png"
                  width={525}
                  height={525}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
