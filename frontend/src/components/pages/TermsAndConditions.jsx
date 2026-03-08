import React from "react";
import MetaData from "../layout/MetaData";
import { APP_PATHS } from "../../constants/routes";

const TERMS_SECTIONS = [
  {
    title: "Acceptance of Terms",
    body:
      "By accessing ToolZite, you agree to use the website and its linked or embedded services in a lawful and responsible manner. If you do not agree with these terms, you should not use the platform.",
  },
  {
    title: "Scope of the Platform",
    body:
      "ToolZite includes AI tool discovery pages, embedded PDF tools, image tools, and code tools. Some tools are informational directories or outbound listings, while other features are interactive experiences delivered within ToolZite or through integrated workspaces.",
  },
  {
    title: "AI Tools",
    body:
      "AI tool listings may link to third-party products, websites, or services. ToolZite does not own every tool listed on the platform and cannot guarantee the ongoing availability, accuracy, pricing, safety, or business practices of third-party providers.",
  },
  {
    title: "PDF Tools and Image Tools",
    body:
      "PDF tools and image tools are provided for lawful document and media workflows only. You are responsible for ensuring that any file you upload, process, or transform is yours to use and does not violate privacy, confidentiality, copyright, or contractual restrictions.",
  },
  {
    title: "Code Tools",
    body:
      "Code tools are intended for learning, practice, visualization, and productivity support. They should not be treated as a substitute for independent review, production testing, or professional engineering judgment.",
  },
  {
    title: "User Responsibility",
    body:
      "You are responsible for the content you submit, the files you process, and the decisions you make based on outputs generated or displayed through the platform. You should independently verify important results before relying on them in business, legal, academic, or personal contexts.",
  },
  {
    title: "Prohibited Uses",
    body:
      "You may not use ToolZite to process unlawful content, infringe intellectual property rights, attempt unauthorized access, interfere with platform operations, distribute malware, or misuse the service in a way that harms ToolZite, its users, or third parties.",
  },
  {
    title: "Third-Party Services",
    body:
      "ToolZite may integrate or reference third-party tools, analytics, hosting, APIs, and external links. Those services operate under their own terms and policies, and ToolZite is not responsible for their conduct, availability, or content.",
  },
  {
    title: "No Warranty",
    body:
      "The platform is provided on an as-is and as-available basis. ToolZite does not guarantee uninterrupted access, error-free operation, or that any tool output will be complete, accurate, secure, or suitable for your particular purpose.",
  },
  {
    title: "Limitation of Liability",
    body:
      "To the fullest extent permitted by law, ToolZite will not be liable for indirect, incidental, special, consequential, or business-related losses arising from your use of the platform, including reliance on outputs, third-party services, or temporary unavailability.",
  },
  {
    title: "Changes to the Service and Terms",
    body:
      "ToolZite may update platform features, routes, categories, and legal terms from time to time. Continued use of the platform after changes are published constitutes acceptance of the updated terms.",
  },
  {
    title: "Contact",
    body:
      "For business or platform questions, contact ToolZite at sandeep@toolzite.com.",
  },
];

const TermsAndConditions = () => {
  return (
    <>
      <MetaData
        title="Terms and Conditions"
        description="Read ToolZite terms and conditions for AI tools, PDF tools, image tools, and code tools."
        canonical={`https://www.toolzite.com${APP_PATHS.terms}`}
        keywords="ToolZite terms, PDF tools terms, AI tools terms, image tools terms, code tools terms"
      />

      <main className="tz-info-page tz-terms-page">
        <section className="tz-info-hero">
          <div className="tz-info-hero-inner">
            <span className="tz-page-chip">TERMS AND CONDITIONS</span>
            <h1>Terms for using ToolZite and its AI, PDF, image, and code tool experiences.</h1>
            <p>
              These terms are intended to describe acceptable use of the platform and clarify how ToolZite should be
              used when interacting with listed tools, embedded workspaces, and external services.
            </p>
          </div>
        </section>

        <section className="tz-info-section">
          <div className="tz-terms-list">
            {TERMS_SECTIONS.map((section) => (
              <article key={section.title} className="tz-terms-item">
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tz-info-section">
          <div className="tz-info-panel">
            <h2>Contact</h2>
            <a href="mailto:sandeep@toolzite.com" className="tz-page-link">
              sandeep@toolzite.com
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default TermsAndConditions;
