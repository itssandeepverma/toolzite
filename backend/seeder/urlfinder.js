// processUrls.js
import axios from "axios";

/**
 * Retrieves the original URL from a redirecting URL.
 * @param {string} redirectUrl - The URL that may redirect.
 * @returns {Promise<string>} - The original URL from the Location header if a redirect occurs.
 */
async function getOriginalUrl(redirectUrl) {
  try {
    // Attempt a GET request without following redirects
    await axios.get(redirectUrl, { maxRedirects: 0 });
    // If no redirect occurs, return the provided URL.
    return redirectUrl;
  } catch (error) {
    // If the error is due to a redirect (status code 300-399), extract the Location header.
    if (error.response && error.response.status >= 300 && error.response.status < 400) {
      return error.response.headers.location;
    } else {
      throw error;
    }
  }
}

// List of URLs to process in order
const urls = [
  "https://www.aixploria.com/out/MidJourneyV6.1",
  "https://www.aixploria.com/out/AdobeFirefly3",
  "https://www.aixploria.com/out/StableDiffusion3.5",
  "https://www.aixploria.com/out/LeonardoAI",
  "https://www.aixploria.com/out/Ideogram2.0",
  "https://www.aixploria.com/out/FLUX.1",
  "https://www.aixploria.com/out/RecraftV3",
  "https://www.aixploria.com/out/Freepik",
  "https://www.aixploria.com/out/DALL%C2%B7E3",
  "https://www.aixploria.com/out/Krea.ai",
  "https://www.aixploria.com/out/BingImageCreator",
  "https://www.aixploria.com/out/AdobeIllustrator",
  "https://www.aixploria.com/out/IllustrokeAI",
  "https://www.aixploria.com/out/Snowpixel",
  "https://www.aixploria.com/out/Sqriblr",
  "https://www.aixploria.com/out/EVEAI",
  "https://www.aixploria.com/out/MazeAI",
  "https://www.aixploria.com/out/IconifyAI",
  "https://www.aixploria.com/out/Variart",
];

/**
 * Processes all URLs by getting their original URL (if they redirect) and prints the result.
 */
async function processUrls() {
  try {
    // Map each URL to a promise that resolves to its original URL.
    const results = await Promise.all(urls.map((url) => getOriginalUrl(url)));
    
    // Print the results in the same order.
    results.forEach((originalUrl, index) => {
      console.log(`Original URL: ${urls[index]}`);
      console.log(`Processed URL: ${originalUrl}`);
      console.log("-----");
    });
  } catch (error) {
    console.error("Error processing URLs:", error.message);
  }
}



// Run the function
processUrls();
