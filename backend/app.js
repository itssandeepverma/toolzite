import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import path from "path";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";
import "./config/passportConfig.js";  // 👈 Add this line



// Fix __dirname issue in ES Module
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load Environment Variables
dotenv.config({ path: "backend/config/config.env" });

// Connect to database
connectDatabase();

const app = express();

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

// Middleware
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());

app.use(express.json());  // JSON Parsing Middleware
app.use(express.urlencoded({ extended: true }));  // URL Encoded Data Handle


// 🔹 Session Middleware (Required for Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultSecret", // Secure Random Secret
    resave: false,
    saveUninitialized: false,
  })
);


// 🔹 Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Import all routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// Using error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server started on PORT: ${PORT} in ${process.env.NODE_ENV} mode.`);
});

console.log("Registered Routes:", app._router.stack);

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
