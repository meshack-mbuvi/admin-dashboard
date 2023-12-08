/**
 * format an account address in the format 0x3f6q9z52…54h2kjh51h5zfa
 * @param address the account address to format
 * @param start the position to start slicing the address from.
 * @param end number of characters to have after the ellipses.
 * */
export const centerTruncate = (string: string, start: number, end: number) => {
  if (string.length <= start + end) return string
  return `${string.slice(0, start)}…${string.slice(string.length - end)}`
}
