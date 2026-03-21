import Link from "next/link";
export default function Copyright() {
  return (
    <div className="copyright-area-one">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-wrapper">
              <p className="copy-right-para tmp-link-animation">
                ©{" "}
                <a
                  href="/"
                  className=" brand-sm"
                  style={{ verticalAlign: "middle" }}
                >
                  mdsabbir<span className="dot">.</span>dev
                </a>{" "}
                {new Date().getFullYear()} | All Rights Reserved
              </p>{" "}
              <ul className="tmp-link-animation dark-content">
                <li>
                  <a href="#">Trams &amp; Condition</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <Link href={`/contact`}>Contact Us</Link>
                </li>
              </ul>
              <ul className="tmp-link-animation light-content">
                <li>
                  <a href="#">Trams &amp; Condition</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <Link href={`/contact-white`}>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
