import { codeBlock, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { CommandInterface } from '../../../types/Command';
import Hasher from '../../../lib/hasher';
import { getTranslation } from '../../../lib/getTranslation';

const command: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('hasher')
    .setDescription('Hash or unhash a string')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('hash')
        .setDescription('Hash a string')
        .addStringOption((option) =>
          option
            .setName('string')
            .setDescription('The string you want to hash')
            .setRequired(true)
        )
        .addBooleanOption((option) =>
          option
            .setName('secured')
            .setDescription('No one except you can decrypt the code')
            .setRequired(false)
        )
        .addBooleanOption((option) =>
          option
            .setName('info')
            .setDescription('Add some info about the hash to the code')
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('unhash')
        .setDescription('Unhash a string')
        .addStringOption((option) =>
          option
            .setName('code')
            .setDescription('The code you want to unhash')
            .setRequired(true)
        )
    ),
  /**
   * Handles the /hasher command.
   *
   * @param {ChatInputCommandInteraction} interaction
   * The interaction object.
   */
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    const hasher = new Hasher(process.env.SECRET_KEY!);

    const { t } = await getTranslation(interaction);

    switch (subcommand) {
      case 'hash': {
        const string = interaction.options.getString('string');
        const secured = interaction.options.getBoolean('secured') || false;
        const info = interaction.options.getBoolean('info') || false;

        const value = info
          ? string +
            `\n\n--------------------\ndate: ${Date.now()}\nuser: ${
              interaction.user.id
            }\nguild: ${interaction.guildId}\nchannel: ${
              interaction.channelId
            }\ncharacters: ${string.length}\nsecured: ${secured}`
          : string;

        const payload = JSON.stringify({
          value,
          userId: secured ? interaction.user.id : null,
        });

        const hashed = hasher.encrypt(payload);

        await interaction.reply({
          content: codeBlock(hashed),
          ephemeral: true,
        });

        break;
      }

      case 'unhash': {
        const code = interaction.options.getString('code');

        try {
          const unhashed = hasher.decrypt(code);
          const data = JSON.parse(unhashed);

          if (data.userId && data.userId !== interaction.user.id) {
            const embed = new EmbedBuilder()
              .setDescription(t('commands.hasher.secured'))
              .setColor('Red');

            await interaction.reply({
              embeds: [embed],
              ephemeral: true,
            });

            return;
          }

          await interaction.reply({
            content: codeBlock(data.value),
            ephemeral: true,
          });
        } catch (error) {
          const embed = new EmbedBuilder()
            .setDescription(t('commands.hasher.wrongCode'))
            .setColor('Red');

          await interaction.reply({
            embeds: [embed],
            ephemeral: true,
          });
        }

        break;
      }
    }
  },
};

export default command;
