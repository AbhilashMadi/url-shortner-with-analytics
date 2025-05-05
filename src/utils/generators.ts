import { customAlphabet } from 'nanoid';

// Use only alphanumeric characters
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Generate a 6-character nanoid function
const nanoid6 = customAlphabet(alphabet, 6);

export function generateAlias(): string {
  return nanoid6();
}
