import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });

export const connectDatabase = () => {
  let DB_URI = process.env.DB_URI;

  mongoose.connect(DB_URI).then(async (con) => {
    console.log(`MongoDB Database connected with HOST: ${con?.connection?.host}`);

    try {
      // Count the number of documents with category 'AI Agents'
      const result = await mongoose.connection.db.collection('products').countDocuments({
        category: { $in: ['AI Agents'] }
      });

      console.log(`Number of documents with category 'AI Agents': ${result}`);
    } catch (error) {
      console.error("Error counting documents:", error.message);
    }


    const result = await mongoose.connection.db.collection('products').deleteMany({
      category: { $in: ['AI Agents'] }
    });

    console.log(`Number of documents deleted with category 'AI Agents': ${result.deletedCount}`);



  }).catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
};

// connectDatabase();
