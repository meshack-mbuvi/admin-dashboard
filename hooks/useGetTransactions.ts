import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "./useAuthToken"
import { NetworkId } from "@/utils/getNetwork"
import { RawStatusEnum } from "@/components/Transactions/atoms/Status"

interface UseGetTransactionsArgs {
  projectId: string
  page: number
  limit: number
  statuses: RawStatusEnum[]
}
export interface TransactionDataType {
  block: number | null
  chainId: NetworkId
  createdAt: string
  hash: string
  reverted: boolean
  status: RawStatusEnum
  transactionId: string
  updatedAt: string
  walletAddress: string
}

export default function useGetTransactions(args: UseGetTransactionsArgs) {
  const { page, limit, statuses, projectId } = args

  const sessionToken = useAuthToken()

  const statusFilters: string = useMemo(() => {
    return statuses.map((status) => `status=${status}`).join("&")
  }, [statuses])

  return useQuery(
    ["get-transactions", projectId, page, limit, statusFilters],
    async () => {
      const data = await gatewayFetch<{transactionAttempts: TransactionDataType[]; total: number}>

      ({
        endpointPath: `/wallet/project/${projectId}/transactions?page=${page}&limit=${limit}&${statusFilters}`,
        sessionToken,
      })

      return data
    },
    { enabled: !!sessionToken, keepPreviousData: true },
    
  )
}
