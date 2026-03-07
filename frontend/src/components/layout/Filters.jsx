import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../../constants/constants";

const Filters = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Function to update search parameters and reset page to 1
  const updateSearchParams = (key, value) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }

    // Reset page to 1 whenever a filter is applied
    nextParams.set("page", "1");

    navigate(`${window.location.pathname}?${nextParams.toString()}`);

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

  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    return searchParams.get(checkboxType) === checkboxValue;
  };

  return (
    <div className="tz-filter-card">
      <h3>Category</h3>
      <div className="tz-filter-pills">
        {PRODUCT_CATEGORIES?.map((category, index) => (
          <div key={index} className="tz-filter-option">
            <input
              className="tz-filter-input"
              type="checkbox"
              name="category"
              id={`check-${index}`}
              value={category}
              defaultChecked={defaultCheckHandler("category", category)}
              onChange={(e) => handleClick(e.target)}
            />
            <label className="tz-filter-pill" htmlFor={`check-${index}`}>
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
