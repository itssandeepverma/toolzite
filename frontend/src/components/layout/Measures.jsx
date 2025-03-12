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
  },
  {
    id: 2,
    icon: <FaGlobe className="display-4 text-info" />,
    number: "20+",
    title: "AI Categories",
    description: "Explore AI tools categorized to fit different industries and needs effortlessly.",
  },
  {
    id: 3,
    icon: <FaLayerGroup className="display-4 text-success" />,
    number: "3,000+",
    title: "AI Tools Listed",
    description: "Browse through thousands of AI tools for all your projects with ease.",
  },
  {
    id: 4,
    icon: <FaSearch className="display-4 text-danger" />,
    number: "One-Click",
    title: "Instant AI Access",
    description: "Find and access AI tools instantly with just a single click anytime.",
  },
];

const AIStatsSection = () => {
  return (
    <div className="container py-5 text-white" >
      <div className="row text-center">
        {stats.map((stat) => (
          <div key={stat.id} className="col-md-3">
            {stat.icon}
            <h2 className="fw-bold mt-3">{stat.number}</h2>
            <h5 className="fw-semibold">{stat.title}</h5>
            <p className="text-secondary">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIStatsSection;
