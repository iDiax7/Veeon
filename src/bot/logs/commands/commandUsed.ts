import { codeBlock, CommandInteraction, EmbedBuilder } from 'discord.js';
import getUserAvatar from '../../../lib/userAvatar';

export default async function commandUsed(interaction: CommandInteraction) {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: interaction.user.username,
      iconURL: getUserAvatar(interaction.user),
    })
    .setTitle('Command used')
    .addFields({
      name: 'Name',
      value: codeBlock(interaction.commandName),
    })

  await interaction.guild?.channels
    .fetch('1276965532385542304')
    .then((channel: any) => channel?.send({ embeds: [embed] }));
}
