import dotenv from "dotenv";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { v2 as cloudinary } from "cloudinary";

dotenv.config({ path: "backend/config/config.env" });

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Enable stealth mode
puppeteer.use(StealthPlugin());

/**
 * Utility delay
 */
function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * Captures a screenshot of a website and uploads to Cloudinary.
 */
async function captureAndUpload(name, url) {
  const browser = await puppeteer.launch({
    headless: true, // Run in headless mode (background process)
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
  });

  const page = await browser.newPage();

  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    );

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    console.log(`Opening URL: ${url}`);
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.waitForSelector("body", { timeout: 10000 });
    await delay(4000); // Delay after page load

    // No need to scroll, just capture the screenshot of the top portion
    const screenshotBuffer = await page.screenshot({ fullPage: false });

    const publicId = name.toLowerCase().replace(/\s+/g, "_");

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "toolzite/products",
          public_id: publicId,
          format: "png",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error.message);
            return reject(error);
          }
          resolve(result);
        }
      ).end(screenshotBuffer);
    });

    await browser.close();
    return uploadResult.secure_url;
  } catch (error) {
    console.error(`❌ Error capturing screenshot for ${url}:`, error.message);
    await browser.close();
    return null;
  }
}

export { captureAndUpload };
