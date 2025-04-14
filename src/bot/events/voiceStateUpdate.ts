import { EventInterface } from '../../types/Event';
import voiceStateUpdated from '../logs/voice/voiceStateUpdated';

const event: EventInterface = {
  name: 'voiceStateUpdate',
  once: false,
  /**
   * Handles the voiceStateUpdate event
   *
   * @param {VoiceState} oldState - The old VoiceState
   * @param {VoiceState} newState - The new VoiceState
   *
   * @returns {Promise<void>}
   */
  async execute(oldState, newState) {
    await voiceStateUpdated(oldState, newState);
  },
};

export default event;
