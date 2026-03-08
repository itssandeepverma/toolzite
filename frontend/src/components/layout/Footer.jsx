import React from "react";
import { Link } from "react-router-dom";
import { APP_PATHS } from "../../constants/routes";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="tz-footer">
      <div className="container tz-footer-grid">
        <div className="tz-footer-brand">
          <Link to="/" className="tz-footer-logo-link">
            <img src="/images/icon.png" alt="" aria-hidden="true" className="tz-footer-logo-icon" />
            <span className="tz-footer-logo-text">ToolZite</span>
          </Link>
          <p>
            Every tool you need to ship faster. One ecosystem for AI discovery, code visuals, PDF workflows, and image utilities.
          </p>
          <div className="tz-footer-pills">
            <a href={APP_PATHS.pdfTools}>PDF Tools</a>
            <Link to={APP_PATHS.aiTools}>AI Tools</Link>
            <a href={APP_PATHS.codeTools}>Code Tools</a>
          </div>
        </div>

        <div>
          <h6>Discover</h6>
          <ul>
            <li><Link to={APP_PATHS.aiTools}>All AI Tools</Link></li>
            <li><Link to={APP_PATHS.allCategories}>All Categories</Link></li>
            <li><Link to={APP_PATHS.aiNews}>AI News</Link></li>
            <li><Link to={APP_PATHS.aiNewsletters}>AI Newsletters</Link></li>
            <li><Link to={APP_PATHS.aiPapers}>AI Research Papers</Link></li>
            <li><Link to={APP_PATHS.aiJobs}>AI Jobs</Link></li>
            <li><Link to={APP_PATHS.aiBlogs}>AI Blogs</Link></li>
          </ul>
        </div>

        <div>
          <h6>Company</h6>
          <ul>
            <li><Link to={APP_PATHS.about}>About</Link></li>
            <li><Link to={APP_PATHS.terms}>Terms and Conditions</Link></li>
            <li>
              <a
                href="https://docs.google.com/forms/d/1YgUtr8ekr7SR4k8HhyxIfgQztW0DnRvLPw-OfhwyRaI/edit"
                target="_blank"
                rel="noreferrer"
              >
                Submit an AI Tool
              </a>
            </li>
            <li>
              <a
                href="https://internshala.com/company/toolzite-1766167755/"
                target="_blank"
                rel="noreferrer"
              >
                Careers
              </a>
            </li>
            <li><a href="mailto:sandeep@toolzite.com">sandeep@toolzite.com</a></li>
            <li><span>Noida, India</span></li>
          </ul>
        </div>

        <div>
          <h6>Follow</h6>
          <div className="tz-footer-socials">
            <a
              href="https://www.linkedin.com/company/105916174/admin/dashboard/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://www.instagram.com/toolzite.ai"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.youtube.com/@ToolZite"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a
              href="https://medium.com/@toolzite"
              target="_blank"
              rel="noreferrer"
              aria-label="Medium"
            >
              <i className="fab fa-medium-m"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="tz-footer-bottom">
        <span>&copy; {year} Toolzite. All rights reserved.</span>
        <div className="tz-footer-bottom-links">
          <Link to={APP_PATHS.about}>About</Link>
          <Link to={APP_PATHS.terms}>Terms</Link>
          <a href="https://toolzite.com/">toolzite.com</a>
        </div>
      </div>
    </footer>
  );
}
