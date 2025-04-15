import { ButtonStyle, SlashCommandBuilder, User } from 'discord.js';
import { CommandInterface } from '../../../types/Command';
import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';
import getUserAvatar from '../../../lib/userAvatar';
import { getTranslation } from '../../../lib/getTranslation';

const command: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription("Replies with your's or someone else's avatar")
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user whose avatar you want to see')
        .setRequired(false)
    ),
  /**
   * Responds with the user's avatar and a button to open it in browser.
   *
   * If a user is specified, uses that user's avatar. Otherwise, uses the interaction user's avatar.
   *
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   * The interaction object.
   */
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    const avatar = getUserAvatar(user);

    const { t } = await getTranslation(interaction);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(t('common.openAvatar'))
        .setStyle(ButtonStyle.Link)
        .setURL(avatar)
    );

    await interaction.reply({
      content: avatar,
      components: [row],
    });
  },
};

export default command;
