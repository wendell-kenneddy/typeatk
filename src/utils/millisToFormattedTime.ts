export function millisToFormattedTime(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1000);
  const remainder = milliseconds % 1000;
  return `${(milliseconds / 1000).toFixed(2)}`;
}
