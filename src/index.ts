import { config } from 'dotenv';
config();

import { GatewayIntentBits } from 'discord.js';
import { BotClient } from './bot/client';
import { logError, logInfo } from './lib/logger';
import { loadCommands, registerCommands } from './bot/handlers/commandHandler';
import path from 'path';
import { loadEvents } from './bot/handlers/eventHandler';
import connectDatabase from './database/database';
import initI18n from './bot/i18n/i18n';

export const client = new BotClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildScheduledEvents,
  ],
});

/**
 * Function to start the bot
 * @function start
 * @async
 * @throws {Error} - If an error occurs when loading commands, registering commands, or loading events
 * @throws {Error} - If an error occurs when logging in with the bot's token
 */
const start = async () => {
  try {
    await loadCommands(client, path.join(__dirname, 'bot', 'commands'));
    await registerCommands(client);
    await loadEvents(client, path.join(__dirname, 'bot', 'events'));

    await client.login(process.env.CLIENT_TOKEN);

    await connectDatabase();
    await initI18n();

    logInfo('Bot is running');
  } catch (error) {
    logError(error);
  }
};

start();
