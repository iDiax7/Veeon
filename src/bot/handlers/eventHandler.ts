import fs from 'fs';
import path from 'path';
import { BotClient } from '../client';
import { logInfo, logWarning } from '../../lib/logger';
import { EventInterface } from '../../types/Event';

/**
 * Loads and registers event handlers for the bot.
 *
 * This function reads the specified directory for event files, imports each event module,
 * and registers the event with the Discord client. Events can either be one-time events
 * or recurring, based on the `once` property of the event. If an event is invalid due
 * to missing `name` or `execute` properties, it is skipped with a warning.
 *
 * @param client - The bot client instance used to register events.
 * @param eventsPath - The file path to the directory containing event files.
 */

export async function loadEvents(client: BotClient, eventsPath: string) {
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const eventModule = await import(filePath);
    const event: EventInterface = eventModule.default || eventModule;

    if (!event.name || !event.execute) {
      logWarning(`Event ${file} is not valid`);
      continue;
    }

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }

  logInfo(`Loaded ${eventFiles.length} events`);
}
