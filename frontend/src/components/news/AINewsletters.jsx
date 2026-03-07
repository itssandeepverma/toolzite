import React from "react";
import { FaEnvelope, FaRss } from "react-icons/fa";
import MetaData from "../layout/MetaData";
import ResourceCard from "../layout/ResourceCard";

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
  { name: "AI Breakfast", link: "https://aibreakfast.beehiiv.com/", description: "Curated AI news and research, 3x/week.", frequency: "3x/week" },
];

const AINewsletters = () => (
  <>
    <MetaData
      title="AI Newsletters – Top AI Digest Subscriptions"
      description="Curated list of AI newsletters with topics, frequency, and links. Stay informed with daily and weekly digests."
      canonical="https://www.toolzite.com/ai-newsletters"
    />

    <div className="tz-resource-page">
      <div className="tz-resource-page-inner">
        <div className="tz-resource-page-hero">
          <h1>AI Newsletters</h1>
          <p>Stay informed with the best AI newsletters from around the world.</p>
        </div>

        <p className="tz-resource-count">{newsletters.length} curated newsletters</p>

        <div className="tz-card-grid">
          {newsletters.map((newsletter) => (
            <ResourceCard
              key={newsletter.name}
              title={newsletter.name}
              description={newsletter.description}
              href={newsletter.link}
              ctaLabel="Subscribe"
              tag="Newsletter"
              meta={
                <span className="d-inline-flex align-items-center gap-2">
                  <FaRss aria-hidden="true" />
                  <span>{newsletter.frequency}</span>
                </span>
              }
              Icon={FaEnvelope}
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default AINewsletters;
