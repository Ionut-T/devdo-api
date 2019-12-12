import fs from 'fs';
import dotenv from 'dotenv';
import logger from './logger';
import { MailTrap } from 'mail-trap';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.debug('The file does not exist');
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const DEV_ENV = ENVIRONMENT === 'development';

export const MONGODB_URI = DEV_ENV ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI_PROD;

if (!MONGODB_URI) {
  if (DEV_ENV) {
    logger.error('No mongo connection string. Set MONGODB_URI_DEV environment variable.');
  } else {
    logger.error('No mongo connection string. Set MONGODB_URI_PROD environment variable.');
  }
  process.exit(1);
}

export const JWT_SECRET = process.env.JWT_SECRET;

export const EMAIL: MailTrap = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD
};

export const VERIFY_EMAIL_URL = DEV_ENV ? process.env.VERIFY_EMAIL_DEV : process.env.VERIFY_EMAIL_PROD;

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
