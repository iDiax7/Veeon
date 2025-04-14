import mongoose from 'mongoose';
import { logError, logInfo } from '../lib/logger';

/**
 * Establishes a connection to the database.
 *
 * The DATABASE_URI environment variable should be set to the MongoDB connection string.
 * If the connection is successful, a success message is logged to the console.
 * If the connection fails, the error is logged to the console.
 *
 * @returns {Promise<void>}
 */
export default async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URI!);

    logInfo('Connected to database');
  } catch (error) {
    logError(error);
  }
}
