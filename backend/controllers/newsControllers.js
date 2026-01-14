import { load } from "cheerio";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// RSS/Atom sources that return valid feeds without auth/CORS issues
const AI_FEEDS = [
  { name: "Google News – AI", url: "https://news.google.com/rss/search?q=artificial+intelligence&hl=en-US&gl=US&ceid=US:en" },
  { name: "TechCrunch – AI", url: "https://techcrunch.com/tag/artificial-intelligence/feed/" },
  { name: "ZDNet – AI", url: "https://www.zdnet.com/topic/artificial-intelligence/rss.xml" },
  { name: "Wired – AI", url: "https://www.wired.com/feed/tag/ai/latest/rss" },
  { name: "Microsoft Research", url: "https://www.microsoft.com/en-us/research/feed/" },
  { name: "OpenAI", url: "https://openai.com/blog/rss.xml" },
  { name: "Hugging Face Blog", url: "https://huggingface.co/blog/feed.xml" },
  { name: "Analytics Vidhya", url: "https://feeds.feedburner.com/analyticsvidhya" },
  { name: "VentureBeat AI", url: "https://feeds.feedburner.com/venturebeat/SZYF" },
  { name: "Ars Technica – IT", url: "https://arstechnica.com/information-technology/feed/" },
  { name: "The Gradient", url: "https://thegradient.pub/rss/" },
  { name: "Alignment Forum (Curated)", url: "https://www.alignmentforum.org/feed.xml?view=curated" },
  { name: "NVIDIA Developer Blog", url: "https://blogs.nvidia.com/feed/" },
];

const REQUEST_TIMEOUT_MS = 12000;
const MAX_ITEMS = 24;
const RECENCY_DAYS = 7;

const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/rss+xml,application/xml;q=0.9,*/*;q=0.8",
};

const stripTags = (html) => {
  if (!html) return "";
  const $ = load(html);
  return $.text().trim();
};

const parseFeed = (xmlText, fallbackSource) => {
  const $ = load(xmlText, { xmlMode: true, decodeEntities: true });
  const sourceTitle =
    $("channel > title").first().text().trim() ||
    $("feed > title").first().text().trim() ||
    fallbackSource ||
    "Unknown";

  const items = [];

  $("item, entry").each((_, el) => {
    const node = $(el);
    const title = stripTags(node.find("title").first().text()) || "Untitled";

    const link =
      node.find("link[rel='alternate']").attr("href") ||
      node.find("link").first().attr("href") ||
      node.find("link").first().text().trim();

    const description = stripTags(
      node.find("description").first().text() ||
        node.find("summary").first().text() ||
        node.find("content").first().text() ||
        node.find("content\\:encoded").first().text()
    );

    const pubRaw =
      node.find("pubDate").first().text() ||
      node.find("updated").first().text() ||
      node.find("published").first().text() ||
      node.find("dc\\:date").first().text();

    const pubDate = pubRaw ? new Date(pubRaw) : null;

    items.push({
      title,
      link,
      description: description.slice(0, 260),
      pubDate: pubDate && !Number.isNaN(pubDate.getTime()) ? pubDate : null,
      source: sourceTitle,
    });
  });

  return items;
};

const dedupeBy = (arr, keyFn) => {
  const seen = new Set();
  return arr.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const withinLastDays = (dt, days = RECENCY_DAYS) => {
  if (!dt) return false;
  return Date.now() - dt.getTime() <= days * 24 * 60 * 60 * 1000;
};

const fetchFeedItems = async (feed) => {
  try {
    const res = await fetch(feed.url, {
      headers: REQUEST_HEADERS,
      redirect: "follow",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const xml = await res.text();
    return parseFeed(xml, feed.name);
  } catch (err) {
    console.warn(`[ai-news] ${feed.name} failed: ${err.message}`);
    return [];
  }
};

export const getAiNews = catchAsyncErrors(async (req, res) => {
  const results = await Promise.allSettled(AI_FEEDS.map((feed) => fetchFeedItems(feed)));

  const aggregated = results.flatMap((result, idx) =>
    result.status === "fulfilled" ? result.value.map((item) => ({ ...item, source: item.source || AI_FEEDS[idx].name })) : []
  );

  const recent = aggregated
    .filter((item) => withinLastDays(item.pubDate))
    .map((item) => ({
      ...item,
      pubDate: item.pubDate ? item.pubDate.toISOString() : null,
    }));

  const deduped = dedupeBy(recent, (x) => (x.link || x.title || "").toLowerCase().replace(/\W+/g, ""))
    .sort((a, b) => (new Date(b.pubDate).getTime() || 0) - (new Date(a.pubDate).getTime() || 0))
    .slice(0, MAX_ITEMS);

  res.status(200).json({
    items: deduped,
    lastUpdated: new Date().toISOString(),
    feedsRequested: AI_FEEDS.length,
    feedsSucceeded: results.filter((r) => r.status === "fulfilled" && r.value.length).length,
  });
});
