import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

/**
 * Lightweight liveness probe — no DB. Use for uptime pings / cold-start wake
 * (Render, Railway, cron, etc.).
 */
export function wakeHealth(req, res) {
  res.status(200).json({
    status: "ok",
    service: "campusx-api",
    timestamp: new Date().toISOString(),
  });
}

/**
 * Readiness — includes DB state for deeper monitoring.
 */
export function readyHealth(req, res) {
  const dbOk = mongoose.connection.readyState === 1;
  const payload = {
    status: dbOk ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbOk ? "connected" : "disconnected",
    environment: process.env.NODE_ENV || "development",
  };
  res.status(dbOk ? 200 : 503).json(payload);
}

router.get("/", wakeHealth);
router.get("/ready", readyHealth);

export default router;
