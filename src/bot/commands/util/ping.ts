import {
  codeBlock,
  EmbedBuilder,
  Message,
  SlashCommandBuilder,
} from 'discord.js';
import { CommandInterface } from '../../../types/Command';

const command: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  ownerOnly: true,
  /**
   * Sends a message with the latency of the bot in milliseconds.
   *
   * Latency is split into three fields: message latency, API latency, and bot
   * latency. The message latency is the time it takes for a message to be sent
   * and received. The API latency is the time it takes for the interaction to
   * be processed by the Discord API. The bot latency is the time it takes for
   * the bot to respond to the interaction.
   *
   * @param interaction The interaction object.
   */
  async execute(interaction) {
    await interaction.reply('...').then(async (message: Message) => {
      const embed = new EmbedBuilder()
        .addFields(
          {
            name: 'Message latency',
            value: codeBlock(
              `${message.createdTimestamp - interaction.createdTimestamp}ms`
            ),
          },
          {
            name: 'API latency',
            value: codeBlock(`${Date.now() - interaction.createdTimestamp}ms`),
          },
          {
            name: 'Bot latency',
            value: codeBlock(`${interaction.client.ws.ping}ms`),
          }
        )
        .setColor('Green');

      await message.edit({ embeds: [embed], content: '' });
    });
  },
};

export default command;
