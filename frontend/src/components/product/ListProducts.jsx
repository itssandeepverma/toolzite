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

const ListProducts = () => {
  let [searchParams] = useSearchParams();
  const [shuffledProducts, setShuffledProducts] = useState([]);

  // Get query params
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  // Build params object for the query
  const params = { page, keyword };
  if (min !== null) params.min = min;
  if (max !== null) params.max = max;
  if (category !== null) params.category = category;
  if (ratings !== null) params.ratings = ratings;

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

  return (
    <>
      <MetaData title="ToolZite - Your Ultimate AI Toolkit" />

      {/* Search Box at the top */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginTop: "110px" }}
      >
        <div className="col-10 col-md-8">
          <Search />
        </div>
      </div>

      {/* Show "results for" text only if keyword is present */}
      {keyword && (
        <div className="d-flex justify-content-center align-items-center mt-3">
          <h2 className="text-secondary text-center">
            Showing results for:{" "}
            <span
              style={{
                background: "linear-gradient(to right, #18ad53, #a3d733)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
              }}
            >
              "{keyword}"
            </span>
          </h2>
        </div>
      )}

      {/* Main Container: Left = Filters, Right = Products */}
      <div className="row mx-0 mt-4 mb-4">
        {/* Filters Section */}
        <div
          className="col-12 col-md-3 mb-4"
          style={{
            position: "sticky",
            top: "120px",
            maxHeight: "calc(100vh - 130px)",
            overflowY: "auto",
            padding: "0 20px",
            zIndex: 1000,
          }}
        >
          <Filters />
        </div>

        {/* Product Listing Section */}
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
                <h4 className="text-center text-light">No AI tool found.</h4>
              )}
            </div>
          </section>

          {/* Pagination below product listing */}
          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          />
        </div>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .row {
              display: flex;
              flex-direction: column;
            }
            
            .col-12 {
              width: 100%;
              position: relative !important;
              top: 0 !important;
              max-height: none !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default ListProducts;
