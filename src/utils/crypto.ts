import { bytesToHex, hexToBytes } from './hex';
import { ENCRYPTION_KEY, IV_LENGTH } from './constants';

export async function encrypt(text: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await crypto.subtle.importKey(
    'raw',
    ENCRYPTION_KEY,
    { name: 'AES-CBC' },
    false,
    ['encrypt']
  );

  const encoded = new TextEncoder().encode(text);
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv },
    key,
    encoded
  );

  const encryptedArray = new Uint8Array(encrypted);
  return `${bytesToHex(iv)}:${bytesToHex(encryptedArray)}`;
}

export async function decrypt(encryptedText: string): Promise<string> {
  const [ivHex, encryptedHex] = encryptedText.split(':');
  const iv = hexToBytes(ivHex);
  const encrypted = hexToBytes(encryptedHex);

  const key = await crypto.subtle.importKey(
    'raw',
    ENCRYPTION_KEY,
    { name: 'AES-CBC' },
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-CBC', iv },
    key,
    encrypted
  );

  return new TextDecoder().decode(decrypted);
}