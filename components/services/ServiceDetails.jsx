import React from "react";
import Image from "next/image";
import Link from "next/link";
import { allServices } from "@/data/services";
import { slugify } from "@/utlis/slugify";

const serviceContent = {
  "frontend-development": {
    intro:
      "I craft responsive, high-performance user interfaces that deliver seamless experiences across all devices. With deep expertise in modern JavaScript frameworks, I transform complex requirements into intuitive, pixel-perfect interfaces.",
    heading: "Technologies & Expertise",
    details:
      "My frontend toolkit includes React.js, Next.js, and Vue.js for building component-driven applications with server-side rendering and static generation for optimal performance. I work extensively with Tailwind CSS, Material UI, Shadcn, Ant Design, and Aceternity UI to create visually stunning, accessible interfaces.",
    highlights: [
      "React.js & Next.js — SSR, SSG, and CSR for optimized performance",
      "Vue.js — Progressive framework for interactive UIs",
      "Tailwind CSS, Material UI, Shadcn & Ant Design",
      "Redux Toolkit & RTK Query for state management",
      "SEO optimization & Core Web Vitals improvement",
      "Responsive design with Bootstrap & custom CSS",
    ],
  },
  "backend-development": {
    intro:
      "I build robust, scalable server-side architectures that power modern web applications. From RESTful APIs to complex authentication systems, I ensure your backend is secure, performant, and maintainable.",
    heading: "Technologies & Expertise",
    details:
      "Specializing in Node.js and Express.js, I develop APIs with clean architecture patterns. I implement JWT-based authentication, Role-Based Access Control (RBAC), encrypted password handling, and strict CORS policies to ensure enterprise-grade security.",
    highlights: [
      "Node.js & Express.js — Scalable API development",
      "Prisma & Mongoose — ORM for PostgreSQL & MongoDB",
      "JWT authentication & RBAC with hierarchical privileges",
      "RESTful API design with pagination & caching",
      "PDF report generation with date-range filtering",
      "Secure practices — encrypted passwords, CORS, input validation",
    ],
  },
  "database-&-architecture": {
    intro:
      "I design efficient, well-structured database architectures that scale with your application. From schema design to query optimization, I ensure data consistency and peak performance under heavy loads.",
    heading: "Technologies & Expertise",
    details:
      "Working with PostgreSQL, MongoDB, and MySQL, I implement advanced indexing strategies, caching with Redis, and optimized query patterns. My approach focuses on data integrity, normalization, and performance-first architecture.",
    highlights: [
      "PostgreSQL — Relational database with advanced indexing",
      "MongoDB — NoSQL for flexible document-based storage",
      "MySQL — Reliable relational database solutions",
      "Redis — In-memory caching for high performance",
      "Prisma ORM — Type-safe database access & migrations",
      "Data modeling, normalization & query optimization",
    ],
  },
  "cloud-&-devops": {
    intro:
      "I deploy and manage production applications on cloud infrastructure, ensuring reliability, scalability, and automated delivery pipelines. From containerization to monitoring, I handle the full deployment lifecycle.",
    heading: "Technologies & Expertise",
    details:
      "Experienced with AWS and Google Cloud Platform, I configure production environments with Docker containers, Nginx reverse proxies, and CI/CD pipelines for seamless deployments. I ensure high availability and automated scaling for production workloads.",
    highlights: [
      "AWS & GCP — Cloud infrastructure & deployment",
      "Docker — Containerization for consistent environments",
      "Nginx — Reverse proxy & load balancing",
      "CI/CD — Automated build, test & deploy pipelines",
      "SSL/TLS configuration & domain management",
      "Server monitoring & performance optimization",
    ],
  },
  "ai-powered-solutions": {
    intro:
      "I integrate cutting-edge AI capabilities into web applications, building intelligent features that enhance user experience and automate complex workflows. From chatbots to smart content generation, I bring AI from concept to production.",
    heading: "Technologies & Expertise",
    details:
      "Leveraging tools like Claude, ChatGPT, and GitHub Copilot, I build AI-powered features including chat assistants, smart set generation, visual learning modes, and personalized recommendation systems. My approach focuses on practical AI integration that delivers real value.",
    highlights: [
      "Claude & ChatGPT API integration",
      "AI-powered chat assistance & content generation",
      "Smart recommendation & personalization systems",
      "Visual learning modes — Story, ELI5, Memory Palace",
      "GitHub Copilot for accelerated development",
      "Data-driven analytics with AI insights",
    ],
  },
  "full-stack-consulting": {
    intro:
      "I provide end-to-end project development from concept to deployment. With experience building management systems, e-commerce platforms, and AI-powered applications, I deliver complete solutions tailored to your business needs.",
    heading: "What I Deliver",
    details:
      "From initial planning to production deployment, I handle every aspect of web development. My portfolio includes enterprise management systems like the Police Pharmacy Management System, e-commerce platforms like Robomart BD, and AI-powered learning platforms like WordQuiz.",
    highlights: [
      "End-to-end project architecture & development",
      "Management systems — RBAC, reporting, audit logs",
      "E-commerce platforms — Product, cart, payment integration",
      "AI-powered platforms — Learning, gamification, analytics",
      "Admin dashboards with real-time KPIs & analytics",
      "Post-deployment support & performance optimization",
    ],
  },
};

