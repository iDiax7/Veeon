import mongoose from 'mongoose';
import { logError, logInfo } from '../lib/logger';

export default async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URI!);

    logInfo('Connected to database');
  } catch (error) {
    logError(error);
  }
}
