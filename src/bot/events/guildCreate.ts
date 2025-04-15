import createGuildConfig from '../../lib/createGuildConfig';
import { EventInterface } from '../../types/Event';

const event: EventInterface = {
  name: 'guildCreate',
  once: false,
  async execute(guild) {
    await createGuildConfig(guild);
  },
};

export default event;