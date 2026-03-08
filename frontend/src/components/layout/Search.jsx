import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "../../constants/routes";

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
      navigate(`${APP_PATHS.aiTools}?keyword=${encodeURIComponent(keyword)}`);
    } else {
      navigate(APP_PATHS.aiTools);
    }
  };

  return (
    <form onSubmit={submitHandler} className="position-relative tz-search-form">
      <div className="input-group search-input-group">
        <input
          type="text"
          id="search_field"
          aria-describedby="search_btn"
          className="form-control"
          placeholder={animatedPlaceholder}
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          id="search_btn"
          className="btn search-btn"
          type="submit"
        >
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
