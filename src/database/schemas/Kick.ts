import mongoose from 'mongoose';

export interface KickInterface extends mongoose.Document {
  id: string;
  guildId: string;
  userId: string;
  reason: string;
  date: Date;
}

const KickSchema = new mongoose.Schema<KickInterface>({
  id: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<KickInterface>('Kick', KickSchema);
