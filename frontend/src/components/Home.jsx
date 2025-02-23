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

const Home = () => {
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
      // Fisher-Yates Shuffle Algorithm
      const shuffled = [...data.products].sort(() => Math.random() - 0.5);
      setShuffledProducts(shuffled);
    }
  }, [data?.products]); // Runs only when data changes

  const columnSize = keyword ? 4 : 4;

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"ToolZite - Your Ultimate AI Toolkit"} />

      {/* Added top margin to push search below header */}
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "110px" }}>
        <div className="col-6 col-md-6">
          <Search />
        </div>
      </div>

      {/* Reduced the space between category filters and search */}
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "-30px" }}>
        <div className="col-8 col-6">
          <Filters />
        </div>
      </div>

      <div className="row">
        <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary"></h1>

          <section id="products" className="mt-5">
            <div className="row">
              {shuffledProducts.map((product) => (
                <ProductItem key={product._id} product={product} columnSize={columnSize} />
              ))}
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

export default Home;
