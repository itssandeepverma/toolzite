import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import NotFound from "../layout/NotFound";
import {
  getWorkspaceChildPath,
  getWorkspaceConfigByKind,
  getWorkspaceConfigBySlug,
  getWorkspaceToolPath,
} from "../../constants/routes";

const toInternalPath = (config, childPath) => {
  const childPrefix = `/${config.childSegment}/`;
  if (!childPath || !childPath.startsWith(childPrefix)) {
    return getWorkspaceToolPath(config.kind, config.defaultToolId);
  }
  return `${config.path}${childPath}`;
};

const buildEmbedSrc = (config, childPath) => `${config.origin}${childPath}?embed=1`;

const EmbeddedWorkspace = ({ kind }) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const config = useMemo(() => {
    if (kind) return getWorkspaceConfigByKind(kind);
    return getWorkspaceConfigBySlug(params.workspaceSlug);
  }, [kind, params.workspaceSlug]);
  const toolId = params.toolSlug;
  const childType = params.childType;
  const resolvedKind = config?.kind || kind;
  const [frameHeight, setFrameHeight] = useState(config?.minFrameHeight || 680);
  const [isLoaded, setIsLoaded] = useState(false);

  const hasInvalidWorkspaceRoute =
    !config || (childType && childType !== config.childSegment);

  const childPath = useMemo(() => {
    if (!config) return null;
    return getWorkspaceChildPath(config.kind, toolId);
  }, [config, toolId]);
  const iframeSrc = useMemo(() => {
    if (!config || !childPath) return null;
    return buildEmbedSrc(config, childPath);
  }, [config, childPath]);

  useEffect(() => {
    if (config) {
      setFrameHeight(config.minFrameHeight);
    }
  }, [config]);

  useEffect(() => {
    if (!config) return undefined;

    const handleMessage = (event) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (!event.data || typeof event.data !== "object") return;

      if (event.data.type === "toolzite:embed-height" && event.data.kind === resolvedKind) {
        const nextHeight = Number(event.data.height);
        if (Number.isFinite(nextHeight) && nextHeight > 0) {
          setFrameHeight(Math.max(config.minFrameHeight, Math.ceil(nextHeight) + 8));
        }
      }

      if (event.data.type === "toolzite:embed-route" && event.data.kind === resolvedKind) {
        const nextPath = toInternalPath(config, event.data.path);
        if (nextPath !== location.pathname) {
          navigate(nextPath, { replace: true });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [config, location.pathname, navigate, resolvedKind]);

  useEffect(() => {
    setIsLoaded(false);
  }, [iframeSrc]);

  if (hasInvalidWorkspaceRoute) {
    return <NotFound />;
  }

  return (
    <>
      <MetaData
        title={`${config.title} | ToolZite`}
        description={config.subtitle}
        canonical={`https://www.toolzite.com${toInternalPath(config, childPath)}`}
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
