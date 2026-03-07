import React from "react";
import MetaData from "../../layout/MetaData";
import CategoryCard from "./CategoryCard";
import { PRODUCT_CATEGORIES } from "../../../constants/constants";

const ListAllCard = () => {
  return (
    <div className="tz-categories-page">
      <MetaData 
        title="All AI Categories – Explore"
        description="Explore AI Agents, Image Generators, Voice, Code Assistance, and more across ToolZite’s curated categories."
        canonical="https://www.toolzite.com/allcategory"
      />
      <div className="tz-categories-header">
        <p className="tz-auth-chip">AI TOOL CATEGORIES</p>
        <h2>Explore all categories in one place</h2>
      </div>
      <div className="tz-categories-grid">
        {PRODUCT_CATEGORIES.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default ListAllCard;
