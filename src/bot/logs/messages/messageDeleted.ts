import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  channelMention,
  codeBlock,
  EmbedBuilder,
  Message,
  time,
  userMention,
} from 'discord.js';
import discordApiLimits from '../../discordApiLimits';
import getUserAvatar from '../../../lib/userAvatar';
import { getTranslation } from '../../../lib/getTranslation';

/**
 * Handles the messageDelete event
 *
 * @param {Message<true>} message - The deleted Message
 *
 * Constructs an embed with details about the deleted message, including
 * the author, channel, time of deletion, content, and attachments.
 * Sends the embed to the channel where the message was deleted.
 *
 * @returns {Promise<void>}
 */

export default async function messageDeleted(message: Message<true>) {
  const { t } = await getTranslation(message);

  const embed = new EmbedBuilder()
    .setAuthor({
      name: message.author.username,
      iconURL: getUserAvatar(message.author),
    })
    .setTitle(t('events.messageDeleted.messageDeleted'))
    .addFields(
      {
        name: t('common.channel'),
        value: channelMention(message.channelId),
        inline: true,
      },
      {
        name: t('common.when'),
        value: time(new Date(), 'R'),
        inline: true,
      },
      {
        name: t('common.messageAuthor'),
        value: userMention(message.author.id),
        inline: true,
      },
      {
        name: t('common.messageContent'),
        value: codeBlock(message.content || '-'),
      }
    )
    .setColor('Red')
    .setURL(message.url);

  if (message.attachments.size > 0) {
    embed.addFields({
      name: t('common.attachments'),
      value: message.attachments.map((attachment) => attachment.url).join('\n'),
    });
  }

  return message.channel.send({ embeds: [embed] });
}
