import React from "react";
import MetaData from "../layout/MetaData";
import { FaEnvelope, FaExternalLinkAlt, FaRss } from "react-icons/fa";

const newsletters = [
  { name: "The Rundown", link: "https://rundown.ai/", description: "Daily AI news, tools, and trends for professionals.", frequency: "Daily" },
  { name: "Ben's Bites", link: "https://bensbites.co/", description: "Curated daily AI news and product launches.", frequency: "Daily" },
  { name: "TLDR AI", link: "https://tldr.tech/ai", description: "Short summaries of the latest AI news and research.", frequency: "Daily" },
  { name: "Superhuman", link: "https://www.superhuman.ai/", description: "Actionable AI news and tips for your career.", frequency: "Daily" },
  { name: "The Neuron", link: "https://theneurondaily.com/", description: "All signal, no noise. Daily AI news and tools.", frequency: "Daily" },
  { name: "AI Valley", link: "https://aivalley.ai/", description: "Get smarter about AI in 2 minutes a day.", frequency: "Daily" },
  { name: "AlphaSignal", link: "https://alphasignal.ai/", description: "Technical AI news, breakthroughs, and repos.", frequency: "Daily" },
  { name: "Prompt Engineering Daily", link: "https://www.promptengineeringdaily.com/", description: "Prompt engineering news, tips, and tools.", frequency: "Daily" },
  { name: "Future Tools", link: "https://futuretools.io/newsletter", description: "Latest AI tools, news, and trends.", frequency: "Weekly" },
  { name: "The Batch (DeepLearning.AI)", link: "https://www.deeplearning.ai/the-batch/", description: "Weekly AI news and insights from DeepLearning.AI.", frequency: "Weekly" },
  { name: "Import AI", link: "https://jack-clark.net/", description: "Jack Clark's analysis of AI research and policy.", frequency: "Weekly" },
  { name: "TheSequence", link: "https://thesequence.substack.com/", description: "In-depth ML/AI research and industry analysis.", frequency: "Weekly" },
  { name: "Not a Bot", link: "https://notabot.substack.com/", description: "Human-written daily AI news and interviews.", frequency: "Daily" },
  { name: "AI Tidbits", link: "https://aitidbits.substack.com/", description: "Weekly AI news and summaries by Sahar Mor.", frequency: "Weekly" },
  { name: "Visually AI", link: "https://visuallyai.substack.com/", description: "Generative AI news, tools, and creative tips.", frequency: "Weekly" },
  { name: "AI News You Can Use", link: "https://www.mariehaynes.com/newsletter/", description: "Marie Haynes' AI and search industry newsletter.", frequency: "2-3x/month" },
  { name: "Chain of Thought", link: "https://every.to/chain-of-thought", description: "Dan Shipper's essays on AI and the future of work.", frequency: "Weekly" },
  { name: "Latent Space", link: "https://www.latent.space/", description: "AI engineering, tools, and infrastructure news.", frequency: "Weekly" },
  { name: "Q&AI by Bloomberg", link: "https://www.bloomberg.com/account/newsletters/qa/", description: "Bloomberg's weekly Q&A on AI's impact.", frequency: "Weekly" },
  { name: "AI Insights", link: "https://www.joinaiinsights.com/", description: "Top AI news, tools, and tutorials for free.", frequency: "Weekly" },
  { name: "Sunday Signal", link: "https://sundaysignal.beehiiv.com/", description: "Weekly AI highlights and industry insights.", frequency: "Weekly" },
  { name: "AI News", link: "https://ainews.beehiiv.com/", description: "Daily AI news summaries from social and forums.", frequency: "Daily" },
  { name: "80/20 AI", link: "https://8020ai.beehiiv.com/", description: "Top 20% of AI content that matters, daily.", frequency: "Daily" },
  { name: "Machine Learning Pills", link: "https://www.josephferre.com/newsletter", description: "Concise weekly AI/ML news and tutorials.", frequency: "Weekly" },
  { name: "Prompts Daily", link: "https://promptsdaily.beehiiv.com/", description: "Daily AI news, tools, and prompt ideas.", frequency: "Daily" },
  { name: "The Algorithm (MIT)", link: "https://www.technologyreview.com/newsletter/the-algorithm/", description: "MIT's weekly AI newsletter by Melissa Heikkilä.", frequency: "Weekly" },
  { name: "The AI Exchange", link: "https://theaiexchange.beehiiv.com/", description: "AI business, product, and industry news.", frequency: "Weekly" },
  { name: "Forward Future", link: "https://www.forwardfuture.ai/", description: "Quick, insightful daily AI updates.", frequency: "Daily" },
  { name: "AI Breakfast", link: "https://aibreakfast.beehiiv.com/", description: "Curated AI news and research, 3x/week.", frequency: "3x/week" }
];

