import dotenv from "dotenv";
import puppeteer from "puppeteer";
import { v2 as cloudinary } from "cloudinary";

dotenv.config({ path: "backend/config/config.env" });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extracts a clean domain name from a URL.
 * Example: "https://www.animeai.app" → "animeai_app"
 */


/**
 * Captures a screenshot of a website and uploads it to Cloudinary.
 * @param {string} url - The website URL.
 * @returns {Promise<string>} - The secure URL of the uploaded screenshot.
 */
async function captureAndUpload(name,url) {
   
  // Launch Puppeteer
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

   const publicId = name.toLowerCase().replace(/\s/g, "_");

  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    // Capture a screenshot of the viewport
    const screenshotBuffer = await page.screenshot({ fullPage: false });

    await browser.close();

    // Upload the screenshot to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "toolzite/products",
          public_id: publicId, // Ensures the correct naming
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

    return uploadResult.secure_url;
  } catch (error) {
    console.error(`Error capturing screenshot for ${url}:`, error.message);
    await browser.close();
    return null;
  }
}

export { captureAndUpload };
