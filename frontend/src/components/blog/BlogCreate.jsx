import React, { useState } from "react";
import { useCreateBlogMutation } from "../../redux/api/blogApi";
import MetaData from "../layout/MetaData";
import toast from "react-hot-toast";

const pageBackground = {
  background:
    "radial-gradient(circle at 10% 10%, rgba(90, 206, 122, 0.18), transparent 40%), radial-gradient(circle at 95% 0%, rgba(255, 180, 78, 0.16), transparent 42%), linear-gradient(180deg, #f3f5ef 0%, #eef2ea 100%)",
};

const BlogCreate = () => {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    tags: "",
    heroImageUrl: "",
    heroImagePublicId: "",
  });
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      summary: form.summary,
      content: form.content,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      heroImageUrl: form.heroImageUrl,
      heroImagePublicId: form.heroImagePublicId || undefined,
    };

    try {
      await createBlog(payload).unwrap();
      toast.success("Blog published");
      setForm({
        title: "",
        summary: "",
        content: "",
        tags: "",
        heroImageUrl: "",
        heroImagePublicId: "",
      });
    } catch (err) {
      toast.error(err?.data?.message || "Could not publish");
    }
  };

  return (
    <div className="min-h-screen text-dark" style={pageBackground}>
      <MetaData
        title="Publish AI Blog"
        description="Create a new AI blog post"
        canonical="https://www.toolzite.com/me/blogs/new"
      />
      <div className="container" style={{ marginTop: "92px", maxWidth: "900px" }}>
        <h1 className="text-3xl fw-bold mb-4 text-dark">
          Publish AI Blog
        </h1>
        <form
          onSubmit={onSubmit}
          className="p-4 rounded-3 border"
          style={{ background: "rgba(255, 255, 255, 0.88)", borderColor: "rgba(28, 60, 42, 0.12)" }}
        >
          <div className="mb-3">
            <label className="form-label text-dark">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={form.title}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Summary</label>
            <input
              type="text"
              name="summary"
              className="form-control"
              value={form.summary}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Content</label>
            <textarea
              name="content"
              className="form-control"
              rows="10"
              value={form.content}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              className="form-control"
              value={form.tags}
              onChange={onChange}
              placeholder="ai, research, tooling"
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Hero Image URL (Cloudinary)</label>
            <input
              type="url"
              name="heroImageUrl"
              className="form-control"
              value={form.heroImageUrl}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-dark">Hero Image public_id (optional)</label>
            <input
              type="text"
              name="heroImagePublicId"
              className="form-control"
              value={form.heroImagePublicId}
              onChange={onChange}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? "Publishing…" : "Publish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogCreate;
