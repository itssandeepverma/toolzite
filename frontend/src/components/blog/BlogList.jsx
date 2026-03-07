import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import ResourceCard from "../layout/ResourceCard";
import BlogEditor from "./BlogEditor";
import { useDeleteBlogMutation, useGetBlogsQuery } from "../../redux/api/blogApi";

const normalizeImageUrl = (url) => (url ? url.replace("http://", "https://") : "");

const BlogList = () => {
  const [page, setPage] = useState(1);
  const [showEditor, setShowEditor] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetBlogsQuery(page);
  const [deleteBlog] = useDeleteBlogMutation();

  const blogs = data?.blogs || [];

  const nextPage = () => {
    if (data?.pages && page < data.pages) setPage((current) => current + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((current) => current - 1);
  };

  return (
    <>
      <MetaData
        title="AI Blogs – Insights & Updates"
        description="Read the latest AI blogs and announcements from ToolZite."
        canonical="https://www.toolzite.com/ai-blogs"
      />

      <div className="tz-resource-page">
        <div className="tz-resource-page-inner">
          <div className="tz-resource-page-hero">
            <h1>AI Blogs</h1>
            <p>Fresh AI posts, updates, and insights.</p>
            {user?.role === "admin" ? (
              <button className="btn btn-primary btn-sm mt-3" onClick={() => setShowEditor(true)}>
                + Create blog
              </button>
            ) : null}
          </div>

          {isLoading ? (
            <p className="tz-resource-count">Loading blogs...</p>
          ) : blogs.length > 0 ? (
            <div className="tz-card-grid">
              {blogs.map((blog) => (
                <ResourceCard
                  key={blog.slug}
                  title={blog.title}
                  description={blog.summary}
                  href={`/ai-blogs/${blog.slug}`}
                  ctaLabel="Read post"
                  tag={(blog.tags || [])[0] || "Blog"}
                  meta={`${new Date(blog.publishedAt).toLocaleDateString()} · ▲ ${blog.upvoteCount || 0}`}
                  external={false}
                  imageUrl={normalizeImageUrl(blog.heroImage?.url)}
                  topActions={
                    user?.role === "admin" ? (
                      <>
                        <Link to={`/ai-blogs/${blog.slug}`} className="tz-resource-admin-btn">
                          View
                        </Link>
                        <button
                          type="button"
                          className="tz-resource-admin-btn"
                          onClick={async () => {
                            const confirmed = window.confirm("Delete this blog?");
                            if (!confirmed) return;

                            try {
                              await deleteBlog(blog.id || blog._id).unwrap();
                            } catch (err) {
                              // eslint-disable-next-line no-console
                              console.error(err);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </>
                    ) : null
                  }
                />
              ))}
            </div>
          ) : (
            <p className="tz-resource-count">No blogs available yet.</p>
          )}

          {data?.pages > 1 ? (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
              <button className="btn btn-outline-secondary btn-sm" onClick={prevPage} disabled={page === 1}>
                Prev
              </button>
              <span className="text-secondary">
                Page {page} of {data.pages}
              </span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={nextPage}
                disabled={page === data.pages}
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {showEditor ? <BlogEditor onClose={() => setShowEditor(false)} /> : null}
    </>
  );
};

export default BlogList;
