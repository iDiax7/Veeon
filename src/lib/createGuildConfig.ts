import { CommandInteraction, Guild } from 'discord.js';
import GuildConfig from '../database/schemas/GuildConfig';
import { logError } from './logger';

export default async function createGuildConfig(guild: Guild) {
  const guildId = guild.id;

  try {
    const guildConfig = await GuildConfig.findOne({ id: guildId });

    if (!guildConfig) {
      await GuildConfig.create({ id: guildId });
    }
  } catch (error) {
    logError(error);
  }
}