const AINewsletters = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    <MetaData 
      title="AI Newsletters – Top AI Digest Subscriptions"
      description="Curated list of AI newsletters with topics, frequency, and links. Stay informed with daily and weekly digests."
      canonical="https://www.toolzite.com/ai-newsletters"
    />
    <div className="container mx-auto px-4 py-8" style={{ marginTop: "110px" }}>
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          AI Newsletters
        </h1>
        <p className="text-gray-400 text-lg">
          Stay informed with the best AI newsletters from around the world
        </p>
      </div>
      <div className="mb-6 text-center">
        <p className="text-gray-400">
          {newsletters.length} curated newsletters
        </p>
      </div>
      <div className="row">
        {newsletters.map((newsletter, index) => (
          <div key={index} className="col-sm-12 col-md-6 col-lg-4 my-3">
            <div
              className="card product-card bg-dark text-light mx-auto"
              style={{ width: "18rem", height: "24rem", cursor: "pointer" }}
              onClick={() => window.open(newsletter.link, "_blank", "noopener,noreferrer")}
            >
              <div className="card-img-top d-flex align-items-center justify-content-center" style={{ height: "30%", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                <FaEnvelope className="text-white" style={{ fontSize: "3rem" }} />
              </div>
              <div className="card-body text-center d-flex flex-column" style={{ height: "70%" }}>
                <div style={{ height: "25%" }}>
                  <h5 className="card-title mb-2">{newsletter.name}</h5>
                  <div style={{ height: "2px", width: "80%", background: "linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32))", margin: "0 auto" }}></div>
                </div>
                <div style={{ height: "45%", overflow: "hidden" }}>
                  <p className="card-text" style={{ margin: "0 1rem" }}>{newsletter.description}</p>
                </div>
                <div style={{ height: "20%", marginBottom: "0.5rem" }} className="d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <div className="mb-1">
                      <span className="badge bg-secondary">Newsletter</span>
                    </div>
                    <div className="text-muted small d-flex align-items-center justify-content-center">
                      <FaRss className="me-1" />
                      {newsletter.frequency}
                    </div>
                  </div>
                </div>
                <div style={{ height: "10%" }} className="d-flex align-items-center justify-content-center">
                  <span className="badge bg-primary d-inline-flex align-items-center gap-1">
                    Subscribe
                    <FaExternalLinkAlt className="text-xs" />
                  </span>
                </div>
              </div>
            </div>
            <style>{`
              .product-card { width: 300px; height: 380px; border-radius: 30px; background: #212121; box-shadow: 15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60); overflow: hidden; position: relative; transition: all 0.3s ease-in-out; text-align: center; }
              .product-card:hover { box-shadow: 10px 10px 20px rgb(20, 20, 20), -10px -10px 20px rgb(50, 50, 50); transform: translateY(-5px); }
              .product-card .card-img-top { width: 100%; height: 120px; object-fit: cover; border-top-left-radius: 30px; border-top-right-radius: 30px; }
              .product-card .card-title { font-size: 16px; font-weight: bold; color: #ffffff; margin-top: 10px; }
              .product-card .card-text { font-size: 12px; color: #b0b0b0; opacity: 0.8; margin: 5px 0; }
              .badge:hover { background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32)) !important; color: white !important; }
              @media (max-width: 768px) { .product-card { width: 100%; max-width: 300px; } }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AINewsletters; 
