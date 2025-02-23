// captureAndUpload.js
import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });// Load environment vars from your specified path

import puppeteer from "puppeteer";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extracts the domain name from a URL.
 * Removes "https://", "www.", and ".com" if present.
 * For example: "https://www.aixploria.com" becomes "aixploria".
 *
 * @param {string} urlString - The URL string.
 * @returns {string} - The cleaned domain name.
 */
function getDomainName(urlString) {
    const url = new URL(urlString);
    const hostname = url.hostname; // e.g., "www.aixploria.com"
    const parts = hostname.split(".");
  
    if (parts.length === 2) {
      // e.g., ["example", "io"] => "example"
      return parts[0];
    } else if (parts.length >= 3) {
      // e.g., ["www", "aixploria", "com"] => "aixploria"
      return parts[1];
    } else {
      // Fallback if there's only 1 part or an unexpected format
      return hostname;
    }
  }

/**
 * Captures a screenshot of the homepage for the given URL and uploads it to Cloudinary.
 * The image is uploaded to the "toolzite" folder with a public ID derived from the URL's domain.
 *
 * @param {string} url - The URL to capture.
 * @returns {Promise<string>} - The secure URL of the uploaded image.
 */
async function captureAndUpload(url) {
  const domainName = getDomainName(url);

  // Launch Puppeteer headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set a narrower viewport to avoid capturing too much horizontal space
  await page.setViewport({
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
  });

  // Navigate to the homepage and wait until network is idle
  await page.goto(url, { waitUntil: "networkidle2" });

  // Capture a partial screenshot (viewport only), not the full page
  const screenshotBuffer = await page.screenshot({
    fullPage: false, // captures only the visible area (viewport)
  });

  await browser.close();

  // Add a timestamp for signing purposes
  const timestamp = Math.floor(Date.now() / 1000);

  // Upload the screenshot to Cloudinary in the "toolzite" folder with public_id = domainName
  const uploadResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "toolzite",
        public_id: domainName,
        timestamp,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(screenshotBuffer);
  });

  return uploadResult.secure_url;
}

// If the script is run directly, capture a screenshot from the URL provided via command-line.
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const url = process.argv[2] || "https://www.example.com";
  captureAndUpload(url)
    .then((secureUrl) => {
      console.log("Uploaded image URL:", secureUrl);
    })
    .catch((error) => {
      console.error("Error capturing and uploading screenshot:", error);
    });
}

export { captureAndUpload };
