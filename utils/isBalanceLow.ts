import { parseUnits } from "viem"

export const isBalanceLow = (balance: string | null, decimals: number) => {
  if (!balance) return true
  // Equivalent of 30 Gwei
  const minAmount = parseUnits("30000000000", decimals)

  return parseUnits(balance, decimals) < minAmount
}
