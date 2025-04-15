import { useI18n } from '../bot/i18n/i18nWrapper';
import { CommandInteraction, Message, VoiceState } from 'discord.js';
import GuildConfig from '../database/schemas/GuildConfig';

export const getTranslation = async (
  interaction: CommandInteraction | Message | VoiceState,
  lang?: string
) => {
  const guildId = () => {
    if (interaction instanceof VoiceState) return interaction.guild.id;
    return interaction.guildId;
  };
  const config = await GuildConfig.findOne({ id: guildId() });
  const language = lang || config?.language || 'en';

  return useI18n(language);
};
