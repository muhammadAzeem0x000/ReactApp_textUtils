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
