import { slugify } from "@/utlis/slugify";

export const services = [
  {
    id: 1,
    icon: "fa-light fa-code",
    title: "Frontend Development",
    projects: "15+ Projects",
    animationOrder: "1",
  },
  {
    id: 2,
    icon: "fa-light fa-server",
    title: "Backend Development",
    projects: "10+ Projects",
    animationOrder: "2",
  },
  {
    id: 3,
    icon: "fa-light fa-database",
    title: "Database Design",
    projects: "12+ Projects",
    animationOrder: "3",
  },
  {
    id: 4,
    icon: "fa-light fa-cloud",
    title: "Cloud & DevOps",
    projects: "8+ Projects",
    animationOrder: "4",
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const services2 = [
  {
    id: 1,
    num: "01.",
    title: "Frontend Development",
    description:
      "Building responsive, high-performance web apps with React, Next.js, and Vue.js. Skilled in Tailwind CSS, Material UI, Shadcn, and modern UI frameworks for pixel-perfect interfaces.",
    animationOrder: "1",
    isLink: true,
    column: 1,
  },
  {
    id: 2,
    num: "02.",
    title: "Backend Development",
    description:
      "Developing scalable server-side solutions with Node.js, Express, Prisma, and Mongoose. Expertise in RESTful APIs, JWT authentication, RBAC, and secure backend architectures.",
    animationOrder: "2",
    isLink: true,
    column: 1,
  },
  {
    id: 3,
    num: "03.",
    title: "Database & Architecture",
    description:
      "Designing efficient database schemas with PostgreSQL, MongoDB, and MySQL. Implementing indexing, caching with Redis, and optimized query strategies for high-performance applications.",
    animationOrder: "3",
    isLink: true,
    column: 1,
  },
  {
    id: 4,
    num: "04.",
    title: "Cloud & DevOps",
    description:
      "Deploying and managing applications on AWS and GCP with Docker, Nginx, and CI/CD pipelines. Ensuring reliable, scalable infrastructure for production-grade applications.",
    animationOrder: "4",
    isLink: false,
    column: 2,
  },
  {
    id: 5,
    num: "05.",
    title: "AI-Powered Solutions",
    description:
      "Integrating AI tools like Claude and ChatGPT into web applications. Building smart features including chat assistants, content generation, and intelligent recommendation systems.",
    animationOrder: "5",
    isLink: false,
    column: 2,
  },
  {
    id: 6,
    num: "06.",
    title: "Full Stack Consulting",
    description:
      "End-to-end project development from concept to deployment. Specializing in management systems, e-commerce platforms, and enterprise-grade web applications with modern tech stacks.",
    animationOrder: "6",
    isLink: false,
    column: 2,
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const services3 = [
  {
    id: 1,
    icon: "feather-cast",
    title: "Web Apps",
    description:
      "Full stack web applications built with React, Next.js, and Node.js.",
  },
  {
    id: 2,
    icon: "feather-map",
    title: "APIs",
    description:
      "Scalable RESTful APIs with Express, Prisma, and secure authentication.",
  },
  {
    id: 3,
    icon: "feather-phone-call",
    title: "Support",
    description:
      "Ongoing maintenance, deployment, and performance optimization services.",
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const services4 = [
  {
    id: 1,
    num: "01.",
    title: "Frontend Development",
    description:
      "Building responsive, high-performance web apps with React, Next.js, and Vue.js. Skilled in Tailwind CSS, Material UI, Shadcn, and modern UI frameworks for pixel-perfect interfaces.",
    animationOrder: 1,
    column: 1,
  },
  {
    id: 2,
    num: "02.",
    title: "Backend Development",
    description:
      "Developing scalable server-side solutions with Node.js, Express, Prisma, and Mongoose. Expertise in RESTful APIs, JWT authentication, RBAC, and secure backend architectures.",
    animationOrder: 2,
    column: 1,
  },
  {
    id: 3,
    num: "03.",
    title: "Database & Architecture",
    description:
      "Designing efficient database schemas with PostgreSQL, MongoDB, and MySQL. Implementing indexing, caching with Redis, and optimized query strategies for high-performance applications.",
    animationOrder: 3,
    column: 1,
  },
  {
    id: 4,
    num: "04.",
    title: "Cloud & DevOps",
    description:
      "Deploying and managing applications on AWS and GCP with Docker, Nginx, and CI/CD pipelines. Ensuring reliable, scalable infrastructure for production-grade applications.",
    animationOrder: 4,
    column: 2,
  },
  {
    id: 5,
    num: "05.",
    title: "AI-Powered Solutions",
    description:
      "Integrating AI tools like Claude and ChatGPT into web applications. Building smart features including chat assistants, content generation, and intelligent recommendation systems.",
    animationOrder: 5,
    column: 2,
  },
  {
    id: 6,
    num: "06.",
    title: "Full Stack Consulting",
    description:
      "End-to-end project development from concept to deployment. Specializing in management systems, e-commerce platforms, and enterprise-grade web applications with modern tech stacks.",
    animationOrder: 6,
    column: 2,
  },
].map((elm) => {
  return {
    ...elm,
    slug: slugify(elm.title),
  };
});

export const serviceCards = [
  {
    title: "End-to-End Web Solutions",
    description:
      "From frontend interfaces to backend logic and database design, I deliver complete full stack solutions using modern JavaScript technologies.",
  },
  {
    title: "Scalable & Secure Systems",
    description:
      "Building production-ready applications with JWT authentication, RBAC, Docker deployment, and cloud infrastructure on AWS and GCP.",
  },
  {
    title: "AI-Enhanced Applications",
    description:
      "Leveraging AI tools to build intelligent features like smart content generation, chat assistants, and data-driven recommendation systems.",
  },
];

export const services5 = [
  {
    title: "End-to-End Web Solutions",
    description:
      "From frontend interfaces to backend logic and database design, I deliver complete full stack solutions using modern JavaScript technologies.",
  },
  {
    title: "Scalable & Secure Systems",
    description:
      "Building production-ready applications with JWT authentication, RBAC, Docker deployment, and cloud infrastructure on AWS and GCP.",
  },
  {
    title: "AI-Enhanced Applications",
    description:
      "Leveraging AI tools to build intelligent features like smart content generation, chat assistants, and data-driven recommendation systems.",
  },
];
export const serviceCards2 = [
  {
    number: "01.",
    title: "Frontend Engineering",
    description:
      "Crafting responsive, SEO-optimized web interfaces with React, Next.js, and modern CSS frameworks like Tailwind and Material UI.",
  },
  {
    number: "02.",
    title: "Backend & API Development",
    description:
      "Building robust server-side applications with Node.js, Express, and Prisma. Secure APIs with JWT auth and role-based access control.",
  },
  {
    number: "03.",
    title: "Database & Cloud Infrastructure",
    description:
      "Designing efficient data layers with PostgreSQL, MongoDB, and Redis. Deploying on AWS/GCP with Docker and CI/CD pipelines.",
  },
];

export const serviceCards3 = [
  {
    iconClass: "fa-regular fa-code",
    title: "Frontend Development",
    description:
      "Building modern, responsive web apps with React, Next.js, Vue.js, and UI libraries like Tailwind CSS, Shadcn, and Ant Design.",
    animationOrder: 4,
  },
  {
    iconClass: "fa-light fa-server",
    title: "Backend Development",
    description:
      "Creating scalable APIs and server-side logic with Node.js, Express, Prisma, and Mongoose with secure authentication and RBAC.",
    animationOrder: 5,
  },
  {
    iconClass: "fa-light fa-database",
    title: "Database Solutions",
    description:
      "Designing and optimizing database architectures using PostgreSQL, MongoDB, and MySQL with Redis caching for peak performance.",
    animationOrder: 4,
  },
  {
    iconClass: "fa-regular fa-cloud",
    title: "Cloud & Deployment",
    description:
      "Deploying production applications on AWS and GCP with Docker, Nginx, and automated CI/CD pipelines for seamless delivery.",
    animationOrder: 5,
  },
];
export const allServices = [
  ...services,
  ...services2,
  ...services3,
  ...services4,
];
