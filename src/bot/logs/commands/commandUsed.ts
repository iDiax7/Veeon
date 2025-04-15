import { codeBlock, CommandInteraction, EmbedBuilder } from 'discord.js';
import getUserAvatar from '../../../lib/userAvatar';
import { getTranslation } from '../../../lib/getTranslation';

export default async function commandUsed(interaction: CommandInteraction) {
  const { t } = await getTranslation(interaction);

  const embed = new EmbedBuilder()
    .setAuthor({
      name: interaction.user.username,
      iconURL: getUserAvatar(interaction.user),
    })
    .setTitle(t('events.commandUsed.commandUsed'))
    .addFields({
      name: t('events.commandUsed.command'),
      value: codeBlock(interaction.commandName),
    });

  await interaction.guild?.channels
    .fetch('1276965532385542304')
    .then((channel: any) => channel?.send({ embeds: [embed] }));
}
