import fs from 'fs';
import path from 'path';
import { BotClient } from '../client';
import { CommandInterface } from '../../types/Command';
import { logError, logInfo, logWarning } from '../../lib/logger';
import { REST, Routes } from 'discord.js';
import { config } from '../config';

/**
 * Loads all commands from the given path
 * @param {BotClient} client The BotClient instance
 * @param {string} commandsPath The path to the commands folder
 * @returns {Promise<void>}
 */
export async function loadCommands(client: BotClient, commandsPath: string) {
  const folders = fs.readdirSync(commandsPath);

  for (const folder of folders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(folderPath, file);
      const commandModule = await import(filePath);
      const command: CommandInterface = commandModule.default || commandModule;

      if (!command?.data || !command?.execute) {
        logWarning(`Command ${file} is not valid`);
        continue;
      }

      client.commands.set(command.data.name, command);
    }
  }

  logInfo(`Loaded ${client.commands.size} commands`);
}

export async function registerCommands(client: BotClient) {
  const rest = new REST({
    version: '10',
  }).setToken(process.env.CLIENT_TOKEN!);

  (async () => {
    try {
      logInfo('Started refreshing application (/) commands');

      const data = (await rest.put(
        Routes.applicationCommands(config.clientId),
        { body: client.commands.map((command) => command.data.toJSON()) }
      )) as any;

      logInfo(`Successfully reloaded ${data.length} application (/) commands`);
    } catch (error) {
      logError(error);
    }
  })();
}
