import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Search from "./layout/Search";
import HeroSection from "./layout/Hero";
import FlexBox from "./layout/Measures";
import AiToolsMarquee from "./layout/AiToolMoov";
import NewsMagJobs from "./layout/NewsMagJobs";
import CategorySection from "./layout/ExploreAllCategories";
import Loader from "./layout/Loader";
import AI_AgentsPage from "./layout/category/ListAllCard";
import FAQ from "./layout/FAQ";

const Home = () => {
  let [searchParams] = useSearchParams();

  const { data, isLoading, error, isError } = useGetProductsQuery({
    page: searchParams.get("page") || 1,
    keyword: searchParams.get("keyword") || "",
    category: searchParams.get("category"),
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title="ToolZite - Your Ultimate AI Toolkit" />

      <div className="container-fluid px-0" style={{ marginTop: "100px" }}>
        <HeroSection />
      </div>

      {/* Search Bar */}
      <div style={{ position: "relative" }}>
        <div
          className="container"
          style={{
            position: "relative",
            width: "40%",
            margin: "0 auto",
            marginTop: "-35px",
            zIndex: 100,
          }}
        >
          <Search />
        </div>

        {/* Category Section */}
        <CategorySection />
      </div>

      {/* Other Sections */}
      <div style={{ background: "linear-gradient(black, #2a2a2a)", padding: "50px" }}>
        <FlexBox />
      </div>

      <div style={{ padding: "50px" }}>
        <AiToolsMarquee />
      </div>

      <div style={{ padding: "50px", marginBottom: "100px" }}>
        <NewsMagJobs />
      </div>

      <div  style={{  marginTop: "-20px", marginBottom: "70px" }}>
        <FAQ />
      </div>

    </>
  );
};

export default Home;
