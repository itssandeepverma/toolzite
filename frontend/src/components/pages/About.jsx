import React, { useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { APP_PATHS } from "../../constants/routes";
import MetaData from "../layout/MetaData";

const HERO_METRICS = [
  { value: "4", label: "Tool surfaces across AI, PDF, image, and code" },
  { value: "1", label: "Unified destination to explore and execute" },
  { value: "24/7", label: "Self-serve workflows built for speed" },
];

const PLATFORM_PILLARS = [
  {
    eyebrow: "Discover",
    title: "Useful tools should be easier to find.",
    description:
      "ToolZite organizes AI products, practical resources, and tool categories so users can reach the right workflow without hunting across scattered tabs and directories.",
  },
  {
    eyebrow: "Use",
    title: "Execution matters more than browsing.",
    description:
      "The platform is expanding beyond listings into embedded workspaces for PDF and code tasks, reducing the gap between finding a tool and completing the work.",
  },
  {
    eyebrow: "Simplify",
    title: "Clarity beats hype.",
    description:
      "Every page is meant to feel direct, readable, and action-oriented on desktop and mobile, with a structure that supports repeat use instead of novelty alone.",
  },
];

const JOURNEY_ITEMS = [
  {
    title: "A broad utility layer",
    copy:
      "ToolZite started with the idea that a practical product can combine discovery, workflows, and learning support inside one understandable system.",
  },
  {
    title: "Multiple work modes",
    copy:
      "Today the platform spans AI tool exploration, PDF utilities, image-oriented workflows, and code-learning experiences with room to grow each surface intentionally.",
  },
  {
    title: "A durable product direction",
    copy:
      "The long-term goal is a cleaner tool ecosystem where users spend less time navigating product sprawl and more time shipping, studying, editing, and deciding.",
  },
];

const CTA_LINKS = [
  { label: "Explore AI Tools", to: APP_PATHS.aiTools },
  { label: "Open PDF Tools", to: APP_PATHS.pdfTools },
  { label: "Use Code Tools", to: APP_PATHS.codeTools },
];

const TEAM_MEMBERS = [
  {
    name: "Sandeep Verma",
    role: "Founder & CEO",
    image: "/images/sandeep.png",
    initials: "S",
    linkedin: "https://www.linkedin.com/in/sandeepiitb/",
  },
  {
    name: "Abhishek Yadav",
    role: "Co-Founder & Designer",
    image: "/images/abhishek.jpg",
    initials: "A",
    linkedin: "https://www.linkedin.com/in/abshkay/",
  },
  {
    name: "Ananya Das",
    role: "Content Creator & Social Media Intern",
    image: "/images/ananya.jpg",
    initials: "A",
    linkedin: "about:blank",
  },
];

const TeamCard = ({ member }) => {
  const [imageVisible, setImageVisible] = useState(true);

  return (
    <article className="tz-team-card">
      <div className="tz-team-avatar-shell">
        {imageVisible ? (
          <img
            src={member.image}
            alt={member.name}
            className="tz-team-avatar"
            onError={() => setImageVisible(false)}
          />
        ) : (
          <div className="tz-team-avatar-fallback" aria-hidden="true">
            {member.initials}
          </div>
        )}
      </div>

      <div className="tz-team-copy">
        <span className="tz-page-chip">{member.role}</span>
        <h3>{member.name}</h3>
      </div>

      <a
        href={member.linkedin}
        target="_blank"
        rel="noreferrer"
        className="tz-team-link"
        aria-label={`${member.name} LinkedIn`}
      >
        <FaLinkedinIn aria-hidden="true" />
      </a>
    </article>
  );
};

const About = () => {
  return (
    <>
      <MetaData
        title="About ToolZite"
        description="Learn about the team behind ToolZite and the platform mission across AI tools, PDF tools, image tools, and code tools."
        canonical={`https://www.toolzite.com${APP_PATHS.about}`}
        keywords="about ToolZite, ToolZite team, Sandeep, Abhishek, Ananya"
      />

      <main className="tz-info-page tz-about-page">
        <section className="tz-info-hero tz-about-hero">
          <div className="tz-info-hero-inner tz-about-hero-grid">
            <div className="tz-about-hero-copy">
              <span className="tz-page-chip">ABOUT TOOLZITE</span>
              <h1>One platform for practical digital work, not fragmented tool hunting.</h1>
              <p>
                ToolZite brings together AI discovery, PDF workflows, image utilities, and code-learning experiences in
                a single product. The aim is straightforward: make it faster to find useful tools and easier to finish
                real work once you get there.
              </p>

              <div className="tz-about-metric-grid">
                {HERO_METRICS.map((metric) => (
                  <article key={metric.label} className="tz-about-metric-card">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </article>
                ))}
              </div>
            </div>

            <aside className="tz-about-showcase-card" aria-label="ToolZite overview">
              <div className="tz-about-showcase-top">
                <img src="/images/icon.png" alt="ToolZite icon" className="tz-about-showcase-logo" />
                <span className="tz-about-showcase-badge">Unified Tool Layer</span>
              </div>

              <h2>Designed to reduce friction between discovery and execution.</h2>

              <ul className="tz-about-checklist">
                <li>Clear routes into AI tools, PDF utilities, and code workspaces</li>
                <li>Readable product structure that works on desktop and mobile</li>
                <li>A platform direction centered on utility, not noise</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="tz-info-section">
          <div className="tz-section-heading">
            <span className="tz-page-chip">WHAT WE ARE BUILDING</span>
            <h2>A cleaner front door to useful software.</h2>
            <p>
              ToolZite is being shaped as a practical utility layer where discovery pages, embedded workspaces, and
              learning surfaces can coexist without feeling disconnected.
            </p>
          </div>

          <div className="tz-about-pillar-grid">
            {PLATFORM_PILLARS.map((pillar) => (
              <article key={pillar.title} className="tz-info-panel tz-about-pillar-card">
                <span className="tz-about-card-kicker">{pillar.eyebrow}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tz-info-section">
          <div className="tz-info-grid tz-about-story-grid">
            <article className="tz-info-panel tz-about-story-panel">
              <span className="tz-page-chip">HOW WE THINK</span>
              <h2>Usability over noise.</h2>
              <p>
                The product direction is centered on speed, clarity, and practical outcomes. That means fewer dead ends,
                better categorization, and interfaces that help people move from browsing to doing without unnecessary
                friction.
              </p>
              <p>
                As the platform grows, the standard stays the same: useful tools, readable experiences, and product
                choices that remain understandable instead of bloated.
              </p>
            </article>

            <article className="tz-info-panel tz-about-story-panel">
              <span className="tz-page-chip">WHY IT MATTERS</span>
              <h2>Tool sprawl wastes time.</h2>
              <p>
                People often bounce between directories, tabs, and disconnected products before they can even start the
                task they came to finish. ToolZite is intended to cut that overhead by making the path from intent to
                action shorter.
              </p>
              <p>
                Whether the need is discovery, document work, or code practice, the experience should feel organized
                enough to return to, not just browse once.
              </p>
            </article>
          </div>
        </section>

        <section className="tz-info-section">
          <div className="tz-section-heading">
            <span className="tz-page-chip">JOURNEY</span>
            <h2>How the platform is taking shape.</h2>
          </div>

          <div className="tz-about-journey">
            {JOURNEY_ITEMS.map((item, index) => (
              <article key={item.title} className="tz-about-journey-item">
                <div className="tz-about-journey-index">0{index + 1}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="tz-info-section">
          <div className="tz-section-heading">
            <span className="tz-page-chip">TEAM</span>
            <h2>The people behind ToolZite.</h2>
          </div>

          <div className="tz-team-grid">
            {TEAM_MEMBERS.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        <section className="tz-info-section">
          <div className="tz-about-cta-panel">
            <div>
              <span className="tz-page-chip">START EXPLORING</span>
              <h2>Move from reading about ToolZite to using it.</h2>
              <p>
                Jump directly into the main surfaces and see how the platform connects discovery with practical
                workflows.
              </p>
            </div>

            <div className="tz-about-cta-links">
              {CTA_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="tz-about-cta-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
