import { CommandInterface } from '../../types/Command';
import { config } from '../config';

/**
 * Checks if the command is restricted to the bot owner and verifies the
 * interaction user is the bot owner.
 *
 * @param command - The command to check, containing metadata about its usage restrictions.
 * @param interaction - The interaction object containing user information.
 * @returns A string with an error message if the user is not the owner and the command is restricted; otherwise, null.
 */

export function ownerOnly(
  command: CommandInterface,
  interaction: any
): string | null {
  if (command.ownerOnly && interaction.user.id !== config.ownerId) {
    return 'You must be the owner of this bot to use this command';
  }

  return null;
}
