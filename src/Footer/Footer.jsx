import React from "react";
import "./Footer.css";
function Footer(props) {
  return (
    <div style={{ backgroundColor: "#222" }}>
      {/* Site footer */}
      <footer className="site-footer" style={{ color: "white" }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>About</h6>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                quas obcaecati itaque reprehenderit iure? Adipisci eum autem
                dolorem exercitationem quae incidunt illum aperiam tenetur
                temporibus natus, quia ducimus deserunt? Nesciunt. Vero beatae
                hic sequi amet quas quis quibusdam facere, sapiente impedit
                necessitatibus, nihil nam officiis porro distinctio corporis id.
                Incidunt magnam tenetur doloribus blanditiis neque aliquid
                dolorum odit dolores error! Ex rem quo quisquam mollitia,
                excepturi sunt, dolorem delectus, iure maiores ut aspernatur
                iusto? Quam, quisquam recusandae quasi voluptatibus harum,
                eveniet dignissimos optio totam amet ipsa ex. Aspernatur, ea
                fugit.
              </p>
            </div>
            <div className="col-xs-6 col-md-3">
              <h6>Categories</h6>
              <ul className="footer-links">
                <li>
                  <a href="" style={{ color: "white" }}>
                    Tui
                  </a>
                </li>
                <li>
                  <a href="" style={{ color: "white" }}>
                    Ten
                  </a>
                </li>
                <li>
                  <a href="" style={{ color: "white" }}>
                    La
                  </a>
                </li>
                <li>
                  <a href="" style={{ color: "white" }}>
                    Duong
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <a href="" style={{ color: "white" }}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="" style={{ color: "white" }}>
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="" style={{ color: "white" }}>
                    Contribute
                  </a>
                </li>
                <li>
                  <a href="" style={{ color: "white" }}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="" style={{ color: "white" }}>
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright © 2023 All Rights Reserved by{" "}
                <a href="#" style={{ color: "white" }}>
                  DuowngM
                </a>
                .
              </p>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <a
                    className="facebook"
                    href="facebook.com/duowngm"
                    target="_blank"
                  >
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="twitter"
                    href="https://twitter.com/"
                    target="_blank"
                  >
                    <i
                      className="fa-brands fa-twitter"
                      style={{ color: "white" }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a
                    className="dribbble"
                    href="https://www.instagram.com/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a className="linkedin" href="#" target="_blank">
                    <i
                      className="fa-brands fa-tiktok"
                      style={{ color: "white" }}
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
