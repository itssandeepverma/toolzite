import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useGetBlogQuery, useToggleUpvoteMutation } from "../../redux/api/blogApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import BlogEditor from "./BlogEditor";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetBlogQuery(slug);
  const [toggleUpvote] = useToggleUpvoteMutation();
  const [optimistic, setOptimistic] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const blog = data?.blog;
  const upvoteCount = optimistic ?? blog?.upvoteCount ?? 0;

  const handleUpvote = async () => {
    if (!isAuthenticated) {
      toast("Login to upvote", { icon: "🔒" });
      navigate("/login");
      return;
    }
    if (!blog?.id) return;
    try {
      const res = await toggleUpvote(blog.id).unwrap();
      setOptimistic(res.upvoteCount);
    } catch {
      toast.error("Could not update vote");
    }
  };

  const formattedDate = useMemo(() => {
    if (!blog?.publishedAt) return "";
    return new Date(blog.publishedAt).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, [blog?.publishedAt]);

  if (isLoading) {
    return <div className="text-center text-white mt-5">Loading…</div>;
  }

  if (!blog) {
    return <div className="text-center text-white mt-5">Blog not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <MetaData
        title={`${blog.title} – AI Blog`}
        description={blog.summary || "AI blog post"}
        canonical={`https://www.toolzite.com/ai-blogs/${blog.slug}`}
      />

      <div className="container" style={{ marginTop: "110px", maxWidth: "960px" }}>
        <div className="blog-hero-lg mb-4" style={{ backgroundImage: `url(${blog.heroImage?.url})` }} />

        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
          <h1 className="text-3xl md:text-4xl fw-bold mb-0">{blog.title}</h1>
          <button className="btn btn-outline-light btn-sm" onClick={handleUpvote}>
            ▲ Upvote {upvoteCount}
          </button>
          {user?.role === "admin" && (
            <button
              className="btn btn-primary btn-sm"
              style={{
                background: "linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32))",
                border: "none",
              }}
              onClick={() => setShowEditor(true)}
            >
              Edit
            </button>
          )}
        </div>
        <div className="text-gray-400 mb-3">{formattedDate}</div>

        <p className="lead text-gray-200">{blog.summary}</p>

        <div
          className="blog-content text-gray-100"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="d-flex flex-wrap gap-2 mt-4">
          {(blog.tags || []).map((tag) => (
            <span key={tag} className="badge bg-secondary text-uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style>
        {`
          .blog-hero-lg {
            width: 100%;
            height: 320px;
            border-radius: 18px;
            background-size: cover;
            background-position: center;
            box-shadow: 0 16px 40px rgba(0,0,0,0.35);
          }
          .blog-content {
            font-size: 1.05rem;
            line-height: 1.7;
          }
          .blog-content h2, .blog-content h3, .blog-content h4 {
            margin-top: 1.2rem;
            margin-bottom: 0.6rem;
            font-weight: 700;
            background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .blog-content p {
            margin-bottom: 1rem;
          }
          .blog-content ul {
            padding-left: 1.4rem;
            margin-bottom: 1rem;
          }
          .blog-content li {
            margin-bottom: 0.4rem;
          }
          .blog-content strong {
            color: #fff;
          }
        `}
      </style>
      {showEditor && (
        <BlogEditor
          onClose={() => setShowEditor(false)}
          initial={{ ...blog, id: blog.id || blog._id }}
        />
      )}
    </div>
  );
};

export default BlogDetail;
