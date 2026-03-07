import React, { useCallback, useEffect, useState } from "react";
import { FaGlobe, FaNewspaper } from "react-icons/fa";
import MetaData from "../layout/MetaData";
import ResourceCard from "../layout/ResourceCard";

const API_ENDPOINT = "/api/v1/ai-news";
const CACHE_KEY = "aiNewsCacheV2";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

const normalizeItems = (items = []) =>
  Array.isArray(items)
    ? items.map((item) => ({
        ...item,
        pubDate: item?.pubDate ? new Date(item.pubDate) : null,
        description: item?.description || "",
      }))
    : [];

const isFresh = (ts) => ts && Date.now() - ts.getTime() < CACHE_TTL_MS;

const dateFormat = (date) =>
  date
    ? date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

const Spinner = () => (
  <span
    aria-hidden="true"
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
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [firstLoadDone, setFirstLoadDone] = useState(false);
  const [error, setError] = useState("");

  const saveCache = useCallback((data, ts) => {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ items: data, lastUpdated: ts.toISOString() })
      );
    } catch {}
  }, []);

  const hydrateFromCache = useCallback(() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return;

      const { items: cached, lastUpdated: cachedTimestamp } = JSON.parse(raw);
      const ts = cachedTimestamp ? new Date(cachedTimestamp) : null;

      if (!cached?.length) return;

      setItems(normalizeItems(cached));
      setLastUpdated(ts);
      setLoading(false);
      setFirstLoadDone(true);

      if (!isFresh(ts)) {
        setError("Showing cached stories while fetching the latest updates.");
      }
    } catch {}
  }, []);

  const fetchNews = useCallback(async () => {
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
  }, [saveCache]);

  useEffect(() => {
    hydrateFromCache();
    fetchNews();
  }, [fetchNews, hydrateFromCache]);

  const showInitialLoading = loading && !firstLoadDone;
  const cards = showInitialLoading
    ? Array.from({ length: 9 }, (_, index) => ({
        id: `loading-${index}`,
        title: "Loading story...",
        description: "Fetching the latest AI stories and summaries.",
        source: "Updating",
      }))
    : items;

  return (
    <>
      <MetaData
        title="AI News – Latest AI Updates & Breakthroughs"
        description="Daily curated AI news from trusted sources: research, product launches, and industry updates."
        canonical="https://www.toolzite.com/ai-news"
      />

      <div className="tz-resource-page">
        <div className="tz-resource-page-inner">
          <div className="tz-resource-page-hero">
            <h1>AI News</h1>
            <p>Daily trending AI stories from the last 4 to 5 days.</p>
          </div>

          <div className="tz-resource-topbar">
            <div className="tz-resource-topbar-inner">
              {firstLoadDone ? (
                <button
                  type="button"
                  className="tz-resource-refresh-btn"
                  onClick={fetchNews}
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <span className="d-inline-flex align-items-center gap-2">
                      <Spinner />
                      <span>Loading...</span>
                    </span>
                  ) : (
                    "Refresh"
                  )}
                </button>
              ) : null}

              <div className="tz-resource-status">
                {showInitialLoading
                  ? "Fetching latest stories..."
                  : `${items.length} stories · Updated ${dateFormat(lastUpdated) || "just now"}`}
                {error ? (
                  <div className="tz-resource-status-error mt-1">{error}</div>
                ) : null}
              </div>
            </div>
          </div>

          {!loading && items.length === 0 ? (
            <p className="tz-resource-count">No stories available right now. Please try again shortly.</p>
          ) : null}

          <div className="tz-card-grid">
            {cards.map((item) => (
              <ResourceCard
                key={item.id || item.link || item.title}
                title={item.title}
                description={item.description || "No summary available."}
                href={item.link || "#"}
                ctaLabel={showInitialLoading ? "Updating" : "Read story"}
                tag={item.source || "AI News"}
                meta={
                  <span className="d-inline-flex align-items-center gap-2 flex-wrap">
                    <FaGlobe aria-hidden="true" />
                    <span>
                      {showInitialLoading
                        ? "Pulling the latest feed..."
                        : item.pubDate
                        ? dateFormat(item.pubDate)
                        : "Freshly curated"}
                    </span>
                  </span>
                }
                Icon={FaNewspaper}
                gradient="linear-gradient(135deg, #00b894 0%, #0984e3 100%)"
                disabled={showInitialLoading}
              />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default AINews;
