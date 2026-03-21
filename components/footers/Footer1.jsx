"use client";
import { footerLinks, footerLinksWhite } from "@/data/footerLinks";
import Link from "next/link";
export default function Footer1() {
  return (
    <>
      <footer className="footer-area footer-style-one-wrapper bg-color-footer bg_images tmp-section-gap">
        <div className="container">
          <div className="footer-main footer-style-one">
            <div className="row g-5">
              <div className="col-lg-5 col-md-6">
                <div className="single-footer-wrapper border-right mr--20">
                  <div className="logo">
                    <Link href="/" className="brand-logo-text brand-lg">
                      mdsabbir<span className="dot">.</span>dev
                    </Link>
                  </div>
                  <p className="description">
                    <span>Get Ready</span> To Create Great
                  </p>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="newsletter-form-1 mt--40"
                  >
                    <input type="email" placeholder="Email Adress" />
                    <span className="form-icon">
                      <i className="fa-regular fa-envelope" />
                    </span>
                  </form>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-footer-wrapper quick-link-wrap">
                  <h5 className="ft-title">Quick Link</h5>
                  <ul className="ft-link tmp-link-animation dark-content">
                    {footerLinks.map((item, index) => (
                      <li key={index}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="ft-link tmp-link-animation light-content2">
                    {footerLinksWhite.map((item, index) => (
                      <li key={index}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="single-footer-wrapper contact-wrap">
                  <h5 className="ft-title">Contact</h5>
                  <ul className="ft-link tmp-link-animation">
                    <li>
                      <span className="ft-icon">
                        <i className="fa-solid fa-envelope" />
                      </span>
                      <a href="#">mdsabbir1054@gmail.com</a>
                    </li>
                    <li>
                      <span className="ft-icon">
                        <i className="fa-solid fa-location-dot" />
                      </span>
                      Dhaka, Bangladesh
                    </li>
                    <li>
                      <span className="ft-icon">
                        <i className="fa-solid fa-phone" />
                      </span>
                      <a href="#">+880 1733208221</a>
                    </li>
                  </ul>
                  <div className="social-link footer">
                    <a href="https://github.com/sabbir1054" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-github" />
                    </a>
                    <a href="https://www.linkedin.com/in/md-sabbir-hossain-1054" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-linkedin-in" />
                    </a>
                    <a href="https://www.upwork.com/freelancers/~01a76df77f79bd0eaa" target="_blank" rel="noopener noreferrer">
                      <span className="upwork-icon">UP</span>
                    </a>
                    <a href="https://www.facebook.com/sabbir.1054" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-facebook-f" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>{" "}
    </>
  );
}
