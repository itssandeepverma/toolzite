import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .marquee {
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    margin-bottom: 1.5rem; /* Increased space between rows */
  }
  .marquee-content {
    display: flex;
    gap: 1.5rem;
    min-width: 100%;
    animation: marquee 35s linear infinite; /* Slower movement */
  }
  .reverse .marquee-content {
    animation-direction: reverse;
  }
  @keyframes marquee {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-50%);
    }
  }
  .badge-custom {
    background-color: #212529;
    color: #ffffff;
    padding: 0.75rem 1.5rem;
    border-radius: 4px; /* Less rounded */
    font-size: 1rem;
    display: inline-block;
  }
  .gradient-text {
    background: linear-gradient(to right, rgb(24, 173, 83), rgb(163, 215, 51));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .card-container {
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const tools = [
  ["ChatGPT", "MidJourney", "Stable Diffusion", "DALL-E", "Claude", "Bard", "Gemini", "Llama", "Mistral", "Perplexity"],
  ["Runway ML", "Leonardo AI", "DeepL", "Whisper", "Hugging Face", "Cohere", "Anthropic", "Playground AI", "Copy.ai", "Jasper"],
  ["OpenAI Codex", "Synthesia", "Firefly", "BigGAN", "Artbreeder", "Elicit", "Poe", "Notion AI", "Wordtune", "Replika"],
  ["Voicemod AI", "Deep Nostalgia", "This Person Does Not Exist", "Runway Gen-2", "Magenta", "Suno AI", "Kaiber", "Wonder AI", "FaceApp AI", "Remove.bg"]
];

const MarqueeRow = ({ items, reverse }) => {
  return (
    <div className={`marquee ${reverse ? "reverse" : ""}`}>
      <div className="marquee-content">
        {[...items, ...items].map((item, index) => (
          <span key={index} className={`badge-custom ${Math.random() < 0.2 ? "gradient-text" : ""}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function AiToolsMarquee() {
  return (
    <>
      <GlobalStyle />
      <div className="container text-white p-4">
        <div className="card-container" style={{padding: "1rem"}}>
          <h2 className="text-center mb-4">Trending AI Tools</h2>
          <div className="overflow-hidden">
            {tools.map((row, index) => (
              <MarqueeRow key={index} items={row} reverse={index % 2 !== 0} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}