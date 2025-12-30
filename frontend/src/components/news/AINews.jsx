import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { FaExternalLinkAlt, FaNewspaper, FaGlobe } from "react-icons/fa";

const API_ENDPOINT = "/api/v1/ai-news";
const CACHE_KEY = "aiNewsCacheV2";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

const normalizeItems = (items = []) =>
  Array.isArray(items)
    ? items.map((item) => ({
        ...item,
        pubDate: item?.pubDate ? new Date(item.pubDate) : null,
        description: item?.description || "",
      }))
    : [];

const isFresh = (ts) => ts && Date.now() - ts.getTime() < CACHE_TTL_MS;

const dateFormat = (d) =>
  d
    ? d.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

// Spinner
const Spinner = () => (
  <span
    className="inline-block align-middle"
    style={{
      width: "1rem",
      height: "1rem",
      border: "2px solid rgba(255,255,255,0.4)",
      borderTopColor: "#fff",
      borderRadius: "50%",
      display: "inline-block",
      animation: "spin 0.8s linear infinite",
    }}
  />
);

const AINews = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // first mount = true
  const [lastUpdated, setLastUpdated] = useState(null);
  const [firstLoadDone, setFirstLoadDone] = useState(false); // controls initial button hide
  const [error, setError] = useState("");

  const saveCache = (data, ts) => {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ items: data, lastUpdated: ts.toISOString() })
      );
    } catch {}
  };

  const hydrateFromCache = () => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return;

      const { items: cached, lastUpdated: lu } = JSON.parse(raw);
      const ts = lu ? new Date(lu) : null;

      if (cached?.length) {
        const normalized = normalizeItems(cached);
        setItems(normalized);
        setLastUpdated(ts);
        setLoading(false);      // show loaded UI immediately
        setFirstLoadDone(true); // show Refresh button immediately
        if (!isFresh(ts)) {
          setError("Showing cached stories while we fetch the latest.");
        }
      }
    } catch {}
  };

  // Core fetch (server proxy)
  const fetchNews = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API_ENDPOINT);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const payload = await res.json();
      const normalized = normalizeItems(payload?.items || []);
      const ts = payload?.lastUpdated ? new Date(payload.lastUpdated) : new Date();

      setItems(normalized);
      setLastUpdated(ts);
      saveCache(normalized, ts);
    } catch (err) {
      console.warn("AI news fetch failed", err);
      setError("Unable to refresh right now. Showing cached stories if available.");
    } finally {
      setLoading(false);
      setFirstLoadDone(true);
    }
  };

  // On mount: hydrate from cache, then refresh in background
  useEffect(() => {
    hydrateFromCache();
    fetchNews(); // always refresh
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const count = items.length;

  return (
    <div className="ai-news-page min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <MetaData 
        title="AI News – Latest AI Updates & Breakthroughs"
        description="Daily curated AI news from trusted sources: research, product launches, and industry updates."
        canonical="https://www.toolzite.com/ai-news"
      />
      <div className="container mx-auto px-4 py-8" style={{ marginTop: "110px" }}>
        <div className="text-center mb-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            AI News
          </h1>
          <p className="text-gray-400 text-lg">
            Daily trending AI stories from the last 4–5 days
          </p>
        </div>

        {/* Sticky control bar */}
        <div className="sticky-controls">
          <div className="controls-inner">
            {/* Hide the button only on the very first load with no cache */}
            {firstLoadDone && (
              <button
                className="refresh-btn"
                onClick={fetchNews}
                disabled={loading}
                aria-busy={loading}
                aria-live="polite"
              >
                {loading ? (
                  <>
                    <Spinner /> <span style={{ marginLeft: 8 }}>Loading…</span>
                  </>
                ) : (
                  <span>Refresh</span>
                )}
              </button>
            )}
            <div className="status-text">
              {loading && !firstLoadDone
                ? "Fetching latest…"
                : `${count} stories · Updated ${dateFormat(lastUpdated) || "just now"}`}
              {error && (
                <div className="text-red-300 text-sm mt-1">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {!loading && count === 0 && (
          <div className="text-center text-gray-400 mb-3">
            No stories available right now. Please try again shortly.
          </div>
        )}

        {/* Cards */}
        <div className="row">
          {(loading && !firstLoadDone ? Array.from({ length: 9 }) : items).map((item, idx) => (
            <div key={idx} className="col-sm-12 col-md-6 col-lg-4 my-3">
              <div className="card product-card bg-dark text-light mx-auto">
                {/* Header */}
                <div className="card-img-top d-flex align-items-center justify-content-center header-grad">
                  {loading && !firstLoadDone ? (
                    <div className="skeleton-round" />
                  ) : (
                    <FaNewspaper className="text-white" style={{ fontSize: "2.9rem" }} />
                  )}
                </div>

                {/* Body */}
                <div className="card-body d-flex flex-column text-left body-wrap">
                  {/* Title */}
                  <div className="px-3 title-zone">
                    {loading && !firstLoadDone ? (
                      <>
                        <div className="skeleton-line w-92 mb-2" />
                        <div className="skeleton-line w-70" />
                      </>
                    ) : (
                      <>
                        <h5
                          className="card-title text-base font-bold leading-snug"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            marginBottom: 8,
                          }}
                        >
                          {item.title}
                        </h5>
                        <div className="accent-bar" />
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <div className="px-3 desc-zone">
                    {loading && !firstLoadDone ? (
                      <>
                        <div className="skeleton-line w-100 mb-2" />
                        <div className="skeleton-line w-85 mb-2" />
                        <div className="skeleton-line w-70" />
                      </>
                    ) : (
                      <p
                        className="card-text text-sm text-gray-300/90 leading-relaxed"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 7,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          margin: 0,
                        }}
                      >
                        {item.description || "No summary available."}
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  {(!loading || firstLoadDone) && (
                    <div className="px-3 pb-3 mt-auto footer-zone">
                      <div className="d-flex align-items-center justify-content-between text-xs text-gray-400 mb-2">
                        <span className="inline-flex items-center gap-1">
                          <FaGlobe className="me-1" /> {item.source}
                        </span>
                        <span>{item.pubDate ? dateFormat(item.pubDate) : ""}</span>
                      </div>
                      <div className="d-flex justify-content-center">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="badge bg-primary d-inline-flex align-items-center gap-2"
                          style={{ cursor: "pointer", textDecoration: "none" }}
                        >
                          Read Original <FaExternalLinkAlt className="text-xs" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Page-scoped CSS */}
              <style>{`
                .ai-news-page .product-card {
                  width: 352px;             /* keep width */
                  height: 480px;            /* taller so footer never clips */
                  border-radius: 30px;
                  background: #212121;
                  box-shadow: 15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60);
                  overflow: hidden;
                  position: relative;
                  transition: all 0.3s ease-in-out;
                  text-align: left;
                }
                .ai-news-page .product-card:hover {
                  box-shadow: 10px 10px 20px rgb(20, 20, 20), -10px -10px 20px rgb(50, 50, 50);
                  transform: translateY(-5px);
                }

                .ai-news-page .header-grad {
                  height: 140px;
                  background: linear-gradient(135deg, #00b894 0%, #0984e3 100%);
                }
                .ai-news-page .body-wrap { height: calc(100% - 140px); padding-top: .5rem; }
                .ai-news-page .title-zone { height: 34%; overflow: hidden; }
                .ai-news-page .desc-zone { height: 44%; overflow: hidden; }
                .ai-news-page .footer-zone { height: 22%; }

                .ai-news-page .accent-bar {
                  height: 2px; width: 82%;
                  background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
                }

                /* Sticky controls (under fixed navbar) */
                .ai-news-page .sticky-controls {
                  position: sticky;
                  top: 78px;   /* tweak to your navbar height */
                  z-index: 20;
                  margin-bottom: 14px;
                }
                .ai-news-page .controls-inner {
                  display: flex; align-items: center; justify-content: center;
                  gap: 12px; padding: 8px 12px; backdrop-filter: blur(6px);
                }
                .ai-news-page .status-text { color: rgba(255,255,255,0.7); font-size: 0.9rem; }

                /* Refresh button with green→yellow hover gradient */
                .ai-news-page .refresh-btn {
                  padding: 10px 18px; border-radius: 9999px; border: none; color: #fff;
                  font-weight: 600; cursor: pointer;
                  background: linear-gradient(to right, #1e293b, #0f172a); /* base */
                  transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
                  box-shadow: 0 6px 16px rgba(0,0,0,0.35);
                  display: inline-flex; align-items: center;
                }
                .ai-news-page .refresh-btn:not(:disabled):hover {
                  background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
                  transform: translateY(-1px);
                  box-shadow: 0 10px 24px rgba(0,0,0,0.4);
                }
                .ai-news-page .refresh-btn:disabled { opacity: .75; cursor: not-allowed; }

                /* Skeleton bits */
                .ai-news-page .skeleton-round {
                  width: 2.4rem; height: 2.4rem; border-radius: 9999px; background: rgba(255,255,255,.35);
                }
                .ai-news-page .skeleton-line { height: .9rem; background: rgba(255,255,255,.15); border-radius: 8px; }
                .ai-news-page .w-92 { width: 92%; } .ai-news-page .w-70 { width: 70%; }
                .ai-news-page .w-85 { width: 85%; } .ai-news-page .w-100 { width: 100%; }

                @keyframes spin { to { transform: rotate(360deg); } }
                @media (max-width: 768px) {
                  .ai-news-page .product-card { width: 100%; max-width: 352px; }
                }
              `}</style>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AINews;
