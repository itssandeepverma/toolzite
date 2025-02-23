import fs from "fs";
import csv from "csv-parser";
import { getOriginalUrl } from "./urlFinder.js";
import { captureAndUpload } from "./screenshotSaver.js";
// import { saveDataLocally } from "./dataProcessor.js";
import { seedDatabase } from "./seeder.js"; // Import the seedDatabase function

// Function to process the CSV
async function processCSV(filePath) {
  const results = [];
  const batchSize = 5; // Process in batches of 5 rows

  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        rows.push(row); // Collect all rows into an array
      })
      .on("end", async () => {
        console.log("CSV parsing complete!");

        // Process in batches of 5
        for (let i = 0; i < rows.length; i += batchSize) {
          const batch = rows.slice(i, i + batchSize);
          try {
            await processBatch(batch, results);
            console.log(`Processed batch ${Math.floor(i / batchSize) + 1}`);
          } catch (error) {
            console.error("Error processing batch:", error);
          }
        }

        // Save data and seed the database
        await saveDataLocally(results);
        try {
          await seedDatabase(); // Seed the database after all batches are processed
          console.log("Database seeded successfully!");

          // Delete output.json after successful seeding
          const filePath = 'backend/pipeline/output.json';
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log("Deleted output.json after successful database seeding.");
          }

          resolve();
        } catch (error) {
          console.error("Error seeding database:", error);
          reject(error);
        }
      })
      .on("error", (err) => reject(err));
  });
}

// Function to process a batch of rows in parallel (5 at a time)
async function processBatch(batch, results) {
  try {
    // Map each row to an async operation and run them in parallel
    const processedItems = await Promise.all(batch.map(async (row) => {
      try {
        console.log(`Processing: ${row.name}`);

        // Get original link
        const originalLink = await getOriginalUrl(row.link);
        console.log(`Original link: ${originalLink}`);

        // Capture and upload screenshot
        const imageUrl = await captureAndUpload(row.name, originalLink);
        console.log(`Image URL: ${imageUrl}`);

        // Skip if the image URL is null (don't process this item)
        if (!imageUrl) {
          console.log(`Skipping ${row.name} due to null image URL.`);
          return null; // Return null for skipped items
        }

        // Create structured JSON
        return {
          name: row.name,
          description: row.desc || "No description available",
          ratings: row.ratings || 0,
          images: [
            {
              public_id: `toolzite/products/${row.name.toLowerCase().replace(/\s/g, "_")}`,
              url: imageUrl,
            }
          ],
          category: row.category,
          link: originalLink,
          type: row.type || "",
          numOfReviews: row.numOfReviews || 0,
          reviews: [],
        };
        
      } catch (error) {
        console.error(`Error processing ${row.name}:`, error.message);
        return null; // Return null in case of failure (prevents breaking Promise.all)
      }
    }));

    // Filter out any null (failed/skipped) results
    results.push(...processedItems.filter(item => item !== null));

  } catch (error) {
    console.error("Error processing batch:", error);
  }
}

// Helper function to append data to the file
async function saveDataLocally(newData) {
  const filePath = 'backend/pipeline/output.json';
  
  // Read existing data from the file
  let existingData = [];
  if (fs.existsSync(filePath)) {
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    existingData = JSON.parse(fileContent);
  }

  // Combine the old and new data
  const updatedData = [...existingData, ...newData];

  // Write updated data back to the file
  await fs.promises.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');
}

export { processCSV };
