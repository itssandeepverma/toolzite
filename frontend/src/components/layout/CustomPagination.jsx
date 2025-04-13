import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
  const [currentPage, setCurrentPage] = useState(1);

  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Update search params manually and redirect using full href
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", pageNumber);

    const path = window.location.pathname + "?" + newSearchParams.toString();
    window.location.href = path; // <- THIS triggers a full page reload and resets scroll
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
          pageRangeDisplayed={5}
        />
      )}
    </div>
  );
};

export default CustomPagination;
