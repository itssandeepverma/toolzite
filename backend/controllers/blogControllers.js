import Blog from "../models/blog.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { upload_file } from "../utils/cloudinary.js";

const slugify = (text) =>
  text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

const mapBlog = (blog, includeContent = false) => ({
  id: blog._id,
  title: blog.title,
  slug: blog.slug,
  summary: blog.summary,
  content: includeContent ? blog.content : undefined,
  tags: blog.tags || [],
  categories: blog.categories || [],
  heroImage: blog.heroImage,
  publishedAt: blog.publishedAt,
  upvoteCount: blog.upvotedBy?.length || 0,
  source: blog.source,
});

export const createBlog = catchAsyncErrors(async (req, res, next) => {
  const { title, summary, content, tags, categories, heroImageUrl, heroImagePublicId, publishedAt } =
    req.body || {};

  if (!title || !summary || !content || !heroImageUrl) {
    return next(new ErrorHandler("Title, summary, content, and heroImageUrl are required", 400));
  }

  let baseSlug = slugify(title);
  if (!baseSlug) baseSlug = `blog-${Date.now()}`;
  let slug = baseSlug;
  let exists = await Blog.findOne({ slug });
  if (exists) {
    slug = `${baseSlug}-${Date.now()}`;
  }

  const blog = await Blog.create({
    title,
    slug,
    summary,
    content,
    tags: Array.isArray(tags) ? tags.filter(Boolean) : [],
    categories: Array.isArray(categories) ? categories.filter(Boolean) : [],
    heroImage: { url: heroImageUrl, public_id: heroImagePublicId },
    publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    author: req.user?._id,
    source: "manual",
    status: "published",
  });

  res.status(201).json({ blog: mapBlog(blog, true) });
});

export const updateBlog = catchAsyncErrors(async (req, res, next) => {
  const { title, summary, content, tags, categories, heroImageUrl, heroImagePublicId, publishedAt } =
    req.body || {};

  const blog = await Blog.findById(req.params.id);
  if (!blog) return next(new ErrorHandler("Blog not found", 404));

  if (title) blog.title = title;
  if (summary) blog.summary = summary;
  if (content) blog.content = content;
  if (tags) blog.tags = Array.isArray(tags) ? tags.filter(Boolean) : [];
  if (categories) blog.categories = Array.isArray(categories) ? categories.filter(Boolean) : [];
  if (heroImageUrl) blog.heroImage = { url: heroImageUrl, public_id: heroImagePublicId };
  if (publishedAt) blog.publishedAt = new Date(publishedAt);

  // regenerate slug only if title changed
  if (title) {
    let baseSlug = slugify(title);
    if (!baseSlug) baseSlug = `blog-${Date.now()}`;
    let slug = baseSlug;
    if (blog.slug !== baseSlug) {
      let exists = await Blog.findOne({ slug, _id: { $ne: blog._id } });
      if (exists) slug = `${baseSlug}-${Date.now()}`;
      blog.slug = slug;
    }
  }

  await blog.save();

  res.status(200).json({ blog: mapBlog(blog, true) });
});

export const getBlogs = catchAsyncErrors(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  const [blogs, total] = await Promise.all([
    Blog.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit),
    Blog.countDocuments({ status: "published" }),
  ]);

  res.status(200).json({
    blogs: blogs.map((b) => mapBlog(b)),
    total,
    page,
    pages: Math.ceil(total / limit),
  });
});

export const getBlogBySlug = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findOne({ slug: req.params.slug, status: "published" });
  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  res.status(200).json({ blog: mapBlog(blog, true) });
});

export const toggleUpvote = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  const userId = req.user?._id?.toString();
  const already = blog.upvotedBy?.some((u) => u.toString() === userId);

  if (already) {
    blog.upvotedBy = blog.upvotedBy.filter((u) => u.toString() !== userId);
  } else {
    blog.upvotedBy.push(req.user._id);
  }

  await blog.save();

  res.status(200).json({
    upvoted: !already,
    upvoteCount: blog.upvotedBy.length,
  });
});

export const uploadBlogImage = catchAsyncErrors(async (req, res, next) => {
  const { image } = req.body || {};
  if (!image) return next(new ErrorHandler("Image is required", 400));

  const uploaded = await upload_file(image, "toolzite/blogs");
  res.status(200).json(uploaded);
});

export const deleteBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }
  await blog.deleteOne();
  res.status(200).json({ success: true });
});
