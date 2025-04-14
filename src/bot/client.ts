import { Client, ClientOptions, Collection } from 'discord.js';
import { CommandInterface } from '../types/Command';

export class BotClient extends Client {
  public commands: Collection<string, CommandInterface> = new Collection();
  public cooldowns: Collection<string, Map<string, number>> = new Collection();

  /**
   * Creates a new instance of the BotClient class.
   *
   * @param {ClientOptions} options - The options to use for the client.
   */
  constructor(options: ClientOptions) {
    super(options);
  }
}
