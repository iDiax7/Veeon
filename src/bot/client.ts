import {
  Client,
  ClientOptions,
  Collection,
  ChatInputCommandInteraction,
  REST,
  Routes,
  SlashCommandBuilder,
} from 'discord.js';
import { CommandInterface } from '../types/Command';

export class BotClient extends Client {
  public commands: Collection<string, CommandInterface> = new Collection();
  public cooldowns: Collection<string, Map<string, number>> = new Collection();

  constructor(options: ClientOptions) {
    super(options);
  }
}
