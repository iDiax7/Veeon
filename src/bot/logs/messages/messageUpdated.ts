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
import { getTranslation } from '../../../lib/getTranslation';

/**
 * Handles the messageUpdate event
 *
 * @param {Message<true>} oldMessage - The old Message
 * @param {Message<true>} newMessage - The new Message
 *
 * @returns {Promise<void>}
 */

export default async function messageUpdated(
  oldMessage: Message<true>,
  newMessage: Message<true>
) {
  const { t } = await getTranslation(oldMessage);

  const embed = new EmbedBuilder()
    .setAuthor({
      name: oldMessage.author.username,
      iconURL: getUserAvatar(oldMessage.author),
    })
    .setTitle(t('events.messageUpdated.messageUpdated'))
    .addFields(
      {
        name: t('common.channel'),
        value: channelMention(oldMessage.channelId),
        inline: true,
      },
      {
        name: t('common.when'),
        value: time(new Date(), 'R'),
        inline: true,
      },
      {
        name: t('common.messageAuthor'),
        value: userMention(oldMessage.author.id),
        inline: true,
      },
      {
        name: t('events.messageUpdated.oldMessageContent'),
        value: codeBlock(oldMessage.content || '-'),
      },
      {
        name: t('events.messageUpdated.newMessageContent'),
        value: codeBlock(newMessage.content || '-'),
      }
    )
    .setColor('Red')
    .setURL(oldMessage.url);

  if (oldMessage.attachments.size > 0) {
    embed.addFields({
      name: t('common.attachments'),
      value: oldMessage.attachments
        .map((attachment) => attachment.url)
        .join('\n'),
    });
  }

  return oldMessage.channel.send({ embeds: [embed] });
}
