import { time } from 'discord.js';

/**
 * Returns a string in the format "dd/mm/yyyy / hh:mm:ss" given a Date object.
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string} The formatted date string.
 */
export default function timeFormatter(date: Date) {
  return `${time(date, 'F')} / ${time(date, 'R')}`;
}
