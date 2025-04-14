import { codeBlock, SlashCommandBuilder } from 'discord.js';
import { CommandInterface } from '../../../types/Command';

const command: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Evaluates a code')
    .addStringOption((option) =>
      option
        .setName('code')
        .setDescription('The code to evaluate')
        .setRequired(true)
    ),
  ownerOnly: true,
  /**
   * Evaluates a code provided by the user and sends the result back to the user.
   * If the code throws an error, the error is sent instead.
   * @param interaction - The interaction object.
   */
  async execute(interaction) {
    const code = interaction.options.getString('code');

    try {
      const result = eval(code);
      await interaction.reply({
        content: codeBlock(result),
      });
    } catch (error) {
      await interaction.reply({
        content: error,
      });
    }
  },
};

export default command;
