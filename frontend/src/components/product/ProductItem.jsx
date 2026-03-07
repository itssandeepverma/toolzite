import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToggleBookmarkMutation } from "../../redux/api/userApi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProductItem = ({ product, columnSize, onRemove }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [toggleBookmark] = useToggleBookmarkMutation();

  const reduxBookmarked = !!user?.bookmarks?.some?.((id) => String(id) === String(product?._id));
  const [bookmarked, setBookmarked] = useState(reduxBookmarked);

  // keep local state in sync if redux value changes (e.g., after invalidation refetch)
  useEffect(() => {
    setBookmarked(reduxBookmarked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxBookmarked, product?._id]);

  const onToggleBookmark = async () => {
    if (!isAuthenticated) {
      toast("Login to manage bookmarks", { icon: "🔒" });
      navigate("/login");
      return;
    }
    try {
      // Optimistic UI: flip immediately
      setBookmarked((prev) => !prev);
      const res = await toggleBookmark(product._id).unwrap();
      toast.success(res.bookmarked ? "Added to bookmarks" : "Removed from bookmarks");
    } catch (e) {
      // Revert if failed
      setBookmarked((prev) => !prev);
      toast.error("Could not update bookmark");
    }
  };
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${columnSize} my-3 tz-tool-col`}>
      <article className="tz-card tz-tool-card mx-auto">
        <button
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          onClick={onToggleBookmark}
          className="tz-bookmark-btn"
          title={bookmarked ? "Bookmarked" : "Add to bookmarks"}
          type="button"
        >
          {bookmarked ? (
            <FaBookmark size={18} />
          ) : (
            <FaRegBookmark size={18} />
          )}
        </button>

        <img
          src={
            (product?.images?.[0]?.url ||
            "https://res.cloudinary.com/dn3nlbjux/image/upload/v1739725471/toolzite/cosine.png").replace('http://','https://')
          }
          className="tz-tool-card-image"
          alt={product?.name || "Product Image"}
        />

        <div className="tz-tool-card-body">
          <h5 className="tz-tool-card-title">{product?.name || "Untitled Tool"}</h5>
          <p className="tz-tool-card-description">
            {product?.description ||
              "Useful AI tool to speed up your daily workflow."}
          </p>

          <div className="tz-tool-card-footer">
            {product?.category && (
              <span className="tz-tool-tag">#{product.category}</span>
            )}

            <a
              href={product?.link || "#"}
              rel="nofollow noreferrer"
              target="_blank"
              title={`Visit ${product?.name || "this product"}`}
              className="tz-tool-cta"
            >
              Explore
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {onRemove && (
            <div className="mt-3">
              <button
                className="btn btn-outline-danger btn-sm tz-tool-remove-btn"
                onClick={() => onRemove(product._id)}
                type="button"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default ProductItem;
