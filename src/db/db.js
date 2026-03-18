import mongoose from "mongoose";
import config from "../config/index.js";
import logger from "../shared/utils/logger.js";

const connectDB = async () => {
  const dbURI = config.MONGO;

  if (!dbURI) {
    logger.error('[DB]: MONGO environment variable is not defined.');
    process.exit(1);
  }

  try {
    await mongoose.connect(dbURI);
    logger.info('[CONNECTION]: MongoDB Connected');
  } catch (err) {
    logger.error(`[CONNECTION-ERR]: MongoDB connection failed | ${err}`);
    process.exit(1);
  }
};

export default connectDB;