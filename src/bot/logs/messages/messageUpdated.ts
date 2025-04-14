import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  channelMention,
  codeBlock,
  ComponentType,
  EmbedBuilder,
  Message,
  time,
  userMention,
} from 'discord.js';
import discordApiLimits from '../../discordApiLimits';
import { handleComponentInteraction } from '../../handlers/componentInteractionHandler';
import getUserAvatar from '../../../lib/userAvatar';

/**
 * Handles the messageUpdate event
 *
 * @param {Message<true>} oldMessage - The old Message
 * @param {Message<true>} newMessage - The new Message
 *
 * @returns {Promise<void>}
 */

export default function messageUpdated(
  oldMessage: Message<true>,
  newMessage: Message<true>
) {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: oldMessage.author.username,
      iconURL: getUserAvatar(oldMessage.author),
    })
    .setTitle('Message was updated')
    .addFields(
      {
        name: 'Channel',
        value: channelMention(oldMessage.channelId),
        inline: true,
      },
      {
        name: 'When?',
        value: time(new Date(), 'R'),
        inline: true,
      },
      {
        name: 'Message author',
        value: userMention(oldMessage.author.id),
        inline: true,
      },
      {
        name: 'Old content',
        value: codeBlock(oldMessage.content || '-'),
      },
      {
        name: 'New content',
        value: codeBlock(newMessage.content || '-'),
      }
    )
    .setColor('Red')
    .setURL(oldMessage.url);

  if (oldMessage.attachments.size > 0) {
    embed.addFields({
      name: 'Attachments',
      value: oldMessage.attachments
        .map((attachment) => attachment.url)
        .join('\n'),
    });
  }

  return oldMessage.channel.send({ embeds: [embed] });
}
