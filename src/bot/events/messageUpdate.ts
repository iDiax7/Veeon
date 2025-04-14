import { EventInterface } from '../../types/Event';
import messageUpdated from '../logs/messages/messageUpdated';

const event: EventInterface = {
  name: 'messageUpdate',
  once: false,
  /**
   * Handles the messageUpdate event
   *
   * @param {Message<true>} oldMessage - The old Message
   * @param {Message<true>} newMessage - The new Message
   *
   * @returns {Promise<void>}
   */
  async execute(oldMessage, newMessage) {
    if (oldMessage.author.bot) return;
    if (!oldMessage.guild) return;
    if (oldMessage.content === newMessage.content) return;

    await messageUpdated(oldMessage, newMessage);
  },
};

export default event;