export default function ServiceDetails({ serviceItem }) {
  const slug = slugify(serviceItem.title);
  const content = serviceContent[slug] || serviceContent["full-stack-consulting"];

  // Get other services for sidebar
  const otherServices = allServices
    .filter((s) => slugify(s.title) !== slug && s.description)
    .slice(0, 6);

  return (
    <div className="service-details-area-wrapper tmp-section-gap">
      <div className="container">
        <div className="row row--40">
          <div className="col-lg-8">
            <div className="service-thumnail-wrap">
              <Image
                alt={serviceItem.title}
                src="/assets/images/services/service-detials-thumnail-wrap.png"
                width={850}
                height={476}
              />
            </div>
            <h2 className="title split-collab">{serviceItem.title}</h2>
            <p className="doc-para">{content.intro}</p>

            <h2 className="title-mini split-collab">{content.heading}</h2>
            <p className="doc-para">{content.details}</p>

            <div className="check-box-wrap mt--20 mb--30">
              <ul>
                {content.highlights.map((item, i) => (
                  <li key={i}>
                    <h4 className="check-box-item">
                      <span>
                        <i className="fa-solid fa-circle-check" />
                      </span>
                      {item}
                    </h4>
                  </li>
                ))}
              </ul>
            </div>

            {serviceItem.description && (
              <>
                <h2 className="title-mini split-collab">Overview</h2>
                <p className="doc-para">{serviceItem.description}</p>
              </>
            )}
          </div>
          <div className="col-lg-4">
            <div className="signle-side-bar service-list-area tmponhover">
              <div className="header">
                <h3 className="title">All Services</h3>
              </div>
              <div className="body">
                {otherServices.map((service, i) => (
                  <Link
                    key={i}
                    href={`/service-details/${slugify(service.title)}`}
                    className="single-service"
                  >
                    <p className="service-title">{service.title}</p>
                    <span className="service-icon">
                      <i className="fa-solid fa-angle-right" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="signle-side-bar service-list-area tmponhover mt--30">
              <div className="header">
                <h3 className="title">Need This Service?</h3>
              </div>
              <div className="body" style={{ textAlign: "center", padding: "20px" }}>
                <p className="doc-para" style={{ marginBottom: "20px" }}>
                  Let&apos;s discuss your project requirements and build something great together.
                </p>
                <Link
                  href="/contact"
                  className="tmp-btn hover-icon-reverse radius-round"
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Get In Touch</span>
                    <span className="btn-icon">
                      <i className="fa-sharp fa-regular fa-arrow-right" />
                    </span>
                    <span className="btn-icon">
                      <i className="fa-sharp fa-regular fa-arrow-right" />
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
