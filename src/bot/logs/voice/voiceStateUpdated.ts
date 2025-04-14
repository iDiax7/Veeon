import {
  channelMention,
  EmbedBuilder,
  TextChannel,
  time,
  userMention,
  VoiceState,
} from 'discord.js';
import getUserAvatar from '../../../lib/userAvatar';

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

  const embed = new EmbedBuilder()
    .setAuthor({
      name: member.user.username,
      iconURL: getUserAvatar(member.user),
    })
    .addFields(
      {
        name: 'When?',
        value: time(new Date(), 'R'),
      },
      {
        name: 'Member',
        value: userMention(member.id),
      }
    );

  if (!oldState.channelId && newState.channelId) {
    embed.setTitle('Joined a voice channel');
    embed.addFields({
      name: 'Channel',
      value: channelMention(newState.channelId),
    });
  }

  if (oldState.channelId && !newState.channelId) {
    embed.setTitle('Left a voice channel');
    embed.addFields({
      name: 'Channel',
      value: channelMention(oldState.channelId),
    });
  }

  if (
    oldState.channelId &&
    newState.channelId &&
    oldState.channelId !== newState.channelId
  ) {
    embed.setTitle('Switched voice channels');
    embed.addFields(
      {
        name: 'Old channel',
        value: channelMention(oldState.channelId),
        inline: true,
      },
      {
        name: 'New channel',
        value: channelMention(newState.channelId),
        inline: true,
      }
    );
  }

  if (!oldState.selfMute && newState.selfMute) {
    embed.setTitle('Self muted');
  }

  if (oldState.selfMute && !newState.selfMute) {
    embed.setTitle('Self unmuted');
  }

  if (!oldState.selfDeaf && newState.selfDeaf) {
    embed.setTitle('Self deafened');
  }

  if (oldState.selfDeaf && !newState.selfDeaf) {
    embed.setTitle('Self undeafened');
  }

  if (!oldState.serverMute && newState.serverMute) {
    embed.setTitle('Server muted');
  }

  if (oldState.serverMute && !newState.serverMute) {
    embed.setTitle('Server unmuted');
  }

  if (!oldState.serverDeaf && newState.serverDeaf) {
    embed.setTitle('Server deafened');
  }

  if (oldState.serverDeaf && !newState.serverDeaf) {
    embed.setTitle('Server undeafened');
  }

  await newState.guild.channels
    .fetch('1276965532385542304')
    .then((channel: any) => channel?.send({ embeds: [embed] }));
}
