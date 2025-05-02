import { Guild } from 'discord.js';
import GuildConfig from '../database/schemas/GuildConfig';

export default async function getGuildConfig(guild: Guild) {
  const config = await GuildConfig.findOne({ id: guild.id });

  if (!config) {
    return await GuildConfig.create({ id: guild.id });
  }

  return config;
}
