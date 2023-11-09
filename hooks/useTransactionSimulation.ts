import { useQuery } from "@tanstack/react-query"
import { Hex } from "viem"

interface SimulateTxArgs {
  chainId: number
  fromAddress: Hex
  toAddress: Hex
  functionSignature: string
  args: any
  dataSuffix: Hex
  value: string
}

interface SimulateTxResponse {
  success: boolean
  message: string
}

export default function useTransactionSimulation(
  input: SimulateTxArgs,
  enabled: boolean
) {
  return useQuery<SimulateTxResponse>(
    [input.dataSuffix],
    async () => {
      const res = await fetch(`/api/simulate-tx`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        const message = await res.text()
        throw new Error(message)
      }

      const data = await res.json()
      return data
    },
    {
      enabled,
    }
  )
}
