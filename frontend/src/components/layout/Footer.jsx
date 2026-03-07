import React from "react";
import { Link } from "react-router-dom";

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
            <a href="/code-tools">Code Tools</a>
            <a href="/pdf-tools">PDF Tools</a>
            <Link to="/products">AI Tools</Link>
          </div>
        </div>

        <div>
          <h6>Discover</h6>
          <ul>
            <li><Link to="/products">All AI Tools</Link></li>
            <li><Link to="/allcategory">All Categories</Link></li>
            <li><Link to="/ai-news">AI News</Link></li>
            <li><Link to="/ai-newsletters">AI Newsletters</Link></li>
            <li><Link to="/ai-papers">AI Research Papers</Link></li>
            <li><Link to="/ai-jobs">AI Jobs</Link></li>
            <li><Link to="/ai-blogs">AI Blogs</Link></li>
          </ul>
        </div>

        <div>
          <h6>Company</h6>
          <ul>
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
        <a href="https://toolzite.com/">toolzite.com</a>
      </div>
    </footer>
  );
}
