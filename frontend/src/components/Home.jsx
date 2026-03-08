import React, { useEffect, useMemo, useState } from "react";
import MetaData from "./layout/MetaData";
import { PRODUCT_CATEGORIES } from "../constants/constants";
import {
  APP_PATHS,
  getWorkspaceToolPath,
} from "../constants/routes";

const AI_RESOURCE_CARDS = [
  {
    title: "AI News",
    subtitle: "Daily updates",
    description: "Latest AI launches, policy updates, and ecosystem trends.",
    href: APP_PATHS.aiNews,
    badge: "News",
  },
  {
    title: "AI Blogs",
    subtitle: "Deep dives",
    description: "Product stories, experiments, and builder insights.",
    href: APP_PATHS.aiBlogs,
    badge: "Blogs",
  },
  {
    title: "AI Newsletters",
    subtitle: "Curated picks",
    description: "Best weekly AI reads in one place.",
    href: APP_PATHS.aiNewsletters,
    badge: "Newsletter",
  },
  {
    title: "AI Papers",
    subtitle: "Research first",
    description: "Track important papers and practical takeaways.",
    href: APP_PATHS.aiPapers,
    badge: "Papers",
  },
  {
    title: "AI Jobs",
    subtitle: "Career radar",
    description: "Roles across AI engineering, product, and research.",
    href: APP_PATHS.aiJobs,
    badge: "Jobs",
  },
];

const AI_GROUPS = {
  All: PRODUCT_CATEGORIES,
  Productivity: [
    "AI Agents",
    "Chat & Assistants",
    "Utility Apps",
    "Business Solutions",
    "Data & Insights",
    "Education & Learning",
    "E-Commerce & Shops",
  ],
  Creative: [
    "Video Generators",
    "Digital Art & Design",
    "Image Generators",
    "Audio & Sound Editing",
    "Virtual AI Characters",
    "Face Swap & Deepfake",
    "3D Models & Assets",
  ],
  Developer: ["Code Assistance", "Detection Tools", "Voice Cloning & Synthesis"],
  Lifestyle: ["Dating & Relationships"],
};

const getCodeToolUrl = (id) => getWorkspaceToolPath("code", id);
const getPdfToolUrl = (id) => getWorkspaceToolPath("pdf", id);

const CODE_ALGORITHM_CARDS = [
  { id: "bubble-sort", title: "Bubble Sort", category: "Arrays", description: "Simple adjacent swap sorting." },
  { id: "merge-sort", title: "Merge Sort", category: "Arrays", description: "Divide and conquer stable sort." },
  { id: "quick-sort", title: "Quick Sort", category: "Arrays", description: "In-place partition sort." },
  { id: "two-sum", title: "Two Sum", category: "Arrays", description: "One-pass hash map pair lookup." },
  { id: "container-water", title: "Container With Most Water", category: "Arrays", description: "Two-pointer max area strategy." },
  { id: "linked-list-reverse", title: "Reverse Linked List", category: "Linked List", description: "Pointer rewiring walkthrough." },
  { id: "linked-list-reverse-recursive", title: "Reverse Linked List (Recursive)", category: "Linked List", description: "Recursive pointer reversal." },
  { id: "stack", title: "Stack Push/Pop", category: "Stacks & Queues", description: "LIFO operation visualization." },
  { id: "queue", title: "Queue Enqueue/Dequeue", category: "Stacks & Queues", description: "FIFO queue state transitions." },
  { id: "tree-traversal", title: "Binary Tree Traversal", category: "Trees", description: "Inorder traversal in motion." },
  { id: "tree-height", title: "Binary Tree Height", category: "Trees", description: "Recursive depth computation." },
  { id: "bfs", title: "Breadth-First Search", category: "Graphs", description: "Layer-wise graph traversal." },
  { id: "dfs", title: "Depth-First Search", category: "Graphs", description: "Depth-focused traversal steps." },
  { id: "n-queens", title: "N-Queens", category: "Backtracking", description: "Conflict-safe queen placements." },
  { id: "climb-stairs", title: "Climbing Stairs", category: "Dynamic Programming", description: "Count ways with DP transitions." },
  { id: "coin-change", title: "Coin Change", category: "Dynamic Programming", description: "Minimum coins for a target amount." },
];

const CODE_CATEGORY_PILLS = [
  "All",
  "Arrays",
  "Linked List",
  "Stacks & Queues",
  "Trees",
  "Graphs",
  "Backtracking",
  "Dynamic Programming",
];

