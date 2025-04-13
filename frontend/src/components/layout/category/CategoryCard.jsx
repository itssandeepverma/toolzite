import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { useGetProductsQuery } from "../../../redux/api/productsApi";
import toast from "react-hot-toast";
import { FiExternalLink } from "react-icons/fi";
import { Rocket } from "lucide-react"; 

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data, isLoading, error, isError } = useGetProductsQuery({ category });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to fetch products.");
    }
  }, [isError, error]);

  const size = data?.filteredProductsCount
  || 0;
  console.log(size);
  console.log(data);

  useEffect(() => {
    if (data?.products) {
      setFilteredProducts(data.products.slice(0, 10)); // Display first 10 products
    }
  }, [data?.products]);

  if (isLoading) return <Loader />;

  const handleSeeAllClick = () => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div
      className="card p-3 shadow rounded-3 w-100 mx-auto"
      style={{
        backgroundColor: "rgba(94, 94, 94, 0.4)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div className="d-flex align-items-center gap-2 mb-2">
        <h3
          className="fs-5 fw-bold text-center flex-grow-1"
          style={{ color: "#bababa", fontFamily: "Poppins, sans-serif" }}
        >
          {category}
        </h3>
      </div>

      <div
        className="w-100"
        style={{
          height: "4px",
          background: "linear-gradient(to right, rgb(24, 173, 83), rgb(163, 215, 51))",
        }}
      />

      <ul className="list-unstyled mt-3">
        {filteredProducts.map((product, index) => (
          <li key={product._id} className="d-flex justify-content-between align-items-center py-1 text-light">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-semibold" style={{ color: "rgb(180, 180, 180)" }}>{index + 1}.</span>
              <img
                src={`https://www.google.com/s2/favicons?sz=32&domain=${new URL(product.link).hostname}`}
                alt={product.name}
                style={{ width: "20px", height: "20px" }}
              />
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="product-link"
              >
                {product.name}
              </a>
            </div>
            <a
              href={product.link}
              className="text-success text-decoration-none d-flex align-items-center justify-content-center"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
              }}
              onMouseEnter={(e) => {
                const svgIcon = e.currentTarget.querySelector("svg");
                if (svgIcon) svgIcon.style.color = "rgb(184, 226, 94)";
              }}
              onMouseLeave={(e) => {
                const svgIcon = e.currentTarget.querySelector("svg");
                if (svgIcon) svgIcon.style.color = "rgb(63 163 77 / 31%)";
              }}
            >
              <FiExternalLink
                size={20}
                style={{
                  color: "rgb(63 163 77 / 31%)",
                  transition: "color 0.3s ease-in-out",
                }}
              />
            </a>
          </li>
        ))}
      </ul>

      <a
        href={`/products?category=${encodeURIComponent(category)}`} // Redirect on click
        style={{
          background: "linear-gradient(to right, rgba(0, 156, 62, 0.5), rgb(172, 236, 32, 0.5))", // Match button color from image
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
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <Rocket size={22} style={{ color: "white" }} />
        See all ({size}) →
      </a>


    
      <style>
        {`
          .product-link {
            color: rgb(206, 206, 206);
            text-decoration: none;
            transition: color 0.3s ease-in-out;
          }
          .product-link:hover {
            background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default CategoryCard;
