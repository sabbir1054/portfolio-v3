import LayoutWrapper from "@/components/common/LayoutWrapper";
import Script from "next/script";
import "odometer/themes/odometer-theme-default.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../public/assets/scss/main.scss";

const SITE_URL = "https://mdsabbir.dev";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Md Sabbir Hossain | Full Stack Developer & Cyber Security Researcher",
    template: "%s | mdsabbir.dev",
  },
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, PostgreSQL, and cloud deployment. Building scalable web applications with modern technologies. Based in Dhaka, Bangladesh.",
  keywords: [
    "Full Stack Developer",
    "Md Sabbir Hossain",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Web Developer Bangladesh",
    "Freelance Developer",
    "Cyber Security Researcher",
    "MERN Stack",
    "PostgreSQL",
    "Prisma",
    "AWS",
    "GCP",
    "Portfolio",
  ],
  authors: [{ name: "Md Sabbir Hossain", url: SITE_URL }],
  creator: "Md Sabbir Hossain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "mdsabbir.dev",
    title: "Md Sabbir Hossain | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and cloud technologies. Building scalable, production-grade web applications.",
    images: [
      {
        url: "/assets/images/banner/banner-user-image-04.png",
        width: 525,
        height: 525,
        alt: "Md Sabbir Hossain - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Sabbir Hossain | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and cloud technologies.",
    images: ["/assets/images/banner/banner-user-image-04.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Md Sabbir Hossain",
    url: SITE_URL,
    image: `${SITE_URL}/assets/images/banner/banner-user-image-04.png`,
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer & Cyber Security Researcher based in Dhaka, Bangladesh.",
    email: "mdsabbir1054@gmail.com",
    telephone: "+8801733208221",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: [
      "https://github.com/sabbir1054",
      "https://www.linkedin.com/in/md--sabbir-hossain",
      "https://www.upwork.com/freelancers/~01a76df77f79bd0eaa",
      "https://www.facebook.com/sabbir.1054",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Daffodil International University",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "AWS",
      "Docker",
      "TypeScript",
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Script src="/assets/js/smooth.js" strategy="beforeInteractive" />
        <LayoutWrapper>
          <ToastContainer
            position="top-right"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
