import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  codeBlock,
  EmbedBuilder,
  SlashCommandBuilder,
  time,
} from 'discord.js';
import { CommandInterface } from '../../../types/Command';
import getUserAvatar from '../../../lib/userAvatar';
import timeFormatter from '../../../lib/timeFormatter';
import { getTranslation } from '../../../lib/getTranslation';

const command: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('user-info')
    .setDescription('Gives information about a user')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user whose info you want to see')
        .setRequired(false)
    ),
  /**
   * Responds with an embed containing information about the specified user.
   * If no user is specified, uses the interaction member.
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const member = interaction.options.getMember('user') || interaction.member;
    const user = member.user;

    const avatar = getUserAvatar(user);

    const { t } = await getTranslation(interaction);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.username,
        iconURL: avatar,
      })
      .addFields(
        {
          name: t('commands.userInfo.fullName'),
          value: codeBlock(user.username),
        },
        {
          name: t('common.id'),
          value: codeBlock(user.id),
        },
        {
          name: t('commands.userInfo.accountCreatedAt'),
          value: timeFormatter(user.createdAt),
        },
        {
          name: t('commands.userInfo.joinedAt'),
          value: timeFormatter(member.joinedAt),
        }
      )
      .setThumbnail(avatar);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel(t('commands.userInfo.openProfile'))
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/users/${user.id}`),
      new ButtonBuilder()
        .setLabel(t('common.openAvatar'))
        .setStyle(ButtonStyle.Link)
        .setURL(avatar)
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};

export default command;
