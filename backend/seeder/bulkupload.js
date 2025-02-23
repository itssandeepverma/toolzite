// processAll.js
import { captureAndUpload } from "./screenshotsaver.js";

const urls = [
  "https://midjourney.com/",
  "https://prf.hn/l/EJXxwOp",
  "https://stablediffusionweb.com/",
  "https://leonardo.ai/?via=aixploria",
  "https://ideogram.ai/",
  "https://blackforestlabs.ai/",
  "https://www.recraft.ai/ai-image-generator",
  "https://www.freepik.com/",
  "https://openai.com/dall-e-3",
  "https://www.krea.ai/",
  "https://www.bing.com/create",
  "https://prf.hn/l/1eXXBvz",
  "https://illustroke.com/",
  "https://snowpixel.app/",
  "https://sqriblr.com/",
  "https://dapp.eveai.xyz/",
  "https://maze.guru/",
  "https://www.iconifyai.com/",
  "https://variart.ai/"
];

async function processUrls() {
  for (const url of urls) {
    try {
      const secureUrl = await captureAndUpload(url);
      console.log(`Screenshot for ${url} uploaded: ${secureUrl}`);
    } catch (error) {
      console.error(`Error processing ${url}:`, error);
    }
  }
}

processUrls();
