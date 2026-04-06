// Application configuration
// Admin passkey hash for verification
export const ADMIN_HASH = -1974915576;

export function computeHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}

export function verifyAdmin(input: string): boolean {
  return computeHash(input) === ADMIN_HASH;
}
