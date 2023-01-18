export function truncatePassword(password: string) {
  //I want to keep characters with indices from 0-255
  return password.slice(0, Math.min(password.length, 256));
}