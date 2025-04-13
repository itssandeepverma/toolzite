import fs from "fs";
import csv from "csv-parser";
import { getOriginalUrl } from "./urlFinder.js";
import { captureAndUpload } from "./screenshotSaver.js";
import { seedDatabase } from "./seeder.js";

async function processCSV(filePath) {
  const results = [];
  const failedScreenshots = []; // ⬅️ Track failures
  const batchSize = 5;

  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", async () => {
        console.log("CSV parsing complete!");

        for (let i = 0; i < rows.length; i += batchSize) {
          const batch = rows.slice(i, i + batchSize);
          try {
            await processBatch(batch, results, failedScreenshots);
            console.log(`Processed batch ${Math.floor(i / batchSize) + 1}`);
          } catch (error) {
            console.error("Error processing batch:", error);
          }
        }

        await saveDataLocally(results);
        await saveFailedScreenshots(failedScreenshots); // ⬅️ Save failed entries

        try {
          await seedDatabase();
          console.log("Database seeded successfully!");

          const filePath = "backend/pipeline/output.json";
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log("Deleted output.json after successful database seeding.");
          }

          console.log("Failed Screenshots:", failedScreenshots);
          resolve();
        } catch (error) {
          console.error("Error seeding database:", error);
          reject(error);
        }
      })
      .on("error", (err) => reject(err));
  });
}

async function processBatch(batch, results, failedScreenshots) {
  try {
    const processedItems = await Promise.all(
      batch.map(async (row) => {
        try {
          console.log(`Processing: ${row.name}`);

          const originalLink = await getOriginalUrl(row.link);
          console.log(`Original link: ${originalLink}`);

          const imageUrl = await captureAndUpload(row.name, originalLink);
          console.log(`Image URL: ${imageUrl}`);

          if (!imageUrl) {
            console.log(`Skipping ${row.name} due to null image URL.`);
            failedScreenshots.push(row.name); // ⬅️ Track the failure
            return null;
          }

          return {
            name: row.name,
            description: row.desc || "No description available",
            ratings: row.ratings || 0,
            images: [
              {
                public_id: `toolzite/products/${row.name.toLowerCase().replace(/\s/g, "_")}`,
                url: imageUrl,
              },
            ],
            category: row.category,
            link: originalLink,
            type: row.type || "",
            numOfReviews: row.numOfReviews || 0,
            reviews: [],
          };
        } catch (error) {
          console.error(`Error processing ${row.name}:`, error.message);
          failedScreenshots.push(row.name); // ⬅️ Catch error in processing
          return null;
        }
      })
    );

    results.push(...processedItems.filter((item) => item !== null));
  } catch (error) {
    console.error("Error processing batch:", error);
  }
}

async function saveDataLocally(newData) {
  const filePath = "backend/pipeline/output.json";

  let existingData = [];
  if (fs.existsSync(filePath)) {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    existingData = JSON.parse(fileContent);
  }

  const updatedData = [...existingData, ...newData];
  await fs.promises.writeFile(filePath, JSON.stringify(updatedData, null, 2), "utf-8");
}

// ⬇️ New function to save failed screenshot list
async function saveFailedScreenshots(failedList) {
  const filePath = "backend/pipeline/failed_screenshots.json";
  await fs.promises.writeFile(filePath, JSON.stringify(failedList, null, 2), "utf-8");
}

export { processCSV };
