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
  mongoUri: process.env.MONGO,
  
  // Authentication
  jwtSecret: process.env.JWT_SECRET,
  
  // Payment (Dodo)
  dodoToken: process.env.DODO_TOKEN,
  dodoWebhookToken: process.env.DODO_WEBHOOK_TOKEN,
  productId: process.env.PRODUCT_ID,
  
  // Frontend
  frontendOrigin: process.env.FRONTEND_ORIGIN,
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