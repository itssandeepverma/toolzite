import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const WORKSPACE_CONFIG = {
  code: {
    title: "ToolZite Code Tools",
    subtitle: "Algorithm walkthroughs, readable code, and visual interview prep inside the ToolZite shell.",
    badge: "TOOLZITE WORKSPACE",
    section: "Code Tools",
    origin: "https://code.toolzite.com",
    defaultChildPath: "/algorithms/two-sum",
    internalBasePath: "/code-tools",
    childBasePath: "/algorithms/",
    minFrameHeight: 680,
  },
  pdf: {
    title: "ToolZite PDF Tools",
    subtitle: "Document, image, and browser-side utility workflows embedded directly into ToolZite.",
    badge: "TOOLZITE WORKSPACE",
    section: "PDF Tools",
    origin: "https://pdf.toolzite.com",
    defaultChildPath: "/tools/compress",
    internalBasePath: "/pdf-tools",
    childBasePath: "/tools/",
    minFrameHeight: 980,
  },
};

const getChildPath = (kind, slug) => {
  const config = WORKSPACE_CONFIG[kind];
  if (!slug) return config.defaultChildPath;
  return `${config.childBasePath}${slug}`;
};

const toInternalPath = (kind, childPath) => {
  const config = WORKSPACE_CONFIG[kind];
  if (!childPath || !childPath.startsWith(config.childBasePath)) {
    return `${config.internalBasePath}${config.defaultChildPath}`;
  }
  return `${config.internalBasePath}${childPath}`;
};

const buildEmbedSrc = (kind, childPath) => {
  const config = WORKSPACE_CONFIG[kind];
  return `${config.origin}${childPath}?embed=1`;
};

const EmbeddedWorkspace = ({ kind }) => {
  const config = WORKSPACE_CONFIG[kind];
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const [frameHeight, setFrameHeight] = useState(config.minFrameHeight);
  const [isLoaded, setIsLoaded] = useState(false);

  const slug = kind === "code" ? params.slug : params.toolId;
  const childPath = useMemo(() => getChildPath(kind, slug), [kind, slug]);
  const iframeSrc = useMemo(() => buildEmbedSrc(kind, childPath), [kind, childPath]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (!event.data || typeof event.data !== "object") return;

      if (event.data.type === "toolzite:embed-height" && event.data.kind === kind) {
        const nextHeight = Number(event.data.height);
        if (Number.isFinite(nextHeight) && nextHeight > 0) {
          setFrameHeight(Math.max(config.minFrameHeight, Math.ceil(nextHeight) + 8));
        }
      }

      if (event.data.type === "toolzite:embed-route" && event.data.kind === kind) {
        const nextPath = toInternalPath(kind, event.data.path);
        if (nextPath !== location.pathname) {
          navigate(nextPath, { replace: true });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [config.minFrameHeight, kind, location.pathname, navigate]);

  useEffect(() => {
    setIsLoaded(false);
  }, [iframeSrc]);

  return (
    <>
      <MetaData
        title={`${config.title} | ToolZite`}
        description={config.subtitle}
        canonical={`https://www.toolzite.com${toInternalPath(kind, childPath)}`}
        image="https://www.toolzite.com/images/og-default.jpg"
        keywords={`toolzite, ${config.section.toLowerCase()}, embedded tools`}
      />

      <main className="tz-embed-page">
        <div className="tz-embed-shell">
          <section className="tz-embed-frame-shell">
            {!isLoaded && (
              <div className="tz-embed-loader" aria-live="polite">
                <Loader height="min(72vh, 980px)" />
              </div>
            )}

            <iframe
              ref={iframeRef}
              title={config.title}
              src={iframeSrc}
              className="tz-embed-frame"
              style={{ height: `${frameHeight}px`, opacity: isLoaded ? 1 : 0 }}
              onLoad={() => setIsLoaded(true)}
            />
          </section>
        </div>
      </main>
    </>
  );
};

export default EmbeddedWorkspace;
