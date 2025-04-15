import { time } from 'discord.js';
import { client } from '../..';
import { logError } from '../../lib/logger';
import { EventInterface } from '../../types/Event';
import { BotClient } from '../client';
import { checkCooldown } from '../security/cooldowns';
import { checkPermissions } from '../security/missingPermissions';
import { ownerOnly } from '../security/ownerOnly';
import { guildOwnerOnly } from '../security/guildOwnerOnly';
import { handleComponentInteraction } from '../handlers/componentInteractionHandler';
import commandUsed from '../logs/commands/commandUsed';
import createGuildConfig from '../../lib/createGuildConfig';

const event: EventInterface = {
  name: 'interactionCreate',
  /**
   * Executes the appropriate logic for a given interaction event.
   *
   * Handles both chat input commands and component interactions (buttons and select menus).
   * For chat input commands, it verifies owner restrictions, guild owner restrictions, user permissions,
   * and command cooldowns before executing the command. If any restriction or cooldown is not satisfied,
   * it replies to the interaction with an appropriate message.
   *
   * For component interactions, it delegates handling to the appropriate component interaction handler.
   *
   * @param interaction - The interaction object which can be a chat input command or a component interaction.
   */

  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return;

      const owner = ownerOnly(command, interaction);
      if (owner)
        return interaction.reply({
          content: owner,
          ephemeral: true,
        });

      const guildOwner = guildOwnerOnly(command, interaction);
      if (guildOwner)
        return interaction.reply({
          content: guildOwner,
          ephemeral: true,
        });

      const permissions = checkPermissions(command, interaction);
      if (permissions) return interaction.reply(permissions);

      const cooldown = checkCooldown(client, command, interaction);
      if (cooldown)
        return interaction.reply({
          content: `You are on cooldown for ${time(cooldown, 'R')}`,
          ephemeral: true,
        });

      try {
        await command.execute(interaction, interaction.options);

        await commandUsed(interaction);
      } catch (error) {
        await interaction.reply({
          content: 'Something went wrong...',
          ephemeral: true,
        });

        logError(error);
      }
    }

    if (interaction.isButton() || interaction.isStringSelectMenu()) {
      return handleComponentInteraction(interaction);
    }
  },
};

export default event;
