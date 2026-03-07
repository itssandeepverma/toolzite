import React from "react";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import MetaData from "../layout/MetaData";
import ResourceCard from "../layout/ResourceCard";

const jobBoards = [
  { name: "AI Jobs", link: "https://aijobs.ai/", description: "The leading job board for AI, ML, and Data Science roles.", location: "Global" },
  { name: "DataScienceJobs", link: "https://www.datasciencejobs.com/", description: "Data science and AI jobs worldwide.", location: "Global" },
  { name: "Towards AI Jobs", link: "https://jobs.towardsai.net/", description: "Curated AI and ML jobs from the Towards AI community.", location: "Global" },
  { name: "Untapped.io", link: "https://www.untapped.io/", description: "Diversity-focused AI and tech job board.", location: "Global" },
  { name: "Adzuna AI Jobs", link: "https://www.adzuna.com/", description: "Global job search engine with AI/ML roles.", location: "Global" },
  { name: "Jooble AI Jobs", link: "https://jooble.org/jobs-artificial-intelligence", description: "International AI and data science job aggregator.", location: "Global" },
  { name: "FlexJobs AI", link: "https://www.flexjobs.com/", description: "Remote and flexible AI/ML jobs.", location: "Global" },
  { name: "Underdog.io", link: "https://underdog.io/", description: "Connects AI talent with top startups.", location: "US/Remote" },
  { name: "Starbridge Partners", link: "https://www.starbridgepartners.com/", description: "Executive search for AI, ML, and data science roles.", location: "US" },
  { name: "Jobillico", link: "https://www.jobillico.com/", description: "Canadian job board with AI and tech roles.", location: "Canada" },
  { name: "The AI Job Board", link: "https://theaijobboard.com/", description: "AI and ML job board for global opportunities.", location: "Global" },
  { name: "AI Career Hub", link: "https://aicareerhub.com/", description: "Comprehensive AI career platform.", location: "Global" },
  { name: "AI Talent", link: "https://aitalent.com/", description: "AI recruitment platform for top talent.", location: "Global" },
  { name: "ML Jobs", link: "https://mljobs.com/", description: "Machine learning jobs from startups to enterprises.", location: "Global" },
  { name: "Deep Learning Jobs", link: "https://deeplearningjobs.com/", description: "Deep learning engineering and research jobs.", location: "Global" },
  { name: "AI Startup Jobs", link: "https://aistartupjobs.com/", description: "AI startup and emerging tech job board.", location: "Global" },
  { name: "AI Research Jobs", link: "https://airesearchjobs.com/", description: "Research positions in AI and ML.", location: "Global" },
  { name: "AI Healthcare Jobs", link: "https://aihealthcarejobs.com/", description: "AI roles in healthcare and biotech.", location: "Global" },
  { name: "AI Finance Jobs", link: "https://aifinancejobs.com/", description: "AI and ML jobs in fintech and finance.", location: "Global" },
  { name: "AI Gaming Jobs", link: "https://aigamingjobs.com/", description: "AI jobs in game development and entertainment.", location: "Global" },
  { name: "AI Security Jobs", link: "https://aisecurityjobs.com/", description: "AI security and adversarial ML jobs.", location: "Global" },
  { name: "AI Ethics Jobs", link: "https://aiethicsjobs.com/", description: "AI ethics and responsible AI roles.", location: "Global" },
  { name: "AI Policy Jobs", link: "https://aipolicyjobs.com/", description: "AI policy, governance, and regulatory jobs.", location: "Global" },
  { name: "AI Education Jobs", link: "https://aieducationjobs.com/", description: "AI education and training jobs.", location: "Global" },
  { name: "AI Consulting Jobs", link: "https://aiconsultingjobs.com/", description: "AI consulting and advisory roles.", location: "Global" },
  { name: "AI Product Jobs", link: "https://aiproductjobs.com/", description: "AI product management and development jobs.", location: "Global" },
  { name: "AI Sales Jobs", link: "https://aisalesjobs.com/", description: "AI sales and business development jobs.", location: "Global" },
  { name: "AI Marketing Jobs", link: "https://aimarketingjobs.com/", description: "AI marketing and growth jobs.", location: "Global" },
  { name: "AI Operations Jobs", link: "https://aioperationsjobs.com/", description: "AI operations and infrastructure jobs.", location: "Global" },
  { name: "AI Legal Jobs", link: "https://ailegaljobs.com/", description: "AI legal and compliance jobs.", location: "Global" },
  { name: "AI HR Jobs", link: "https://aihrjobs.com/", description: "AI human resources and talent acquisition jobs.", location: "Global" },
  { name: "AI Design Jobs", link: "https://aidesignjobs.com/", description: "AI design and user experience jobs.", location: "Global" },
  { name: "AI Testing Jobs", link: "https://aitestingjobs.com/", description: "AI testing and QA jobs.", location: "Global" },
  { name: "AI Support Jobs", link: "https://aisupportjobs.com/", description: "AI customer and technical support jobs.", location: "Global" },
  { name: "AI Freelance", link: "https://aifreelance.com/", description: "Freelance and contract AI opportunities.", location: "Global" },
];

const AIJobs = () => (
  <>
    <MetaData
      title="AI Jobs – ML, Data, and Research Roles"
      description="Curated AI roles across ML engineering, data science, and research from top companies worldwide."
      canonical="https://www.toolzite.com/ai-jobs"
    />

    <div className="tz-resource-page">
      <div className="tz-resource-page-inner">
        <div className="tz-resource-page-hero">
          <h1>AI Jobs</h1>
          <p>Discover AI job opportunities from top companies worldwide.</p>
        </div>

        <p className="tz-resource-count">{jobBoards.length} curated job boards</p>

        <div className="tz-card-grid">
          {jobBoards.map((jobBoard) => (
            <ResourceCard
              key={jobBoard.name}
              title={jobBoard.name}
              description={jobBoard.description}
              href={jobBoard.link}
              ctaLabel="Browse jobs"
              tag="Job Board"
              meta={
                <span className="d-inline-flex align-items-center gap-2">
                  <FaMapMarkerAlt aria-hidden="true" />
                  <span>{jobBoard.location}</span>
                </span>
              }
              Icon={FaBriefcase}
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default AIJobs;
