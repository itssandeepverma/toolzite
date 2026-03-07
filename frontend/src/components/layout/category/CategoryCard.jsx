import React, { useEffect } from "react";
import Loader from "../Loader";
import { useGetProductsQuery } from "../../../redux/api/productsApi";
import toast from "react-hot-toast";
import { FiExternalLink } from "react-icons/fi";

const CategoryCard = ({ category }) => {
  const { data, isLoading, error, isError } = useGetProductsQuery({ category });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to fetch products.");
    }
  }, [isError, error]);

  const size = data?.filteredProductsCount || 0;
  const filteredProducts = data?.products?.slice(0, 8) || [];

  if (isLoading) return <Loader />;

  return (
    <div className="tz-card tz-category-card w-100 mx-auto">
      <div className="tz-category-card-head">
        <h3>{category}</h3>
        <span>{size} tools</span>
      </div>

      <ul className="list-unstyled tz-category-list">
        {filteredProducts.map((product, index) => (
          <li key={product._id}>
            <div className="d-flex align-items-center gap-2">
              <span className="tz-category-index">{index + 1}.</span>
              <img
                src={`https://www.google.com/s2/favicons?sz=32&domain=${new URL(product.link).hostname}`}
                alt={product.name}
                style={{ width: "20px", height: "20px" }}
              />
              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="tz-category-link"
              >
                {product.name}
              </a>
            </div>
            <a
              href={product.link}
              target="_blank"
              rel="noreferrer"
              className="tz-category-out"
            >
              <FiExternalLink size={18} />
            </a>
          </li>
        ))}
      </ul>

      <a
        href={`/products?category=${encodeURIComponent(category)}`}
        className="tz-category-cta"
      >
        See all tools ({size}) →
      </a>
    </div>
  );
};

export default CategoryCard;
