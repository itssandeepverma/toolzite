import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import CardsRow from "./Row";
import { Rocket } from "lucide-react"; // Import rocket icon from lucide-react

const CategorySection = () => {
  const navigate = useNavigate(); // Hook for redirection

  // Category list
  const categories = useMemo(
    () => [
      "AI Agents",
      "Video Generators",
      "Chat & Assistants",
      "Voice Cloning & Synthesis",
      "3D Models & Assets",
      "Virtual Agents",
      "Detection Tools",
      "Utility Apps",
      "Featured Picks",
      "Creative Tools",
      "Digital Art & Design",
      "Code Assistance",
      "Assistive Technology",
      "Audio & Sound Editing",
      "Automation & Workflows",
      "Avatar & Character Creators",
      "Business Solutions",
      "Chatbot Builders",
      "Customer Support",
      "Data & Insights",
      "Dating & Relationships",
      "Developer Resources",
      "E-Commerce & Shops",
      "Email Tools & Automation",
      "Education & Learning",
      "Software Extensions",
      "Face Swap & Deepfake",
      "Fashion & Style",
      "Files & Spreadsheet Tools",
      "Finance & Budgeting",
    ],
    []
  );

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
        <button
          onClick={() => navigate("/allcategory")} // Redirect on click
          style={{
            background: "linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32,0.7))", // Match button color from image
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
          }}
        >
          <Rocket size={22} style={{ color: "white" }} />
          Explore All Categories
        </button>
      </div>
    </div>
  );
};

export default CategorySection;
