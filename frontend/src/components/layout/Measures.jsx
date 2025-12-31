import React from "react";
import { FaBolt, FaGlobe, FaLayerGroup, FaSearch } from "react-icons/fa";

// Define stats data
const stats = [
  {
    id: 1,
    icon: <FaBolt className="display-4 text-warning" />,
    number: "50+",
    title: "New AI Tools Weekly",
    description: "Discover the latest AI tools added every week for maximum efficiency.",
    link: "/products",
  },
  {
    id: 2,
    icon: <FaGlobe className="display-4 text-info" />,
    number: "20+",
    title: "AI Categories",
    description: "Explore AI tools categorized to fit different industries and needs effortlessly.",
    link: "/allcategory",
  },
  {
    id: 3,
    icon: <FaLayerGroup className="display-4 text-success" />,
    number: "3,000+",
    title: "AI Tools Listed",
    description: "Browse through thousands of AI tools for all your projects with ease.",
    link: "/products",
  },
  {
    id: 4,
    icon: <FaSearch className="display-4 text-danger" />,
    number: "One-Click",
    title: "Instant AI Access",
    description: "Find and access AI tools instantly with just a single click anytime.",
    link: "/products",
  },
];

const AIStatsSection = () => {
  return (
    <div className="container py-5 text-white" >
      <div className="row text-center">
        {stats.map((stat) => (
          <div key={stat.id} className="col-md-3">
            <a
              href={stat.link}
              className="text-decoration-none text-white d-block p-3 h-100 stat-tile"
              style={{ borderRadius: "16px" }}
            >
              {stat.icon}
              <h2 className="fw-bold mt-3">{stat.number}</h2>
              <h5 className="fw-semibold">{stat.title}</h5>
              <p className="text-secondary">{stat.description}</p>
            </a>
          </div>
        ))}
      </div>

      <style>
        {`
          .stat-tile {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
          }
          .stat-tile:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 26px rgba(0,0,0,0.25);
          }
        `}
      </style>
    </div>
  );
};

export default AIStatsSection;
