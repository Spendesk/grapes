const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';

const alphabetLength = alphabet.length;

const index = [0, 0];
const map = new Map();

/**
 * Generates a minimal className in the format `_grapes-XX`.
 * Handles 3844 possibilities, throws after
 * @returns string
 */
function generateClassName() {
  if (index[1] === alphabetLength) {
    throw new Error('Not enough possibility');
  }
  const className = `_grapes-${alphabet[index[0]]}${alphabet[index[1]]}`;
  if (++index[0] === alphabetLength) {
    index[0] = 0;
    ++index[1];
  }

  return className;
}

/**
 * Given a css name and a filename, returns a unique, minimal className
 * @param {string} name
 * @param {string} filename
 * @returns string
 */
export function getReducedClassName(name, filename) {
  const key = `${name}${filename}`;
  const savedClassName = map.get(key);
  if (savedClassName) {
    return savedClassName;
  }
  const className = generateClassName();
  map.set(key, className);

  return className;
}
