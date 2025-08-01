import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";
import { botBlockingMiddleware, securityLoggingMiddleware, strictRateLimitMiddleware, SECURITY_CONFIG } from "./config/security.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught expection");
  process.exit(1);
});

// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
} else {
  dotenv.config();
}

console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Port: ${process.env.PORT}`);

// Connecting to database
connectDatabase();

// CORS middleware for development
if (process.env.NODE_ENV !== "PRODUCTION") {
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
}

app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());

// Rate limiting middleware (only for API routes in production)
if (process.env.NODE_ENV === "PRODUCTION") {
  const limiter = rateLimit(SECURITY_CONFIG.rateLimit);
  app.use("/api", limiter); // Only apply to API routes
}

// Security middleware (only for API routes in production)
if (process.env.NODE_ENV === "PRODUCTION") {
  app.use("/api", securityLoggingMiddleware);
  app.use("/api", botBlockingMiddleware);
  app.use("/api", strictRateLimitMiddleware);
}

// Import all routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

// Production static file serving
if (process.env.NODE_ENV === "PRODUCTION") {
  const frontendBuildPath = path.join(__dirname, "../frontend/build");
  
  // Check if frontend build exists
  const fs = await import('fs');
  if (!fs.existsSync(frontendBuildPath)) {
    console.error("❌ Frontend build not found at:", frontendBuildPath);
    console.error("Please run 'npm run build' in the frontend directory");
  } else {
    console.log("✅ Frontend build found at:", frontendBuildPath);
  }

  // Serve static files
  app.use(express.static(frontendBuildPath, {
    maxAge: '1y',
    etag: true,
    lastModified: true
  }));

  // Handle all other routes by serving index.html
  app.get("*", (req, res) => {
    const indexPath = path.resolve(frontendBuildPath, "index.html");
    
    // Check if index.html exists
    if (!fs.existsSync(indexPath)) {
      console.error("❌ index.html not found at:", indexPath);
      return res.status(404).json({
        error: "Frontend build not found",
        message: "Please ensure the frontend is built correctly"
      });
    }
    
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("❌ Error serving index.html:", err);
        res.status(500).json({
          error: "Internal server error",
          message: "Error serving frontend application"
        });
      }
    });
  });
}

// Using error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `🚀 Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
  console.log(`📁 Frontend build path: ${path.join(__dirname, "../frontend/build")}`);
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
