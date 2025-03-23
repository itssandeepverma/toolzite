import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const placeholderText = "Search for any AI tool...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedPlaceholder(placeholderText.substring(0, index + 1));
      index++;

      if (index === placeholderText.length) {
        setTimeout(() => {
          index = 0;
          setAnimatedPlaceholder("");
        }, 1500); // Pause before restarting
      }
    }, 50); // Speed of typing

    return () => clearInterval(interval);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword?.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(keyword)}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <form onSubmit={submitHandler} className="position-relative">
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          aria-describedby="search_btn"
          className="form-control"
          placeholder={animatedPlaceholder}
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: "500",
            transition: "all 0.3s ease-in-out",
          }}
        />
        <button id="search_btn" className="btn" type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
