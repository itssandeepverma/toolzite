import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js";
import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });

const seedProducts = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("Connected to MongoDB"
   );

    // Rename 'price' field to 'link' in existing products
    // await Product.updateMany({}, { $rename: { "price": "link" } });
    // console.log("Renamed 'price' field to 'link'");

   // Delete all products
    await Product.deleteMany();
    console.log("Products are deleted");

    // Insert new products
    // await Product.insertMany(products);
    // console.log("Products are added");

    process.exit();
  } 
  
  catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedProducts();
