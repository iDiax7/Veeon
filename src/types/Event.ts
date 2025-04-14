import { ClientEvents } from 'discord.js';

export interface EventInterface {
  name: keyof ClientEvents;
  once?: boolean;
  execute(...args: any[]): void;
}
