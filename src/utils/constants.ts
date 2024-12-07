// Cryptographic constants
export const IV_LENGTH = 16;
export const ENCRYPTION_KEY = crypto.getRandomValues(new Uint8Array(32));