import { ChatInputCommandInteraction } from 'discord.js';
import { CommandInterface } from '../../types/Command';

/**
 * Checks if the user has the required permissions to run a command.
 *
 * @param command - The command to check, containing metadata about its usage restrictions.
 * @param interaction - The interaction object containing user information.
 * @returns A string with an error message if the user is missing required permissions; otherwise, null.
 */
export function checkPermissions(
  command: CommandInterface,
  interaction: ChatInputCommandInteraction
): string | null {
  if (!command.userPermissions) return null;

  const missing = interaction.memberPermissions?.missing(
    command.userPermissions
  );
  if (missing && missing.length > 0) {
    return `You are missing the following permissions: ${missing.join(', ')}`;
  }

  return null;
}
