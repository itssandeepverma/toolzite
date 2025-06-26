import React from "react";

const ProductItem = ({ product, columnSize }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${columnSize} my-3`}>
      <div
        className="card product-card bg-dark text-light mx-auto"
        style={{ width: "18rem", height: "24rem" }}
      >
        {/* Product Image */}
        <img
          src={
            product?.images?.[0]?.url ||
            "https://res.cloudinary.com/dn3nlbjux/image/upload/v1739725471/toolzite/cosine.png"
          }
          className="card-img-top"
          alt={product?.name || "Product Image"}
          style={{
            width: "100%",
            height: "30%",
            objectFit: "cover",
          }}
        />

        {/* Card Body */}
        <div
          className="card-body text-center d-flex flex-column justify-content-center"
          style={{ height: "70%" }}
        >
          {/* Product Name */}
          <h5 className="card-title">{product?.name || "Card title"}</h5>
          {/* Gradient Underline */}
          <div
            style={{
              height: "2px",
              width: "80%",
              background: "linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32))",
              margin: "0.5rem auto",
            }}
          ></div>

          {/* Product Description with equal side margins */}
          <p className="card-text" style={{ margin: "0 1rem" }}>
            {product?.description ||
              "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </p>

          {/* Margin between description and explore button */}
          <div className="my-4">
            {/* Explore Button with Hover Effect */}
            <a
              href={product?.link || "#"}
              rel="nofollow"
              target="_blank"
              title={`Visit ${product?.name || "this product"}`}
              className="btn btn-gradient btn-sm d-inline-flex align-items-center justify-content-center explore-btn"
            >
              Explore
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="explore-icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </a>
          </div>

          {/* Product Category at the Bottom */}
          {product?.category && (
            <div className="mt-2">
              <span className="badge bg-secondary">#{product.category}</span>
            </div>
          )}
        </div>
      </div>

      {/* CSS Styles */}
      <style>
        {`
          .explore-btn {
            background: linear-gradient(to right, rgb(67, 67, 67), gray);
            border: none;
            color: white;
            padding: 0.5rem 1rem;
            transition: all 0.3s ease-in-out;
          }

          .explore-btn:hover {
            background: linear-gradient(to right, rgb(0, 156, 62,0.5), rgb(172, 236, 32,0.5));
            color: white;
          }

          .explore-btn:hover .explore-icon {
            stroke: white;
          }

          .explore-icon {
            margin-left: 0.5rem;
            height: 19px;
            width: 19px;
            transition: stroke 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default ProductItem;
