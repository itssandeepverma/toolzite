import React, { useEffect, useRef, useState } from "react";
import { useCreateBlogMutation, useUpdateBlogMutation, useUploadBlogImageMutation } from "../../redux/api/blogApi";
import toast from "react-hot-toast";

const BlogEditor = ({ onClose, initial }) => {
  const editorRef = useRef(null);
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadBlogImageMutation();
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    title: "",
    summary: "",
    tags: "",
    heroImageUrl: "",
    heroImagePublicId: "",
  });
  const blogIdRef = useRef(initial?.id || initial?._id || null);

  useEffect(() => {
    if (!initial) return;
    setForm({
      title: initial.title || "",
      summary: initial.summary || "",
      tags: (initial.tags || []).join(", "),
      heroImageUrl: initial.heroImage?.url || "",
      heroImagePublicId: initial.heroImage?.public_id || "",
    });
    if (editorRef.current && initial.content) {
      editorRef.current.innerHTML = initial.content;
    }
  }, [initial]);

  const exec = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  };

  const uploadAndInsert = async (file) => {
    try {
      setStatus("Uploading image…");
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = reader.result;
          const res = await uploadImage({ image: base64 }).unwrap();
          exec("insertImage", res.url);
          if (!form.heroImageUrl) {
            setForm((p) => ({ ...p, heroImageUrl: res.url, heroImagePublicId: res.public_id || "" }));
          }
          setStatus("Image uploaded");
          setTimeout(() => setStatus(""), 1200);
        } catch (err) {
          setStatus("");
          toast.error(err?.data?.message || "Upload failed");
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setStatus("");
      toast.error("Upload failed");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith("image/")) {
      uploadAndInsert(file);
    }
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.addEventListener("drop", handleDrop);
    return () => editor.removeEventListener("drop", handleDrop);
  }, []);

  const onSubmit = async () => {
    const editorEl = editorRef.current;
    const content = editorEl?.innerHTML || "";
    const firstImg = editorEl?.querySelector("img")?.getAttribute("src") || "";
    const heroUrl = form.heroImageUrl || firstImg;

    const payload = {
      title: form.title,
      summary: form.summary,
      content,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      heroImageUrl: heroUrl,
      heroImagePublicId: form.heroImagePublicId || undefined,
    };

    const contentText = editorEl?.innerText?.trim() || "";

    if (!payload.title || !payload.summary || !contentText || !payload.heroImageUrl) {
      toast.error("Title, summary, content, and an image (hero or first inline) are required");
      return;
    }

    try {
      setStatus(blogIdRef.current ? "Updating…" : "Publishing…");
      if (blogIdRef.current) {
        await updateBlog({ id: blogIdRef.current, body: payload }).unwrap();
        toast.success("Blog updated");
      } else {
        await createBlog(payload).unwrap();
        toast.success("Blog published");
      }
      setStatus("");
      onClose?.();
    } catch (err) {
      setStatus("");
      toast.error(err?.data?.message || "Could not publish");
    }
  };

  return (
    <div className="blog-editor-overlay">
      <div className="blog-editor">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0 text-white">New AI Blog</h3>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-light btn-sm" onClick={onClose} disabled={isLoading || isUploading || isUpdating}>
              Close
            </button>
            <button className="btn btn-primary btn-sm" onClick={onSubmit} disabled={isLoading || isUploading || isUpdating}>
              {isUpdating ? "Updating…" : isLoading ? "Publishing…" : isUploading ? "Uploading…" : "Publish"}
            </button>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Summary (1–2 sentences)"
              value={form.summary}
              onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
            />
          </div>
          <div className="col-md-6 d-flex gap-2 align-items-center">
            <input
              type="url"
              className="form-control"
              placeholder="Hero image URL (auto-set on upload)"
              value={form.heroImageUrl}
              onChange={(e) => setForm((p) => ({ ...p, heroImageUrl: e.target.value }))}
            />
            <label className="btn btn-outline-light btn-sm mb-0">
              Upload
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadAndInsert(file);
                }}
              />
            </label>
          </div>
        </div>

        <div className="editor-toolbar mb-2">
          <button onClick={() => exec("bold")} title="Bold">
            B
          </button>
          <button onClick={() => exec("italic")} title="Italic">
            I
          </button>
          <button onClick={() => exec("underline")} title="Underline">
            U
          </button>
          <button onClick={() => exec("insertUnorderedList")} title="Bullet list">
            • List
          </button>
          <button onClick={() => exec("formatBlock", "H2")} title="Heading">
            H2
          </button>
          <button onClick={() => exec("formatBlock", "BLOCKQUOTE")} title="Quote">
            “”
          </button>
          <label className="mb-0 ms-auto file-btn" title="Insert image">
            📷
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadAndInsert(file);
              }}
            />
          </label>
        </div>

        <div
          ref={editorRef}
          className="editor-surface"
          contentEditable
          placeholder="Write your AI blog here… Drag & drop images or use the camera icon."
          suppressContentEditableWarning
        ></div>
        {status && <div className="text-gray-300 mt-2 small">{status}</div>}
      </div>

      <style>
        {`
          .blog-editor-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(8px);
            z-index: 2000;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 32px 16px;
            overflow-y: auto;
          }
          .blog-editor {
            width: min(1100px, 100%);
            background: #0f172a;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            padding: 18px;
            box-shadow: 0 18px 48px rgba(0,0,0,0.45);
          }
          .editor-toolbar {
            display: flex;
            gap: 8px;
            align-items: center;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            padding: 6px 8px;
            border-radius: 10px;
          }
          .editor-toolbar button {
            background: transparent;
            color: #e5e7eb;
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 8px;
            padding: 6px 10px;
            cursor: pointer;
            font-weight: 700;
          }
          .editor-toolbar button:hover {
            background: rgba(255,255,255,0.08);
          }
          .editor-surface {
            min-height: 320px;
            background: #0b1323;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            padding: 14px;
            color: #e5e7eb;
            line-height: 1.7;
          }
          .editor-surface:focus {
            outline: 2px solid rgba(0, 156, 62, 0.6);
          }
          .editor-surface img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            margin: 10px 0;
          }
          .file-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 34px;
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 8px;
            cursor: pointer;
            color: #e5e7eb;
            background: transparent;
            position: relative;
            overflow: hidden;
          }
          .file-btn input {
            position: absolute;
            inset: 0;
            opacity: 0;
            cursor: pointer;
          }
          @media (max-width: 768px) {
            .blog-editor {
              padding: 14px;
            }
            .editor-surface {
              min-height: 260px;
            }
            .editor-toolbar {
              flex-wrap: wrap;
              gap: 6px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BlogEditor;
