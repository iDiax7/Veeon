import { User, GuildMember } from 'discord.js';

/**
 * Returns the URL of the user's avatar, or the default avatar if the user doesn't have one.
 *
 * @param {User|GuildMember} user - The user to get the avatar of.
 * @returns {string} The URL of the user's avatar.
 */
export default function getUserAvatar(user: User | GuildMember) {
  if (user instanceof GuildMember) {
    return (
      user.user.avatarURL({
        size: 4096,
        forceStatic: false,
      }) || user.user.defaultAvatarURL
    );
  } else {
    return (
      user.avatarURL({
        size: 4096,
        forceStatic: false,
      }) || user.defaultAvatarURL
    );
  }
}
