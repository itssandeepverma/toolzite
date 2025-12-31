import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import CardsRow from "./Row";
import { Rocket } from "lucide-react"; // Import rocket icon from lucide-react
import { FEATURED_CATEGORIES } from "./categoriesData";

const CategorySection = () => {
  const navigate = useNavigate(); // Hook for redirection

  const categories = useMemo(() => FEATURED_CATEGORIES, []);

  // Function to split categories into chunks of 10
  const chunkArray = (array, chunkSize) => {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, i) =>
      array.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
  };

  // Memoized category chunks for performance
  const categoryChunks = useMemo(() => chunkArray(categories, 10), [categories]);

  return (
    <div style={{ position: "relative" }}>
      {/* Render rows of category cards */}
      {categoryChunks.map((chunk, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            zIndex: 10,
            marginLeft: index % 2 === 0 ? "-100px" : "20px",
            marginBottom: "20px",
          }}
        >
          <CardsRow categories={chunk} />
        </div>
      ))}

      {/* Fading div below category cards */}
      <div
        style={{
          position: "relative",
          zIndex: 500, // Higher than category cards
          width: "100%",
          height: "120px",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9))",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-90px",
        }}
      >
        <a
          href="/allcategory"
          className="explore-all-btn"
          style={{
            background: "linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32, 0.7))",
            color: "#fff",
            fontSize: "18px",
            padding: "14px 28px",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Rocket size={22} style={{ color: "white" }} className="rocket-icon" />
          Click here to explore all categories
        </a>

        <style>
          {`
            .explore-all-btn {
              animation: pulse 2s ease-in-out infinite, glow 3s ease-in-out infinite alternate;
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              max-width: none;
              width: auto;
              text-align: center;
              white-space: nowrap;
            }

            .explore-all-btn:hover {
              transform: translateY(-3px) scale(1.05);
              box-shadow: 0 8px 25px rgba(0, 156, 62, 0.4);
              animation: none;
            }

            .explore-all-btn:hover .rocket-icon {
              animation: rocketShake 0.6s ease-in-out infinite;
            }

            @media (max-width: 768px) {
              .explore-all-btn {
                font-size: 16px;
                padding: 12px 18px;
                gap: 10px;
                line-height: 1.2;
                max-width: 320px;
                width: 90vw;
                white-space: normal;
              }
            }

            @keyframes pulse {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.02);
              }
              100% {
                transform: scale(1);
              }
            }

            @keyframes glow {
              from {
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 156, 62, 0.3);
              }
              to {
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 0 30px rgba(172, 236, 32, 0.5);
              }
            }

            @keyframes rocketShake {
              0%, 100% {
                transform: rotate(0deg);
              }
              25% {
                transform: rotate(-3deg);
              }
              75% {
                transform: rotate(3deg);
              }
            }

            .explore-all-btn::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
              transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .explore-all-btn:hover::before {
              left: 100%;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default CategorySection;
