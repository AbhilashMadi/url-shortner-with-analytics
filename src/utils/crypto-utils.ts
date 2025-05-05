import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";
import envConfig from "@/configs/env.config.js";

// Function to derive key from passphrase and salt
function deriveKey(salt: Buffer): Buffer {
  const passphrase = envConfig.IP_HASH_SECRET; // Keep this passphrase safe
  return scryptSync(passphrase, salt, 32); // Key derived from passphrase and salt
}

// Function to encrypt IP
export function encryptIP(ip: string) {
  const salt = randomBytes(16); // Generate a random salt for this encryption
  const iv = randomBytes(16); // Random IV for each encryption
  const key = deriveKey(salt); // Derive the encryption key

  const cipher = createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(ip, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return { ip_hash: encrypted, iv: iv.toString('hex'), salt: salt.toString('hex') }; // Return encrypted IP, IV, and salt
}

// Function to decrypt IP
export function decryptIP(encryptedIP: string, ivHex: string, saltHex: string) {
  const iv = Buffer.from(ivHex, 'hex'); // IV used during encryption
  const salt = Buffer.from(saltHex, 'hex'); // Salt used during encryption
  const key = deriveKey(salt); // Derive the key using the salt

  const decipher = createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedIP, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