const PDF_TOOL_CARDS = [
  {
    id: "compress",
    title: "Compress PDF",
    description: "Shrink file size while preserving readability.",
    subgroup: "Optimize PDF",
  },
  {
    id: "merge",
    title: "Merge PDFs",
    description: "Combine multiple PDF files into one.",
    subgroup: "Workflows",
  },
  {
    id: "split",
    title: "Split PDF",
    description: "Extract exact pages by custom ranges.",
    subgroup: "Workflows",
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert each page into downloadable images.",
    subgroup: "Convert PDF",
  },
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Create clean PDFs from images.",
    subgroup: "Convert PDF",
  },
  {
    id: "organize-pdf",
    title: "Organize PDF Pages",
    description: "Reorder and re-structure pages quickly.",
    subgroup: "Organize PDF",
  },
  {
    id: "rotate-pdf",
    title: "Rotate PDF",
    description: "Rotate all pages by 90/180/270 degrees.",
    subgroup: "Organize PDF",
  },
  {
    id: "page-numbers",
    title: "Add Page Numbers",
    description: "Auto-number pages with one click.",
    subgroup: "Edit PDF",
  },
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Extract text into DOCX format.",
    subgroup: "Convert PDF",
  },
];

const IMAGE_TOOL_CARDS = [
  {
    id: "image-reduce",
    title: "Reduce Image Size",
    description: "Compress images for faster uploads.",
    subgroup: "Optimize",
  },
  {
    id: "image-resize",
    title: "Adjust Pixels",
    description: "Resize to exact width and height.",
    subgroup: "Edit",
  },
  {
    id: "image-crop",
    title: "Crop Image",
    description: "Keep only the area you need.",
    subgroup: "Edit",
  },
  {
    id: "image-rotate",
    title: "Rotate Image",
    description: "Rotate by right-angle presets.",
    subgroup: "Edit",
  },
  {
    id: "image-signature",
    title: "Add Signature",
    description: "Overlay signature text on image.",
    subgroup: "Identity",
  },
  {
    id: "image-dob",
    title: "Stamp DOB",
    description: "Add date-of-birth text overlays.",
    subgroup: "Identity",
  },
  {
    id: "image-border",
    title: "Add Image Border",
    description: "Frame image with custom border color.",
    subgroup: "Edit",
  },
];

const TOOL_SECTIONS = [
  { id: "pdf", label: "PDF TOOLS", accent: "tz-accent-pdf" },
  { id: "ai", label: "AI TOOLS", accent: "tz-accent-ai" },
  { id: "code", label: "CODE TOOLS", accent: "tz-accent-code" },
  { id: "image", label: "IMAGE TOOLS", accent: "tz-accent-image" },
];

const SUBGROUPS = {
  pdf: ["All", "Workflows", "Organize PDF", "Optimize PDF", "Convert PDF", "Edit PDF"],
  image: ["All", "Optimize", "Edit", "Identity"],
};

const formatAiDescription = (category) => {
  const lower = category.toLowerCase();
  if (lower.includes("video")) return "Generate, edit, and publish video content with AI.";
  if (lower.includes("image")) return "Create visuals, concepts, and image assets fast.";
  if (lower.includes("code")) return "Boost software work with coding assistants and copilots.";
  if (lower.includes("business")) return "Automate workflows, ops, and internal productivity.";
  if (lower.includes("education")) return "Learning aids, tutoring, and practice accelerators.";
  if (lower.includes("chat")) return "Conversational assistants for support and tasks.";
  return "Explore active tools in this category from the Toolzite library.";
};

