import React from "react";
import ComingSoon from "./ComingSoon";

export default function Footer() {
  return (
    <div className="container-fluid p-0">
      {/* Full-width container */}
      <footer
        className="text-center text-lg-start"
        style={{ backgroundColor: "#1c1c1c", color: "rgba(206, 206, 206, 0.67)" }}
      >
        <div className="container p-4 pb-0">
          <section className="">
            <div className="row">
              {/* Company Logo */}
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <a href="/" className="text-decoration-none">
                  <img
                    src="/images/toolzite.png"
                    alt="ToolZite"
                    style={{ width: "170px", height: "50px", marginLeft: "-20px" }}
                  />
                </a>
                <p style={{ marginTop: "10px" }}>
                  The Ultimate Library of AI Tools. Access the most extensive collection of AI tools available online.
                </p>
              </div>
              <hr className="w-100 clearfix d-md-none" />

              {/* Useful Links */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold text-white">Useful Links</h6>
                <p>
                  <a
                    href="https://docs.google.com/forms/d/1YgUtr8ekr7SR4k8HhyxIfgQztW0DnRvLPw-OfhwyRaI/edit"
                    target="_blank"
                    className="footer-link"
                  >
                    Submit an AI Tool
                  </a>
                </p>
                <p>
                  <a href="/allcategory" className="footer-link">
                    All Categories
                  </a>
                </p>
                <p>
                  <a href="/comingsoon" className="footer-link">
                    AI Magazines
                  </a>
                </p>
                <p>
                  <a href="/comingsoon" className="footer-link">
                    AI News
                  </a>
                </p>
                <p>
                  <a href="/comingsoon" className="footer-link">
                    AI Jobs
                  </a>
                </p>
              </div>
              <hr className="w-100 clearfix d-md-none" />

              {/* Contact */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold text-white">Contact</h6>
                <p>
                  <i className="fas fa-home mr-3"></i> 403, Knightbridge, Brookefield, Bengaluru, India
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> toolzite@gmail.com
                </p>
              </div>

              {/* Social Links */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold text-white">Follow us</h6>
                <a
                  className="social-icon"
                  href="https://www.linkedin.com/company/105916174/admin/dashboard/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  className="social-icon"
                  href="https://www.instagram.com/toolzite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  className="social-icon"
                  href="https://www.youtube.com/@ToolZite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Copyright Section */}
        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          &copy; 2025 Copyright:{" "}
          <a className="footer-brand" href="https://toolzite.com/">
            toolzite.com
          </a>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>
        {`
          .footer-link {
            color: rgba(206, 206, 206, 0.67);
            text-decoration: none;
            transition: 0.3s ease-in-out;
          }
          .footer-link:hover {
            background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .footer-brand {
            color: white;
            text-decoration: none;
            transition: 0.3s ease-in-out;
          }
          .footer-brand:hover {
            background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .social-icon {
            font-size: 24px;
            margin: 0 10px;
            color: rgba(206, 206, 206, 0.67);
            transition: 0.3s;
          }
          .social-icon:hover {
            background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>
    </div>
  );
}
