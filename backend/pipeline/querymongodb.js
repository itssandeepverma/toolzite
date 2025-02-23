import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });

export const connectDatabase = () => {
  let DB_URI = process.env.DB_URI;

  mongoose.connect(DB_URI).then(async (con) => {
    console.log(`MongoDB Database connected with HOST: ${con?.connection?.host}`);

    try {
      // Assuming 'yourCollectionName' is the name of the collection where you want to delete the data
      const result = await mongoose.connection.db.collection('tool').deleteMany({
        category: { $in: ['Chat & Assistants'] }
      });

      console.log(`${result.deletedCount} document(s) deleted.`);
    } catch (error) {
      console.error("Error deleting documents:", error.message);
    }
  });
};