const Home = () => {
  const [activeSection, setActiveSection] = useState("pdf");
  const [aiFilter, setAiFilter] = useState("All");
  const [codeFilter, setCodeFilter] = useState("All");
  const [pdfFilter, setPdfFilter] = useState("All");
  const [imageFilter, setImageFilter] = useState("All");

  useEffect(() => {
    // Ensure no sticky/freeze state remains for sub-heading rows.
    document.body.classList.remove("tz-freeze-tools-head");
    document.documentElement.style.removeProperty("--tz-main-nav-height");

    return () => {
      document.body.classList.remove("tz-freeze-tools-head");
      document.documentElement.style.removeProperty("--tz-main-nav-height");
    };
  }, []);

  const aiCards = useMemo(() => {
    const activeCategories = AI_GROUPS[aiFilter] || PRODUCT_CATEGORIES;
    return activeCategories.map((category) => ({
      title: category,
      href: `${APP_PATHS.aiTools}?category=${encodeURIComponent(category)}`,
      description: formatAiDescription(category),
    }));
  }, [aiFilter]);

  const codeCards = useMemo(() => {
    if (codeFilter === "All") return CODE_ALGORITHM_CARDS;
    return CODE_ALGORITHM_CARDS.filter((tool) => tool.category === codeFilter);
  }, [codeFilter]);

  const pdfCards = useMemo(() => {
    if (pdfFilter === "All") return PDF_TOOL_CARDS;
    return PDF_TOOL_CARDS.filter((tool) => tool.subgroup === pdfFilter);
  }, [pdfFilter]);

  const imageCards = useMemo(() => {
    if (imageFilter === "All") return IMAGE_TOOL_CARDS;
    return IMAGE_TOOL_CARDS.filter((tool) => tool.subgroup === imageFilter);
  }, [imageFilter]);

  const sectionPills = useMemo(() => {
    if (activeSection === "ai") return Object.keys(AI_GROUPS);
    if (activeSection === "code") return CODE_CATEGORY_PILLS;
    if (activeSection === "pdf") return SUBGROUPS.pdf;
    return SUBGROUPS.image;
  }, [activeSection]);

  const activePill = useMemo(() => {
    if (activeSection === "ai") return aiFilter;
    if (activeSection === "code") return codeFilter;
    if (activeSection === "pdf") return pdfFilter;
    return imageFilter;
  }, [activeSection, aiFilter, codeFilter, pdfFilter, imageFilter]);

  const onPillSelect = (filter) => {
    if (activeSection === "ai") setAiFilter(filter);
    else if (activeSection === "code") setCodeFilter(filter);
    else if (activeSection === "pdf") setPdfFilter(filter);
    else setImageFilter(filter);
  };

  return (
    <>
      <MetaData
        title="Toolzite | AI, PDF, Code & Image Tools"
        description="Toolzite is your unified workspace for AI tools, PDF utilities, code visualization, and image tools."
        canonical="https://www.toolzite.com/"
        image="https://www.toolzite.com/images/og-default.jpg"
        keywords="toolzite, ai tools, code tools, pdf tools, image tools"
      />

      <main className="tz-home-page">
        <section className="tz-home-hero">
          <div className="tz-home-hero-copy">
            <p className="tz-home-badge">TOOLZITE PLATFORM</p>
            <h1>
              The Ultimate Library of <span>AI, PDF, Code and Image Tools</span>
            </h1>
            <p className="tz-home-subtitle">
              Access every tool you need to ship faster, work smarter, and get tasks done easily without switching ecosystems.
            </p>
          </div>
        </section>

        <section className="tz-home-shell">
          <div className="tz-tool-head">
            <div className="tz-section-switcher" role="tablist" aria-label="Tool sections">
              {TOOL_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  className={`tz-tab ${activeSection === section.id ? `active ${section.accent}` : ""}`}
                  onClick={() => setActiveSection(section.id)}
                  type="button"
                >
                  {section.label}
                </button>
              ))}
            </div>
            <div className="tz-subsection-pills">
              {sectionPills.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`tz-pill ${activePill === filter ? "active" : ""}`}
                  onClick={() => onPillSelect(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {activeSection === "ai" && (
            <>
              <div className="tz-card-grid tz-card-grid-small">
                {AI_RESOURCE_CARDS.map((card) => (
                  <a key={card.title} href={card.href} className="tz-card tz-card-compact">
                    <span className="tz-card-badge">{card.badge}</span>
                    <h3>{card.title}</h3>
                    <p className="tz-card-kicker">{card.subtitle}</p>
                    <p>{card.description}</p>
                  </a>
                ))}
              </div>

              <div className="tz-card-grid">
                {aiCards.map((tool) => (
                  <a key={tool.title} href={tool.href} className="tz-card">
                    <h3>{tool.title}</h3>
                    <p>{tool.description}</p>
                  </a>
                ))}
              </div>
            </>
          )}

          {activeSection === "code" && (
            <>
              <div className="tz-card-grid">
                {codeCards.map((tool) => (
                  <a
                    key={tool.id}
                    href={getCodeToolUrl(tool.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="tz-card"
                  >
                    <span className="tz-card-badge">{tool.category}</span>
                    <h3>{tool.title}</h3>
                    <p>{tool.description}</p>
                  </a>
                ))}
              </div>
            </>
          )}

          {activeSection === "pdf" && (
            <>
              <div className="tz-card-grid">
                {pdfCards.map((tool) => (
                  <a
                    key={tool.id}
                    href={getPdfToolUrl(tool.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="tz-card"
                  >
                    <span className="tz-card-badge">{tool.subgroup}</span>
                    <h3>{tool.title}</h3>
                    <p>{tool.description}</p>
                  </a>
                ))}
              </div>
            </>
          )}

          {activeSection === "image" && (
            <>
              <div className="tz-card-grid">
                {imageCards.map((tool) => (
                  <a
                    key={tool.id}
                    href={getPdfToolUrl(tool.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="tz-card"
                  >
                    <span className="tz-card-badge">{tool.subgroup}</span>
                    <h3>{tool.title}</h3>
                    <p>{tool.description}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
