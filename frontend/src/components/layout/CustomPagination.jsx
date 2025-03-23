import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
  const [currentPage, setCurrentPage] = useState(1);

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Preserve all filters when updating page number
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", pageNumber);

    const path = window.location.pathname + "?" + newSearchParams.toString();
    navigate(path);

    // Scroll to the filters section instead of products
    const filtersSection = document.getElementById("filters");
    if (filtersSection) {
      filtersSection.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        window.scrollBy(0, -100); // Move slightly above filters
      }, 300);
    }
  };

  return (
    <div className="d-flex justify-content-center my-5">
      {filteredProductsCount > resPerPage && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredProductsCount}
          onChange={setCurrentPageNo}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
          hideFirstLastPages={false}
          pageRangeDisplayed={5} // Number of pages before '...'
        />
      )}
    </div>
  );
};

export default CustomPagination;
