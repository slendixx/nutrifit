export function generateLengthNString(length: number, char: string) {
  return new Array(length + 1).join(char);
}