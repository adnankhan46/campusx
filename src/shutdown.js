import mongoose from 'mongoose';
import logger from './shared/utils/logger.js';

const SHUTDOWN_TIMEOUT_MS = 10_000; // Force-kill after 10s if still hanging

export const gracefulShutdown = (signal, httpserver) => {
  logger.info(`[SHUTDOWN]: Received ${signal}. Starting graceful shutdown...`);

  // Force-kill if shutdown takes too long
  const forceExit = setTimeout(() => {
    logger.error('[SHUTDOWN]: Graceful shutdown timed out. Forcing exit.');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);

  // Don't let this timer keep the process alive
  forceExit.unref();

  // 1. Stop accepting new connections
  httpserver.close(async (err) => {
    if (err) {
      logger.error(`[SHUTDOWN]: Error closing HTTP server: ${err.message}`);
      process.exit(1);
    }

    logger.info('[SHUTDOWN]: HTTP server closed. No longer accepting connections.');

    // 2. Close MongoDB connection
    try {
      await mongoose.connection.close();
      logger.info('[SHUTDOWN]: MongoDB connection closed.');
    } catch (dbErr) {
      logger.error(`[SHUTDOWN]: Error closing MongoDB connection: ${dbErr.message}`);
      process.exit(1);
    }

    // 3. All clean — exit
    logger.info('[SHUTDOWN]: Graceful shutdown complete.');
    clearTimeout(forceExit);
    process.exit(0);
  });
};