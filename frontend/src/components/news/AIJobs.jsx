import React from "react";
import { FaBriefcase, FaExternalLinkAlt, FaMapMarkerAlt } from "react-icons/fa";

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
  { name: "AI Freelance", link: "https://aifreelance.com/", description: "Freelance and contract AI opportunities.", location: "Global" }
];

const AIJobs = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    <div className="container mx-auto px-4 py-8" style={{ marginTop: "110px" }}>
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          AI Jobs
        </h1>
        <p className="text-gray-400 text-lg">
          Discover AI job opportunities from top companies worldwide
        </p>
      </div>
      <div className="mb-6 text-center">
        <p className="text-gray-400">
          {jobBoards.length} curated job boards
        </p>
      </div>
      <div className="row">
        {jobBoards.map((jobBoard, index) => (
          <div key={index} className="col-sm-12 col-md-6 col-lg-4 my-3">
            <div
              className="card product-card bg-dark text-light mx-auto"
              style={{ width: "18rem", height: "24rem", cursor: "pointer" }}
              onClick={() => window.open(jobBoard.link, "_blank", "noopener,noreferrer")}
            >
              <div className="card-img-top d-flex align-items-center justify-content-center" style={{ height: "30%", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                <FaBriefcase className="text-white" style={{ fontSize: "3rem" }} />
              </div>
              <div className="card-body text-center d-flex flex-column" style={{ height: "70%" }}>
                <div style={{ height: "25%" }}>
                  <h5 className="card-title mb-2">{jobBoard.name}</h5>
                  <div style={{ height: "2px", width: "80%", background: "linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32))", margin: "0 auto" }}></div>
                </div>
                <div style={{ height: "45%", overflow: "hidden" }}>
                  <p className="card-text" style={{ margin: "0 1rem" }}>{jobBoard.description}</p>
                </div>
                <div style={{ height: "20%", marginBottom: "0.5rem" }} className="d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <div className="mb-1">
                      <span className="badge bg-secondary">Job Board</span>
                    </div>
                    <div className="text-muted small d-flex align-items-center justify-content-center">
                      <FaMapMarkerAlt className="me-1" />
                      {jobBoard.location}
                    </div>
                  </div>
                </div>
                <div style={{ height: "10%" }} className="d-flex align-items-center justify-content-center">
                  <span className="badge bg-primary d-inline-flex align-items-center gap-1">
                    Browse Jobs
                    <FaExternalLinkAlt className="text-xs" />
                  </span>
                </div>
              </div>
            </div>
            <style>{`
              .product-card { width: 300px; height: 380px; border-radius: 30px; background: #212121; box-shadow: 15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60); overflow: hidden; position: relative; transition: all 0.3s ease-in-out; text-align: center; }
              .product-card:hover { box-shadow: 10px 10px 20px rgb(20, 20, 20), -10px -10px 20px rgb(50, 50, 50); transform: translateY(-5px); }
              .product-card .card-img-top { width: 100%; height: 120px; object-fit: cover; border-top-left-radius: 30px; border-top-right-radius: 30px; }
              .product-card .card-title { font-size: 16px; font-weight: bold; color: #ffffff; margin-top: 10px; }
              .product-card .card-text { font-size: 12px; color: #b0b0b0; opacity: 0.8; margin: 5px 0; }
              .badge:hover { background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32)) !important; color: white !important; }
              @media (max-width: 768px) { .product-card { width: 100%; max-width: 300px; } }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AIJobs; 