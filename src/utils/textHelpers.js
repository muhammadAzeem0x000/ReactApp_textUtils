/**
 * Counts the number of words in a text string.
 * Filters out empty strings from split results.
 */
export function countWords(text) {
  if (!text || text.trim().length === 0) return 0;
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

/**
 * Estimates reading time in minutes based on word count.
 * Average reading speed: ~200 words per minute.
 */
export function getReadingTime(text) {
  const words = countWords(text);
  const minutes = words / 200;
  return Math.max(minutes, 0).toFixed(2);
}

/**
 * Removes extra whitespace from text, collapsing multiple spaces into one.
 */
export function removeExtraSpaces(text) {
  return text.split(/[ ]+/).join(' ').trim();
}

/**
 * Converts text to title case (first letter of each word capitalized).
 */
export function toTitleCase(text) {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Reverses the given text string.
 */
export function reverseText(text) {
  return text.split('').reverse().join('');
}

// ─── Bold Unicode Maps (Mathematical Sans-Serif Bold) ───
const NORMAL_CHARS =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const BOLD_CHARS =
  '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵';

// Spread into arrays so each multi-byte codepoint is one element
const normalArr = [...NORMAL_CHARS];
const boldArr = [...BOLD_CHARS];

const normalToBold = new Map(normalArr.map((ch, i) => [ch, boldArr[i]]));
const boldToNormal = new Map(boldArr.map((ch, i) => [ch, normalArr[i]]));

/**
 * Converts text to Unicode bold characters (Mathematical Sans-Serif Bold).
 * Letters and digits are converted; everything else passes through unchanged.
 */
export function toBoldText(text) {
  return [...text].map((ch) => normalToBold.get(ch) ?? ch).join('');
}

/**
 * Converts bold Unicode characters back to their normal equivalents.
 */
export function fromBoldText(text) {
  return [...text].map((ch) => boldToNormal.get(ch) ?? ch).join('');
}
