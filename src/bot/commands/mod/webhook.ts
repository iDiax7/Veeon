import { SlashCommandBuilder, Webhook } from 'discord.js';
import { CommandInterface } from '../../../types/Command';
import getUserAvatar from '../../../lib/userAvatar';
import {
  channelMention,
  codeBlock,
  EmbedBuilder,
  spoiler,
} from '@discordjs/builders';
import { getTranslation } from '../../../lib/getTranslation';

const command: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('webhook')
    .setDescription('Manage webhooks')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('create')
        .setDescription('Create a webhook')
        .addStringOption((option) =>
          option
            .setName('name')
            .setDescription('The name of the webhook')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('avatar_url')
            .setDescription('The avatar URL of the webhook')
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName('reason')
            .setDescription('The reason for creating the webhook')
            .setRequired(false)
        )
        .addChannelOption((option) =>
          option
            .setName('channel')
            .setDescription('The channel where the webhook will be created')
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('delete')
        .setDescription('Delete a webhook')
        .addStringOption((option) =>
          option
            .setName('token')
            .setDescription('The token of the webhook to delete')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName('list').setDescription('List all webhooks')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('info')
        .setDescription('Get info about a webhook')
        .addStringOption((option) =>
          option
            .setName('token')
            .setDescription('The token of the webhook to get info about')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('send_message')
        .setDescription('Send a message to a webhook')
        .addStringOption((option) =>
          option
            .setName('token')
            .setDescription('The token of the webhook to send the message to')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('content')
            .setDescription('The content of the message')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('send_embed')
        .setDescription('Send an embed to a webhook')
        .addStringOption((option) =>
          option
            .setName('token')
            .setDescription('The name of the webhook to send the embed to')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('id')
            .setDescription('The ID of the embed')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    const { t } = await getTranslation(interaction);

    switch (subcommand) {
      case 'create': {
        const name = interaction.options.getString('name');
        const avatarUrl = interaction.options.getString('avatar_url');
        const reason = interaction.options.getString('reason');
        const channel =
          interaction.options.getChannel('channel') || interaction.channel;

        const webhook: Webhook = await channel?.createWebhook({
          name,
          avatar: avatarUrl || '',
          channel: channel,
          reason,
        });

        const embed = new EmbedBuilder()
          .setTitle(t('commands.webhook.webhookCreated'))
          .setDescription(t('commands.webhook.webhookCreatedDescription'))
          .addFields(
            {
              name: t('common.name'),
              value: codeBlock(name),
            },
            {
              name: t('common.id'),
              value: codeBlock(webhook.id),
            },
            {
              name: t('common.token'),
              value: spoiler(codeBlock(webhook.token!)),
            },
            {
              name: t('common.channel'),
              value: channelMention(webhook.channelId),
            }
          )
          .setThumbnail(webhook.avatarURL());

        await interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });

        break;
      }
      case 'delete': {
        const token = interaction.options.getString('token');

        await interaction.guild
          .fetchWebhooks()
          .then((webhooks: Webhook[]) => {
            webhooks
              .filter((w) => w.token === token)
              .forEach((w) =>
                w.delete().catch(async () => {
                  await interaction.reply({
                    embeds: [
                      {
                        description: t('commands.webhook.webhookNotFound'),
                      },
                    ],
                    ephemeral: true,
                  });
                })
              );
          })
          .then(async () => {
            await interaction.reply({
              embeds: [
                {
                  description: t('commands.webhook.webhookDeletedDescription'),
                },
              ],
              ephemeral: true,
            });
          });

        break;
      }
    }
  },
};

export default command;
