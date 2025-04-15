import mongoose from 'mongoose';

type language = 'pl' | 'en';
interface GuildConfigInterface extends mongoose.Document {
  id: String;
  language: language;
}

const GuildConfigSchema = new mongoose.Schema<GuildConfigInterface>({
  id: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    default: 'en',
  },
});

export default mongoose.model<GuildConfigInterface>(
  'GuildConfig',
  GuildConfigSchema
);
