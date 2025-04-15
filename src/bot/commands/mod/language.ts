import { SlashCommandBuilder } from 'discord.js';
import { CommandInterface } from '../../../types/Command';
import GuildConfig from '../../../database/schemas/GuildConfig';
import { getTranslation } from '../../../lib/getTranslation';

const command: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('language')
    .setDescription('Change the language of the bot')
    .addStringOption((option) =>
      option
        .setName('language')
        .setDescription('The language you want to set')
        .setRequired(true)
        .addChoices(
          { name: 'English', value: 'en' },
          { name: 'Polish', value: 'pl' },
          { name: 'Spanish', value: 'es' },
          { name: 'French', value: 'fr' },
          { name: 'German', value: 'de' },
          { name: 'Italian', value: 'it' },
          { name: 'Portuguese', value: 'pt' },
          { name: 'Russian', value: 'ru' }
        )
    ),
  userPermissions: ['Administrator'],
  /**
   * Sets the language of the bot for the current guild.
   * @param interaction The interaction object.
   */
  async execute(interaction) {
    const language = interaction.options.getString('language');

    const guildId = interaction.guildId;
    const guildConfig = await GuildConfig.findOne({ id: guildId });

    const { t } = await getTranslation(interaction, language);

    if (!guildConfig) {
      await GuildConfig.create({ id: guildId, language: language });
    } else {
      guildConfig.language = language;
      await guildConfig.save();
    }

    await interaction.reply({
      content: t('commands.language.languageChanged', { language }),
      ephemeral: true,
    });
  },
};

export default command;
