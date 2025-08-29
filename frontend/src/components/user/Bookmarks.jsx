import React from "react";
import MetaData from "../layout/MetaData";
import { useGetMyBookmarksQuery } from "../../redux/api/userApi";
import Loader from "../layout/Loader";
import ProductItem from "../product/ProductItem";

const Bookmarks = () => {
  const { data: bookmarks, isLoading, isError } = useGetMyBookmarksQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="container" style={{ marginTop: "110px", marginBottom: "120px" }}>
      <MetaData
        title="My Bookmarks"
        description="Your bookmarked AI tools on ToolZite."
        canonical="https://www.toolzite.com/me/bookmarks"
      />

      <h1 className="text-light mb-3">My Bookmarks</h1>
      {!bookmarks?.length && (
        <p className="text-secondary">You have no bookmarks yet.</p>
      )}

      <div className="row">
        {bookmarks?.map((product) => (
          <ProductItem key={product._id} product={product} columnSize={4} />
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
