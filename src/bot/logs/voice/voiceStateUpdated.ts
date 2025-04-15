import {
  channelMention,
  EmbedBuilder,
  TextChannel,
  time,
  userMention,
  VoiceState,
} from 'discord.js';
import getUserAvatar from '../../../lib/userAvatar';
import { getTranslation } from '../../../lib/getTranslation';

/**
 * Handles the voiceStateUpdate event
 *
 * @param {VoiceState} oldState - The old VoiceState
 * @param {VoiceState} newState - The new VoiceState
 *
 * @returns {Promise<void>}
 */
export default async function voiceStateUpdated(
  oldState: VoiceState,
  newState: VoiceState
) {
  const member = newState.member;
  if (!member) return;
  if (oldState === newState) return;

  const { t } = await getTranslation(oldState);

  const embed = new EmbedBuilder()
    .setAuthor({
      name: member.user.username,
      iconURL: getUserAvatar(member.user),
    })
    .addFields(
      {
        name: t('common.when'),
        value: time(new Date(), 'R'),
      },
      {
        name: t('common.user'),
        value: userMention(member.id),
      }
    );

  if (!oldState.channelId && newState.channelId) {
    embed.setTitle(t('events.voiceStateUpdated.joined.joined'));
    embed.addFields({
      name: t('common.channel'),
      value: channelMention(newState.channelId),
    });
  }

  if (oldState.channelId && !newState.channelId) {
    embed.setTitle(t('events.voiceStateUpdated.left.left'));
    embed.addFields({
      name: t('common.channel'),
      value: channelMention(oldState.channelId),
    });
  }

  if (
    oldState.channelId &&
    newState.channelId &&
    oldState.channelId !== newState.channelId
  ) {
    embed.setTitle(t('events.voiceStateUpdated.switched.switched'));
    embed.addFields(
      {
        name: t('events.voiceStateUpdated.switched.oldChannel'),
        value: channelMention(oldState.channelId),
        inline: true,
      },
      {
        name: t('events.voiceStateUpdated.switched.newChannel'),
        value: channelMention(newState.channelId),
        inline: true,
      }
    );
  }

  if (oldState.channelId && !oldState.selfMute && newState.selfMute) {
    embed.setTitle(t('events.voiceStateUpdated.selfMuted'));
  }

  if (oldState.selfMute && !newState.selfMute) {
    embed.setTitle(t('events.voiceStateUpdated.selfUnmuted'));
  }

  if (oldState.channelId && !oldState.selfDeaf && newState.selfDeaf) {
    embed.setTitle(t('events.voiceStateUpdated.selfDeafened'));
  }

  if (oldState.selfDeaf && !newState.selfDeaf) {
    embed.setTitle(t('events.voiceStateUpdated.selfUndeafened'));
  }

  if (!oldState.serverMute && newState.serverMute) {
    embed.setTitle(t('events.voiceStateUpdated.serverMuted'));
  }

  if (oldState.serverMute && !newState.serverMute) {
    embed.setTitle(t('events.voiceStateUpdated.serverUnmuted'));
  }

  if (!oldState.serverDeaf && newState.serverDeaf) {
    embed.setTitle(t('events.voiceStateUpdated.serverDeafened'));
  }

  if (oldState.serverDeaf && !newState.serverDeaf) {
    embed.setTitle(t('events.voiceStateUpdated.serverUndeafened'));
  }

  await newState.guild.channels
    .fetch('1276965532385542304')
    .then((channel: any) => channel?.send({ embeds: [embed] }));
}
