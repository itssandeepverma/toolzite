import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helpers";
import { PRODUCT_CATEGORIES } from "../../constants/constants";

const Filters = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("min")) setMin(searchParams.get("min"));
    if (searchParams.has("max")) setMax(searchParams.get("max"));
  }, [searchParams]);

  // Function to update search parameters and reset page to 1
  const updateSearchParams = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }

    // Reset page to 1 whenever a filter is applied
    searchParams.set("page", "1");

    navigate(`${window.location.pathname}?${searchParams.toString()}`);

    // On mobile, jump to the first result after applying filters
    if (window.matchMedia("(max-width: 768px)").matches) {
      setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  // Handle Category & Ratings filter
  const handleClick = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    updateSearchParams(checkbox.name, checkbox.checked ? checkbox.value : null);
  };

  // Handle price filter
  const handleButtonClick = (e) => {
    e.preventDefault();
    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);
    
    // Reset page to 1 when price filter is applied
    searchParams.set("page", "1");

    navigate(`${window.location.pathname}?${searchParams.toString()}`);

    if (window.matchMedia("(max-width: 768px)").matches) {
      setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    return searchParams.get(checkboxType) === checkboxValue;
  };

  return (
    <div
      className="card p-3 filter"
      style={{
        color: "gray",
        borderRadius: "1rem",
        backgroundColor: "#2b2a2a",
      }}
    >
      <h3 style={{ color: "gray", textAlign: "center" }}>Category</h3>
      <hr style={{ borderColor: "gray" }} />
      <div className="d-flex flex-wrap justify-content-center">
        {PRODUCT_CATEGORIES?.map((category, index) => (
          <div key={index} className="form-check me-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="category"
              id={`check-${index}`}
              value={category}
              defaultChecked={defaultCheckHandler("category", category)}
              onClick={(e) => handleClick(e.target)}
              style={{ accentColor: "gray" }}
            />
            <label
              className="form-check-label"
              htmlFor={`check-${index}`}
              style={{ color: "gray" }}
            >
              {category}
            </label>
          </div>
        ))}
      </div>

      {/* Price Filter Section
      <h3 style={{ color: "gray", textAlign: "center", marginTop: "15px" }}>
        Price
      </h3>
      <hr style={{ borderColor: "gray" }} />
      <div className="d-flex justify-content-center">
        <input
          type="number"
          placeholder="Min"
          className="form-control me-2"
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max"
          className="form-control me-2"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleButtonClick}>
          Apply
        </button>
      </div> */}
    </div>
  );
};

export default Filters;
