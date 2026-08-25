const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']

/** Roman numeral for a zero-based index (falls back to arabic past XII). */
export function roman(index: number): string {
  return NUMERALS[index] ?? String(index + 1)
}
