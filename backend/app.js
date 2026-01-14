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
import newsRoutes from "./routes/news.js";
import blogRoutes from "./routes/blogs.js";

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
app.use("/api/v1", newsRoutes);
app.use("/api/v1", blogRoutes);

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

  // Map legacy CRA PWA icon paths to current images to avoid 404s from cached manifests
  app.get('/logo192.png', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'images', 'icon.png'));
  });
  app.get('/logo512.png', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'images', 'toolzite.png'));
  });

  // Serve static files with cache-control tailored per file
  app.use(
    express.static(frontendBuildPath, {
      etag: true,
      lastModified: true,
      setHeaders: (res, filePath) => {
        // Never cache index.html (ensures latest bundle references are fetched)
        if (filePath.endsWith(path.sep + 'index.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
          return;
        }

        // Long-cache hashed static assets
        const isStatic = /\/(static|assets)\//.test(filePath);
        const isHashedAsset = /\.(js|css|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/.test(filePath);
        if (isStatic && isHashedAsset) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          return;
        }

        // Default: short cache for other files
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
    })
  );

  // Handle SPA routes: serve index.html only for non-static, extension-less paths
  app.get("*", (req, res) => {
    const indexPath = path.resolve(frontendBuildPath, "index.html");
    // If the request looks like a static asset (has a file extension) and wasn't found above, return 404
    if (/\.[a-zA-Z0-9]+$/.test(req.path) || req.path.startsWith('/static/')) {
      return res.status(404).end();
    }

    // Check if index.html exists
    if (!fs.existsSync(indexPath)) {
      console.error("❌ index.html not found at:", indexPath);
      return res.status(404).json({
        error: "Frontend build not found",
        message: "Please ensure the frontend is built correctly"
      });
    }

    // Explicitly disable caching on SPA shell
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

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
