export const APP_PATHS = {
  home: "/",
  about: "/about",
  terms: "/terms-and-conditions",
  aiTools: "/ai-tools",
  aiToolsLegacy: "/products",
  allCategories: "/allcategory",
  aiNews: "/ai-news",
  aiBlogs: "/ai-blogs",
  aiNewsletters: "/ai-newsletters",
  aiJobs: "/ai-jobs",
  aiPapers: "/ai-papers",
  codeTools: "/code-tools",
  pdfTools: "/pdf-tools",
};

export const WORKSPACE_ROUTES = {
  code: {
    kind: "code",
    slug: "code-tools",
    path: APP_PATHS.codeTools,
    childSegment: "algorithms",
    defaultToolId: "two-sum",
    title: "ToolZite Code Tools",
    subtitle: "Algorithm walkthroughs, readable code, and visual interview prep inside the ToolZite shell.",
    badge: "TOOLZITE WORKSPACE",
    section: "Code Tools",
    origin: "https://code.toolzite.com",
    minFrameHeight: 680,
  },
  pdf: {
    kind: "pdf",
    slug: "pdf-tools",
    path: APP_PATHS.pdfTools,
    childSegment: "tools",
    defaultToolId: "compress",
    title: "ToolZite PDF Tools",
    subtitle: "Document, image, and browser-side utility workflows embedded directly into ToolZite.",
    badge: "TOOLZITE WORKSPACE",
    section: "PDF Tools",
    origin: "https://pdf.toolzite.com",
    minFrameHeight: 980,
  },
};

const workspaceConfigs = Object.values(WORKSPACE_ROUTES);

export const getWorkspaceConfigByKind = (kind) => WORKSPACE_ROUTES[kind] || null;

export const getWorkspaceConfigBySlug = (slug) =>
  workspaceConfigs.find((config) => config.slug === slug) || null;

export const getWorkspaceChildPath = (kind, toolId) => {
  const config = getWorkspaceConfigByKind(kind);
  if (!config) return null;

  const resolvedToolId = toolId || config.defaultToolId;
  return `/${config.childSegment}/${resolvedToolId}`;
};

export const getWorkspaceToolPath = (kind, toolId) => {
  const config = getWorkspaceConfigByKind(kind);
  const childPath = getWorkspaceChildPath(kind, toolId);

  if (!config || !childPath) return null;
  return `${config.path}${childPath}`;
};
