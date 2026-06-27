"use client";
import { footerLinks, footerLinksWhite } from "@/data/footerLinks";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Footer1() {
  const formRef = useRef();
  const [sending, setSending] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = formRef.current.email.value;
    if (!email) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email,
          message: `New newsletter subscription from: ${email}`,
          subject: "New Newsletter Subscription",
        }),
      });
      if (res.ok) {
        toast.success("Subscribed successfully!");
        formRef.current.reset();
      } else {
        toast.error("Failed to subscribe.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSending(false);
    }
  };

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
                    ref={formRef}
                    onSubmit={handleSubscribe}
                    className="newsletter-form-1 mt--40"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                    />
                    <button
                      type="submit"
                      className="form-icon"
                      disabled={sending}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className={
                          sending
                            ? "fa-solid fa-spinner fa-spin"
                            : "fa-regular fa-envelope"
                        }
                      />
                    </button>
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
                      <a href="mailto:mdsabbir1054@gmail.com">
                        mdsabbir1054@gmail.com
                      </a>
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
                      <a href="tel:+8801733208221">+880 1733208221</a>
                    </li>
                  </ul>
                  <div className="social-link footer">
                    <a
                      href="https://github.com/sabbir1054"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-github" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/md--sabbir-hossain"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-linkedin-in" />
                    </a>
                    <a
                      href="https://www.upwork.com/freelancers/~01a76df77f79bd0eaa"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="upwork-icon">UP</span>
                    </a>
                    <a
                      href="https://www.facebook.com/sabbir.1054"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
