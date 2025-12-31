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

const AI_NEWS_CACHE_KEY = "aiNewsCacheV2";
const AI_NEWS_CACHE_TTL_MS = 6 * 60 * 60 * 1000; // align with AINews

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

  // Warm AI News cache in the background so the /ai-news page loads instantly
  useEffect(() => {
    const warmAiNews = async () => {
      try {
        const raw = localStorage.getItem(AI_NEWS_CACHE_KEY);
        if (raw) {
          const { lastUpdated } = JSON.parse(raw);
          const ts = lastUpdated ? new Date(lastUpdated) : null;
          const fresh = ts && Date.now() - ts.getTime() < AI_NEWS_CACHE_TTL_MS;
          if (fresh) return;
        }

        const res = await fetch("/api/v1/ai-news");
        if (!res.ok) return;

        const payload = await res.json();
        const ts = payload?.lastUpdated || new Date().toISOString();
        localStorage.setItem(
          AI_NEWS_CACHE_KEY,
          JSON.stringify({ items: payload?.items || [], lastUpdated: ts })
        );
      } catch {
        // best-effort; ignore errors
      }
    };

    warmAiNews();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData 
        title="AI Tools Library – ToolZite"
        description="Discover AI agents, image/video generators, voice cloning, and more across 25+ categories. Curated tools updated regularly."
        canonical="https://www.toolzite.com/"
        image="https://www.toolzite.com/images/og-default.jpg"
        keywords="AI tools, AI agents, image generators, voice cloning, productivity tools"
      />

      <div className="container-fluid px-0" style={{ marginTop: "100px" }}>
        <HeroSection />
      </div>

      {/* Search Bar */}
      <div style={{ position: "relative" }}>
        <div
          className="container"
          style={{
            position: "relative",
            width: "min(90%, 640px)",
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

      <div style={{ padding: "0px" }}>
        <AiToolsMarquee />
      </div>

      <div style={{ padding: "50px", marginBottom: "100px", marginTop: "100px" }}>
        <NewsMagJobs />
      </div>

      <div  style={{  marginTop: "-20px", marginBottom: "70px" }}>
        <FAQ />
      </div>

    </>
  );
};

export default Home;
