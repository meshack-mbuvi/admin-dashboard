import { useQuery } from "@tanstack/react-query"

import {
  SimulateTransaction,
  simulateTransaction,
} from "@/utils/simulateTransaction"

export default function useTransactionSimulation(
  input: SimulateTransaction,
  enabled: boolean
) {
  return useQuery(
    [input.dataSuffix],
    async () => {
      return await simulateTransaction(input)
    },
    {
      enabled,
    }
  )
}
