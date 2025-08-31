export function isPalindrome(input: string): boolean {
  const normalized = (input ?? '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
  if (!normalized) return false
  const reversed = [...normalized].reverse().join('')
  return normalized === reversed
}
