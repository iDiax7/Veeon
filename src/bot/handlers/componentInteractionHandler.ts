import { Interaction } from 'discord.js';

/**
 * Handles a component interaction (button or select menu).
 *
 * @param {Interaction} interaction - The interaction to handle.
 * @param {...any} args - Any additional arguments to pass to the handler.
 */
export async function handleComponentInteraction(interaction: Interaction, ...args: any) {
  if (!interaction.isButton() && !interaction.isAnySelectMenu()) return;

  const id = interaction.customId.split(':')[0];

  try {
    const handlerPath = interaction.isButton()
      ? `../interactions/buttons/${id}`
      : `../interactions/selectMenus/${id}`;

    const handler = await import(handlerPath);
    if (handler && handler.default) {
      await handler.default(interaction, ...args);
    }
  } catch (e) {}
}
