import React, { useState } from "react";
import { useCreateBlogMutation } from "../../redux/api/blogApi";
import MetaData from "../layout/MetaData";
import toast from "react-hot-toast";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <MetaData
        title="Publish AI Blog"
        description="Create a new AI blog post"
        canonical="https://www.toolzite.com/me/blogs/new"
      />
      <div className="container" style={{ marginTop: "120px", maxWidth: "900px" }}>
        <h1 className="text-3xl fw-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Publish AI Blog
        </h1>
        <form onSubmit={onSubmit} className="bg-gray-900 p-4 rounded-3 border border-gray-700">
          <div className="mb-3">
            <label className="form-label text-gray-300">Title</label>
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
            <label className="form-label text-gray-300">Summary</label>
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
            <label className="form-label text-gray-300">Content</label>
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
            <label className="form-label text-gray-300">Tags (comma separated)</label>
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
            <label className="form-label text-gray-300">Hero Image URL (Cloudinary)</label>
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
            <label className="form-label text-gray-300">Hero Image public_id (optional)</label>
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
