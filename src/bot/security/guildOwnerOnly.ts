import { CommandInterface } from '../../types/Command';

/**
 * Checks if the command is restricted to the guild owner and verifies the
 * interaction user is the guild owner.
 *
 * @param command - The command to check, containing metadata about its usage restrictions.
 * @param interaction - The interaction object containing user information.
 * @returns A string with an error message if the user is not the guild owner and the command is restricted; otherwise, null.
 */
export function guildOwnerOnly(
  command: CommandInterface,
  interaction: any
): string | null {
  if (
    command.guildOwnerOnly &&
    interaction.guild.ownerId !== interaction.user.id
  ) {
    return 'You must be the owner of this guild to use this command';
  }

  return null;
}
