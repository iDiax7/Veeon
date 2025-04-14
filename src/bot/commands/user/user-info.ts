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

    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.username,
        iconURL: avatar,
      })
      .addFields(
        {
          name: 'Full name',
          value: codeBlock(user.username),
        },
        {
          name: 'ID',
          value: codeBlock(user.id),
        },
        {
          name: 'Created at',
          value: timeFormatter(user.createdAt),
        },
        {
          name: 'Joined at',
          value: timeFormatter(member.joinedAt),
        }
      )
      .setThumbnail(avatar);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel('Open user in browser')
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/users/${user.id}`),
      new ButtonBuilder()
        .setLabel('Show avatar in browser')
        .setStyle(ButtonStyle.Link)
        .setURL(avatar)
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};

export default command;
