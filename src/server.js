import http from 'http';
import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './db/db.js';
import setupSocket from './socket/index.js';
import logger from './shared/utils/logger.js';
import { NODE_ENV } from './shared/utils/constants.js';
import { gracefulShutdown } from './shutdown.js';

dotenv.config();

const port = process.env.PORT || 3000;

const httpserver = http.createServer(app);

// ── Socket.io (notification system)
setupSocket(httpserver);

// ── Memory Usage (Development Only, we will migrate to prometheus later)
if (process.env.NODE_ENV !== 'production') {
  const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`;
  const memoryData = process.memoryUsage();
  const memoryUsage = {
    rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size`,
    heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
    heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during execution`,
    external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
  };
  logger.info(`[MEMORY]: ${JSON.stringify(memoryUsage)}`);
}

// ── Start ##$##################################
if (process.env.NODE_ENV !== NODE_ENV.TEST) {
  await connectDB();

  httpserver.listen(port, () => {
    logger.info(`[CONNECTION]: Server Connected at PORT ${port}`);
  });

  // ── Graceful Shutdown  ### ########## ####### ############
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM', httpserver)); // Docker / PM2 / cloud stop
  process.on('SIGINT',  () => gracefulShutdown('SIGINT',  httpserver)); // Ctrl+C

  process.on('unhandledRejection', (reason) => {
    logger.error(`[UNHANDLED REJECTION]: ${reason}`);
    gracefulShutdown('unhandledRejection', httpserver);
  });

  process.on('uncaughtException', (err) => {
    logger.error(`[UNCAUGHT EXCEPTION]: ${err.message}`);
    gracefulShutdown('uncaughtException', httpserver);
  });
}

export { httpserver };