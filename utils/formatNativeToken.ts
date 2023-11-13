import { formatEther, parseUnits } from "viem"

export const formatNativeToken = (
  amount: string | undefined | null,
  decimals: number
) => {
  if (!amount) return

  const parsedValue = parseUnits(amount, decimals)
  const formattedValue = Number(formatEther(parsedValue)).toLocaleString(
    "en-GB",
    { minimumFractionDigits: 2, maximumFractionDigits: 4 }
  )

  return formattedValue
}
