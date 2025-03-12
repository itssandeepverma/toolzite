import React, { useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";
import Search from "./layout/Search";
import HeroSection from "./layout/Hero";
import CardsRow from "./layout/Row";
import FlexBox from "./layout/Measures";
import AiToolsMarquee from "./layout/AiToolMoov";

const Home = () => {
  let [searchParams] = useSearchParams();
  const [shuffledProducts, setShuffledProducts] = useState([]);

  const page = searchParams.get("page ") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params = { page, keyword };
  if (min !== null) params.min = min;
  if (max !== null) params.max = max;
  if (category !== null) params.category = category;
  if (ratings !== null) params.ratings = ratings;

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  useEffect(() => {
    if (data?.products) {
      // Fisher-Yates Shuffle Algorithm (simple version)
      const shuffled = [...data.products].sort(() => Math.random() - 0.5);
      setShuffledProducts(shuffled);
    }
  }, [data?.products]);

  // Array of 30 category strings
  const categories = [
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
  ];

  // Helper function to split the array into chunks of 10
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Split the 30 categories into three chunks of 10 items each
  const categoryChunks = chunkArray(categories, 10);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"ToolZite - Your Ultimate AI Toolkit"} />

      <div className="container-fluid px-0" style={{ marginTop: "100px" }}>
        <HeroSection />
      </div>


      {/* Parent container providing stacking context */}
      <div style={{ position: "relative" }}>
        {/* Search container with higher z-index */}
        <div
          className="container"
          style={{
            position: "relative",
            width: "40%",
            margin: "0 auto",
            marginTop: "-35px",
            zIndex: 1000,
          }}
        >
          <Search />
        </div>

        {/* Render three rows of category cards */}
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
      </div>

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
          style={{
            background: "linear-gradient(90deg,rgb(184, 226, 94), #3FA34D)", // Yellow-Green theme
            color: "#fff",
            fontSize: "18px",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          Explore All Categories
        </button>
      </div>


      <div style={{
            background: "linear-gradient(black, #2a2a2a)",
            padding: "50px",
      }}>
        <FlexBox />
      </div>

      <div style={{
            padding: "50px",
      }}>
        <AiToolsMarquee/>
      </div>

         
    </>
  );
};

export default Home;
