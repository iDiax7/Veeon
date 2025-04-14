import { ChatInputCommandInteraction, Collection } from 'discord.js';
import { BotClient } from '../client';
import { CommandInterface } from '../../types/Command';

/**
 * Checks if a cooldown has expired and returns the timestamp of its expiration
 * if the cooldown has not expired yet. If the cooldown has expired, it returns
 * null.
 *
 * @param client The client object.
 * @param command The command object.
 * @param interaction The interaction object.
 * @returns The timestamp of the expiration of the cooldown, or null if the
 * cooldown has expired.
 */
export function checkCooldown(
  client: BotClient,
  command: CommandInterface,
  interaction: ChatInputCommandInteraction
): number | null {
  const cooldowns = client.cooldowns;

  if (!cooldowns.has(command.data.name)) {
    cooldowns.set(command.data.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.data.name) as any;
  const defaultCooldownDuration = 3;
  const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
      const expiredTimestamp = Math.round(expirationTime / 1000);
      return expiredTimestamp;
    }
  }

  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

  return null;
}
