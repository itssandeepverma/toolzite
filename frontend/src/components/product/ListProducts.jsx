import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import ProductItem from "../product/ProductItem";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "../layout/CustomPagination";
import Filters from "../layout/Filters";
import Search from "../layout/Search";
import { APP_PATHS } from "../../constants/routes";

const ListProducts = () => {
  let [searchParams] = useSearchParams();
  const [shuffledProducts, setShuffledProducts] = useState([]);

  // Get query params
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category");
  // Removed min, max, ratings

  // Build params object for the query
  const params = { page, keyword };
  if (category !== null) params.category = category;
  // Removed min, max, ratings

  // Fetch products
  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong.");
    }
  }, [isError, error]);

  // Shuffle products on data change
  useEffect(() => {
    if (data?.products) {
      const shuffled = [...data.products].sort(() => Math.random() - 0.5);
      setShuffledProducts(shuffled);
    }
  }, [data?.products]);

  // If loading, show loader
  if (isLoading) return <Loader />;

  const columnSize = 4; // For ProductItem layout

  // Build dynamic SEO
  const pageNum = Number(page) || 1;
  const base = "https://www.toolzite.com";
  const path = APP_PATHS.aiTools;
  const canonicalParams = new URLSearchParams();
  if (category) canonicalParams.set("category", category);
  if (keyword) canonicalParams.set("keyword", keyword);
  if (pageNum > 1) canonicalParams.set("page", String(pageNum));
  const canonicalUrl = `${base}${path}${
    canonicalParams.toString() ? `?${canonicalParams.toString()}` : ""
  }`;

  const dynamicTitle = category
    ? `Browse ${category} Tools – Page ${pageNum}`
    : keyword
    ? `Results for "${keyword}" – Page ${pageNum}`
    : `All AI Tools – Page ${pageNum}`;

  const descriptionText = category
    ? `Explore the best ${category} tools on ToolZite. Browse features, links, and more.`
    : keyword
    ? `Search results for "${keyword}" on ToolZite. Discover AI tools that match your query.`
    : `Browse all AI tools on ToolZite across popular categories like Agents, Image/Video generators, and more.`;

  return (
    <>
      <MetaData 
        title={dynamicTitle}
        description={descriptionText}
        canonical={canonicalUrl}
        keywords={`${category || keyword || "AI tools"}, ToolZite`}
      />

      <div className="tz-products-page">
        <div className="d-flex justify-content-center align-items-center tz-products-search">
          <div className="col-10 col-md-8">
            <Search />
          </div>
        </div>

        {keyword && (
          <div className="d-flex justify-content-center align-items-center mt-3">
            <h2 className="text-secondary text-center">
              Showing results for:{" "}
              <span className="tz-keyword-highlight">"{keyword}"</span>
            </h2>
          </div>
        )}

        <div className="row mx-0 mt-4 mb-4">
          <div className="col-12 col-md-3 mb-4 tz-products-filter-col">
            <Filters />
          </div>

          <div className="col-12 col-md-9">
            <section id="products" className="mt-3">
              <div className="row">
                {shuffledProducts.length > 0 ? (
                  shuffledProducts.map((product) => (
                    <ProductItem
                      key={product._id}
                      product={product}
                      columnSize={columnSize}
                    />
                  ))
                ) : (
                  <h4 className="text-center">No AI tool found.</h4>
                )}
              </div>
            </section>

            <CustomPagination
              resPerPage={data?.resPerPage}
              filteredProductsCount={data?.filteredProductsCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProducts;
