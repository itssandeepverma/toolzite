import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import ProductItem from "../product/ProductItem";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "../layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "../layout/Filters";
import Search from "../layout/Search";

const ListProducts = () => {
  let [searchParams] = useSearchParams();
  const [shuffledProducts, setShuffledProducts] = useState([]);

  const page = searchParams.get("page") || 1;
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
      // Shuffle products randomly using Fisher-Yates algorithm
      const shuffled = [...data.products].sort(() => Math.random() - 0.5);
      setShuffledProducts(shuffled);
    }
  }, [data?.products]); // Runs only when data changes

  const columnSize = 4;

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"ToolZite - Your Ultimate AI Toolkit"} />

      {/* Search Box */}
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "110px" }}>
        <div className="col-6 col-md-6">
          <Search />
        </div>
      </div>

      {/* Search Result Text - Shown Only When Searching */}
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

      {/* Filters Section */}
      <div id="filters" className="d-flex justify-content-center align-items-center" style={{ marginTop: "-40px" }}>
        <div className="col-8 col-6">
          <Filters />
        </div>
      </div>

      <div className="row">
        <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
          <section id="products" className="mt-5">
            <div className="row">
              {shuffledProducts.length > 0 ? (
                shuffledProducts.map((product) => (
                  <ProductItem key={product._id} product={product} columnSize={columnSize} />
                ))
              ) : (
                <h4 className="text-center text-light">No Ai tool found.</h4>
              )}
            </div>
          </section>

          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          />
        </div>
      </div>
    </>
  );
};

export default ListProducts;
