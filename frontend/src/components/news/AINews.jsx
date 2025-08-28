import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { FaExternalLinkAlt, FaNewspaper, FaClock, FaGlobe } from "react-icons/fa";

// ---------- Feeds ----------
const FEEDS = [
  { name: "MIT Technology Review – AI", url: "https://www.technologyreview.com/feed/tag/ai/" },
  { name: "TechCrunch – AI", url: "https://techcrunch.com/tag/artificial-intelligence/feed/" },
  { name: "The Verge – AI", url: "https://www.theverge.com/artificial-intelligence/rss/index.xml" },
  { name: "VentureBeat – AI", url: "https://venturebeat.com/category/ai/feed/" },
  { name: "Ars Technica – AI", url: "https://arstechnica.com/information-technology/feed/" },
  { name: "NYT – AI", url: "https://rss.nytimes.com/services/xml/rss/nyt/ArtificialIntelligence.xml" },

  { name: "Google DeepMind", url: "https://deepmind.google/discover/blog/rss.xml" },
  { name: "Google AI Blog", url: "https://ai.googleblog.com/feeds/posts/default?alt=rss" },
  { name: "Meta AI", url: "https://ai.meta.com/blog/rss/" },
  { name: "OpenAI", url: "https://openai.com/blog/rss.xml" },
  { name: "Microsoft Research Blog", url: "https://www.microsoft.com/en-us/research/feed/" },
  { name: "Anthropic", url: "https://www.anthropic.com/news/rss.xml" },

  { name: "NVIDIA Technical Blog (AI)", url: "https://developer.nvidia.com/blog/tag/ai/feed/" },
  { name: "Stability AI", url: "https://stability.ai/blog/rss.xml" },
  { name: "Hugging Face Blog", url: "https://huggingface.co/blog/feed.xml" },

  { name: "AI Policy – Brookings", url: "https://www.brookings.edu/topic/artificial-intelligence/feed/" },
  { name: "The Gradient", url: "https://thegradient.pub/rss/" },
  { name: "Alignment Forum (Hot)", url: "https://www.alignmentforum.org/feed.xml?view=curated" },
];

// Public CORS helper
const proxy = (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

// Helpers
const stripHTML = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return (div.textContent || div.innerText || "").trim();
};

const parseRSS = (xmlText, fallbackSource) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "text/xml");
  const items = Array.from(xml.querySelectorAll("item, entry")).map((node) => {
    const title =
      node.querySelector("title")?.textContent?.trim() ||
      node.querySelector("dc\\:title")?.textContent?.trim() ||
      "Untitled";

    const link =
      node.querySelector("link")?.getAttribute?.("href") ||
      node.querySelector("link")?.textContent?.trim() ||
      "";

    const description =
      node.querySelector("description")?.textContent ||
      node.querySelector("content")?.textContent ||
      node.querySelector("content\\:encoded")?.textContent ||
      node.querySelector("summary")?.textContent ||
      "";

    const pubRaw =
      node.querySelector("pubDate")?.textContent ||
      node.querySelector("updated")?.textContent ||
      node.querySelector("dc\\:date")?.textContent ||
      node.querySelector("published")?.textContent ||
      "";

    const source =
      xml.querySelector("channel > title")?.textContent?.trim() ||
      xml.querySelector("feed > title")?.textContent?.trim() ||
      fallbackSource ||
      "Unknown";

    const pubDate = pubRaw ? new Date(pubRaw) : null;

    return {
      title: stripHTML(title),
      link,
      description: stripHTML(description).replace(/\s+/g, " ").slice(0, 260),
      pubDate,
      source,
    };
  });

  return items;
};

const dedupeBy = (arr, keyFn) => {
  const seen = new Set();
  return arr.filter((item) => {
    const k = keyFn(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

const withinLastDays = (dt, days = 5) => {
  if (!dt) return false;
  return Date.now() - dt.getTime() <= days * 24 * 60 * 60 * 1000;
};

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

const CACHE_KEY = "aiNewsCacheV1";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

const AINews = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // first mount = true
  const [lastUpdated, setLastUpdated] = useState(null);
  const [firstLoadDone, setFirstLoadDone] = useState(false); // controls initial button hide

  // Core fetch (with one retry if too few)
  const fetchNews = async () => {
    setLoading(true);
    const run = async () => {
      const all = [];

      await Promise.all(
        FEEDS.map(async (feed) => {
          try {
            const res = await fetch(proxy(feed.url));
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const text = await res.text();
            const parsed = parseRSS(text, feed.name);
            all.push(...parsed);
          } catch {
            // silent per your request
          }
        })
      );

      const recent = all.filter((x) => withinLastDays(x.pubDate, 5));
      const deduped = dedupeBy(recent, (x) =>
        (x.link || x.title).toLowerCase().replace(/\W+/g, "")
      ).sort((a, b) => (b.pubDate?.getTime() || 0) - (a.pubDate?.getTime() || 0));

      return deduped.slice(0, 20);
    };

    let data = await run();

    // If the proxy hiccups, retry once after a short delay
    if (data.length < 6) {
      await new Promise((r) => setTimeout(r, 1200));
      data = await run();
    }

    setItems(data);
    const ts = new Date();
    setLastUpdated(ts);
    setLoading(false);
    setFirstLoadDone(true);

    // Cache it
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ items: data, lastUpdated: ts.toISOString() })
      );
    } catch {}
  };

  // On mount: 1) hydrate from cache if fresh, 2) always refresh in background
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const { items: cached, lastUpdated: lu } = JSON.parse(raw);
        const ts = lu ? new Date(lu) : null;
        const fresh = ts && Date.now() - ts.getTime() < CACHE_TTL_MS;
        if (cached?.length && fresh) {
          setItems(cached);
          setLastUpdated(ts);
          setLoading(false);      // show loaded UI immediately
          setFirstLoadDone(true); // show Refresh button immediately
        }
      }
    } catch {}

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
                : `${count} stories · Updated ${dateFormat(lastUpdated)}`}
            </div>
          </div>
        </div>

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
