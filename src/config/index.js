import dotenv from 'dotenv';
import development from './environments/development.js';
import production from './environments/production.js';

dotenv.config();

/**
 * environment specific config
 */
const configs = {
  development,
  production,
};

const currentEnv = process.env.NODE_ENV || 'development';
const envConfig = configs[currentEnv] || configs.development;

// Base config
const config = {
  // Environment config
  ...envConfig,
  
  // Common configs
  port: process.env.PORT || 3000,
  nodeEnv: currentEnv,
  
  // Database
  MONGO: process.env.MONGO,
  
  // Authentication
  JWT_SECRET: process.env.JWT_SECRET,
  
  // Payment (Dodo)
  DODO_TOKEN: process.env.DODO_TOKEN,
  DODO_WEBHOOK_TOKEN: process.env.DODO_WEBHOOK_TOKEN,
  PRODUCT_ID: process.env.PRODUCT_ID,
  
  // Frontend
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
};

/**
 * Validate required environment variables
 */
const requiredVars = [
  'MONGO',
  'JWT_SECRET',
  'DODO_TOKEN',
  'DODO_WEBHOOK_TOKEN',
  'PRODUCT_ID',
];

const missingVars = requiredVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(', ')}`
  );
}

export default config;