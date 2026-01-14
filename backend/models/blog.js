import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    categories: [
      {
        type: String,
        trim: true,
      },
    ],
    heroImage: {
      url: {
        type: String,
        required: true,
      },
      public_id: String,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    source: {
      type: String,
      default: "manual",
    },
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

blogSchema.virtual("upvoteCount").get(function () {
  return this.upvotedBy?.length || 0;
});

export default mongoose.model("Blog", blogSchema);
