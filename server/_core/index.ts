import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerArticlesApi } from "../routes/articlesApi";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // 腾讯云 / Nginx 反代时识别 X-Forwarded-*（按需设置 TRUST_PROXY=1）
  if (process.env.TRUST_PROXY === "1" || process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  registerArticlesApi(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  const apiOnly = process.env.API_ONLY === "1";

  // development mode uses Vite; production 默认托管前端静态资源
  // 前端在 Netlify 时可在服务器设 API_ONLY=1，只提供 /api/*
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else if (!apiOnly) {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000", 10);
  const isProd = process.env.NODE_ENV === "production";
  const port = isProd ? preferredPort : await findAvailablePort(preferredPort);

  if (!isProd && port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  const host = process.env.HOST || "0.0.0.0";

  server.listen(port, host, () => {
    console.log(
      `Server running on http://${host}:${port}/` +
        (apiOnly && isProd ? " (API only)" : ""),
    );
  });
}

startServer().catch(console.error);
