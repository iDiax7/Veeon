import {
  codeBlock,
  EmbedBuilder,
  Message,
  SlashCommandBuilder,
} from 'discord.js';
import { CommandInterface } from '../../../types/Command';
import { getTranslation } from '../../../lib/getTranslation';

const command: CommandInterface = {
  data: new SlashCommandBuilder().setName('test').setDescription('test'),
  ownerOnly: true,
  async execute(interaction) {
    const { t } = await getTranslation(interaction);

    await interaction.reply({
      content: t('hi'),
    });
  },
};

export default command;
