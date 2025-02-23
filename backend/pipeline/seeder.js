import mongoose from "mongoose";
import fs from "fs";
import Product from "../models/product.js"; // Adjust path based on project structure


import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });




async function seedDatabase() {

  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connected");

    const jsonData = JSON.parse(fs.readFileSync("backend/pipeline/output.json", "utf-8"));
    await Product.insertMany(jsonData);
    
    console.log("Data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

// seedDatabase();

export { seedDatabase};
