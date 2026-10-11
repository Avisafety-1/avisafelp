/** Band colour i of n: brand blue through cyan to "all clear" green. */
export function bandColor(i: number, n: number) {
  const t = n > 1 ? i / (n - 1) : 0;
  return `hsl(${212 - 62 * t} ${95 - 25 * t}% ${62 - 12 * t}%)`;
}
