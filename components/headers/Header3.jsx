import ImageWithFallback from "@/components/common/ImageWithFallback";
import Link from "next/link";
import OnepageNav2 from "./OnepageNav2";
export default function Header3() {
  return (
    <div className="d-none d-xl-block header-style-2 header-left">
      <header className="tmp-header-area d-flex align-items-start flex-column header-left-sticky">
        <div className="inner-wrapper">
          <div className="logo-area">
            <Link href={`/`}>
              <ImageWithFallback
                alt="Md Sabbir Hossain"
                src="/assets/images/banner/header-left-user.png"
                width={350}
                height={350}
              />
            </Link>
          </div>
          <nav
            id="sideNavs"
            className="mainmenu-nav navbar-example2 onepagenav"
          >
            <ul className="primary-menu nav nav-pills">
              <OnepageNav2 />
            </ul>
          </nav>
          <div className="footer">
            <div className="social-share-style-1">
              <span className="title">Find With Me</span>
              <div className="social-link">
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
      </header>
    </div>
  );
}
