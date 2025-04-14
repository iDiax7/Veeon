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

export default function messageDeleted(message: Message<true>) {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: message.author.username,
      iconURL: getUserAvatar(message.author),
    })
    .setTitle('Message was deleted')
    .addFields(
      {
        name: 'Channel',
        value: channelMention(message.channelId),
        inline: true,
      },
      {
        name: 'When?',
        value: time(new Date(), 'R'),
        inline: true,
      },
      {
        name: 'Message author',
        value: userMention(message.author.id),
        inline: true,
      },
      {
        name: 'Content',
        value: codeBlock(message.content || '-'),
      }
    )
    .setColor('Red')
    .setURL(message.url);

  if (message.attachments.size > 0) {
    embed.addFields({
      name: 'Attachments',
      value: message.attachments.map((attachment) => attachment.url).join('\n'),
    });
  }

  return message.channel.send({ embeds: [embed] });
}
