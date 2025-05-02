import { ChatInputCommandInteraction, inlineCode } from 'discord.js';
import { CommandInterface } from '../../types/Command';
import { getTranslation } from '../../lib/getTranslation';
import createGuildConfig from '../../lib/createGuildConfig';
import getGuildConfig from '../../lib/getGuildConfig';

/**
 * Checks if the user has the required permissions to run a command.
 *
 * @param command - The command to check, containing metadata about its usage restrictions.
 * @param interaction - The interaction object containing user information.
 * @returns A string with an error message if the user is missing required permissions; otherwise, null.
 */
export async function checkPermissions(
  command: CommandInterface,
  interaction: ChatInputCommandInteraction
): Promise<string | null> {
  if (!command.userPermissions) return null;

  const missing = interaction.memberPermissions?.missing(
    command.userPermissions
  );
  if (missing && missing.length > 0) {
    const config = await getGuildConfig(interaction.guild!);
    const { t } = await getTranslation(interaction, config.language);

    return t('security.missingPermissions', {
      permissions: missing.map((p) => inlineCode(p)).join(' '),
    });
  }

  return null;
}
