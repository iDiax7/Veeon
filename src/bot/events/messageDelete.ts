import { EventInterface } from '../../types/Event';
import messageDeleted from '../logs/messages/messageDeleted';

const event: EventInterface = {
  name: 'messageDelete',
  once: false,
  /**
   * Handles the messageDelete event.
   *
   * @param {Message<true>} message - The message that was deleted.
   *
   * Ignores messages from bots and messages not from guilds.
   * Delegates processing to the messageDeleted function.
   */

  async execute(message) {
    if (message.author.bot) return;
    if (!message.guild) return;

    await messageDeleted(message);
  },
};

export default event;
