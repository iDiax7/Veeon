import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  codeBlock,
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  userMention,
} from 'discord.js';
import { CommandInterface } from '../../../types/Command';
import getUserAvatar from '../../../lib/userAvatar';
import { getTranslation } from '../../../lib/getTranslation';
import Kick from '../../../database/schemas/Kick';
import generateId from '../../../lib/generateId';
import timeFormatter from '../../../lib/timeFormatter';

const command: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a user')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user you want to kick')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('The reason for the kick')
        .setRequired(false)
        .setMaxLength(50)
    ),
  userPermissions: ['KickMembers'],
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const user = member.user;
    const reason = interaction.options.getString('reason') || '-';

    const { t } = await getTranslation(interaction);

    if (!member.kickable) {
      const embed = new EmbedBuilder()
        .setDescription(t('commands.kick.cannotKick', { userId: user.id }))
        .setColor('Red');

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.username,
        iconURL: getUserAvatar(user),
      })
      .setTitle(t('commands.kick.kickConfirmation'))
      .addFields(
        {
          name: t('common.user'),
          value: userMention(user.id),
        },
        {
          name: t('common.reason'),
          value: codeBlock(reason),
        }
      );

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('kick:confirm')
        .setLabel(t('common.yes'))
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('kick:cancel')
        .setLabel(t('common.no'))
        .setStyle(ButtonStyle.Danger)
    );

    const message = await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true,
    });

    const collector = message.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 15000,
    });

    collector.on('collect', async (buttonInteraction: ButtonInteraction) => {
      embed.setTitle(' ');

      if (buttonInteraction.customId === 'kick:confirm') {
        await member.kick(reason);

        const kick = await Kick.create({
          id: generateId(16),
          guildId: interaction.guildId,
          userId: user.id,
          reason,
          date: new Date(),
        });

        embed.setDescription(t('commands.kick.kicked'));
        embed.addFields(
          {
            name: t('commands.kick.kickId'),
            value: codeBlock(kick.id),
          },
          {
            name: t('commands.kick.kickDate'),
            value: timeFormatter(kick.date),
          }
        );
        await interaction.editReply({
          embeds: [embed],
          components: [],
        });
      } else if (buttonInteraction.customId === 'kick:cancel') {
        embed.setDescription(t('commands.kick.kickCanceled'));
        await interaction.editReply({
          embeds: [embed],
          components: [],
        });
      }
    });
  },
};

export default command;
