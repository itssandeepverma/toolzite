import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    link: {
      type: String,
      required: [true, "Please enter product Link"]
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product category"],
      enum: {
        values: [
          "AI Agents",
          "Video Generators",
          "Chat & Assistants",
          "Voice Cloning & Synthesis",
          "3D Models & Assets",
          "Virtual AI Characters",
          "Detection Tools",
          "Utility Apps",
          "Featured Picks",
          "Creative Tools",
          "Digital Art & Design",
          "Code Assistance",
          "Assistive Technology",
          "Audio & Sound Editing",
          "Automation & Workflows",
          "Avatar & Character Creators",
          "Business Solutions",
          "Chatbot Builders",
          "Customer Support",
          "Data & Insights",
          "Dating & Relationships",
          "Developer Resources",
          "E-Commerce & Shops",
          "Email Tools & Automation",
          "Education & Learning",
          "Software Extensions",
          "Face Swap & Deepfake",
          "Fashion & Style",
          "Files & Spreadsheet Tools",
          "Finance & Budgeting",
          "Future Tech",
          "Gaming & Interactive Tools",
          "GitHub Projects",
          "Healthcare & Medicine",
          "HR & Hiring Tools",
          "Image Editing & Design",
          "Image Generators",
          "Latest Innovations",
          "Legal & Compliance Tools",
          "Life Assistance",
          "Large Language Models (LLM)",
          "Logo & Branding",
          "Marketing & Advertising",
          "Memory & Productivity Boosters",
          "Music & Sound Generation",
          "No-Code & Low-Code Platforms",
          "Presentation & Slide Tools",
          "Productivity & Organization",
          "Prompts & Writing Aids",
          "Real Estate & Architecture",
          "Research & Science",
          "Robots & Devices",
          "Sales & Conversion Tools",
          "Search Engines",
          "Social Media & Networking",
          "Storytelling & Writing",
          "Text Summarization",
          "Top SuperTools",
          "Text & Content Generators",
          "Text-to-Speech",
          "Video Creation",
          "Unique Projects",
          "Transcription & Audio to Text",
          "Language Translation",
          "Travel & Trip Planning",
          "Video Editing",
          "Video Generators",
          "Voice Cloning & Synthesis",
          "Web Design & Development",
          "Writing & SEO Optimization",
        ],
        message: "Please select a valid category",
      },
    }
    ,
    Type: {
      type: String,
      // required: [true, "Please enter product Type"],
    },
    stock: {
      type: Number,
      // required: [true, "Please enter product stock"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Product", productSchema);