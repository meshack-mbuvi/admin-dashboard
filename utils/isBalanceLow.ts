import { parseUnits } from "viem"

export const isBalanceLow = (balance: string | null, decimals: number) => {
  if (!balance) return true
  const minAmount = parseUnits("30", decimals)

  return parseUnits(balance, decimals) < minAmount
}
