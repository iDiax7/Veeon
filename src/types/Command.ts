import { PermissionResolvable, SlashCommandBuilder } from 'discord.js';

export interface CommandInterface {
  data: SlashCommandBuilder | any;
  execute(message: any, args: any): void;

  ownerOnly?: boolean;
  userPermissions?: PermissionResolvable[];
  allowedGuilds?: string[];
  requiredRoles?: string[];
  cooldown?: number;
  guildOwnerOnly?: boolean;
}
