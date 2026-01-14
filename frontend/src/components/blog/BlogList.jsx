import React, { useState } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDeleteBlogMutation, useGetBlogsQuery } from "../../redux/api/blogApi";
import { useSelector } from "react-redux";
import BlogEditor from "./BlogEditor";

const BlogList = () => {
  const [page, setPage] = useState(1);
  const [showEditor, setShowEditor] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetBlogsQuery(page);
  const [deleteBlog] = useDeleteBlogMutation();

  const blogs = data?.blogs || [];

  const nextPage = () => {
    if (data?.pages && page < data.pages) setPage((p) => p + 1);
  };
  const prevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <MetaData
        title="AI Blogs – Insights & Updates"
        description="Read the latest AI blogs and announcements from ToolZite."
        canonical="https://www.toolzite.com/ai-blogs"
      />

      <div className="container py-5" style={{ marginTop: "110px" }}>
        <div className="text-center mb-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            AI Blogs
          </h1>
          <p className="text-gray-300">Fresh AI posts, updates, and insights</p>
          {user?.role === "admin" && (
            <button className="btn btn-primary btn-sm mt-3" onClick={() => setShowEditor(true)}>
              + Create blog
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="text-center text-gray-300">Loading blogs…</div>
        ) : (
          <div className="row">
            {blogs.map((blog) => (
              <div key={blog.slug} className="col-sm-12 col-md-6 col-lg-4 my-3">
                <div className="blog-card h-100 d-flex flex-column position-relative">
                  {user?.role === "admin" && (
                    <div className="position-absolute top-0 end-0 p-2 d-flex gap-2">
                      <Link to={`/ai-blogs/${blog.slug}`} className="btn btn-sm btn-gradient">View</Link>
                      <button
                        className="btn btn-sm btn-outline-gradient"
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
                      <Link to={`/ai-blogs/${blog.slug}`} className="btn btn-sm btn-gradient">
                        Edit
                      </Link>
                    </div>
                  )}
                  <Link to={`/ai-blogs/${blog.slug}`} className="text-decoration-none flex-grow-1 d-flex flex-column">
                    <div
                      className="blog-hero"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.65)), url(${blog.heroImage?.url})`,
                      }}
                    />
                    <div className="p-3 flex-grow-1 d-flex flex-column">
                      <h5 className="mb-2 text-white">{blog.title}</h5>
                      <p className="text-gray-300 mb-3" style={{ minHeight: "72px" }}>
                        {blog.summary}
                      </p>
                      <div className="d-flex flex-wrap gap-2 mt-auto">
                        {(blog.tags || []).slice(0, 3).map((tag) => (
                          <span key={tag} className="badge bg-secondary text-uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="px-3 pb-3 text-sm text-gray-400">
                      {new Date(blog.publishedAt).toLocaleDateString()}
                      <span className="ms-3">▲ {blog.upvoteCount || 0}</span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {data?.pages > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            <button className="btn btn-outline-light btn-sm" onClick={prevPage} disabled={page === 1}>
              Prev
            </button>
            <span className="text-gray-300">
              Page {page} of {data.pages}
            </span>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={nextPage}
              disabled={page === data.pages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {showEditor && <BlogEditor onClose={() => setShowEditor(false)} />}

      <style>
        {`
          .blog-card {
            border-radius: 18px;
            background: #111827;
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 16px 40px rgba(0,0,0,0.35);
            overflow: hidden;
            transition: transform 0.18s ease, box-shadow 0.18s ease;
          }
          .blog-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 46px rgba(0,0,0,0.45);
          }
          .blog-hero {
            height: 160px;
            background-size: cover;
            background-position: center;
          }
          .btn-gradient {
            background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
            color: #fff;
            border: none;
          }
          .btn-outline-gradient {
            color: #fff;
            border: 1px solid rgba(172, 236, 32, 0.6);
            background: transparent;
          }
          .btn-outline-gradient:hover {
            background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
            color: #fff;
          }
        `}
      </style>
    </div>
  );
};

export default BlogList;
