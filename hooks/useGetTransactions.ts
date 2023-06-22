import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "./useAuthToken"
import { NetworkId } from "@/utils/getNetwork"
import { RawStatusEnum } from "@/components/Transactions/atoms/Status"
import { formatISO, fromUnixTime } from "date-fns"

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
  blockTimestamp: string | null
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
      const txRes = await gatewayFetch<{
        transactionAttempts: TransactionDataType[]
        total: number
      }>({
        endpointPath: `/wallet/project/${projectId}/transactions?page=${page}&limit=${limit}&${statusFilters}`,
        sessionToken,
      })

      const blocks = txRes?.transactionAttempts.map((tx) => tx.block)
      const networkId = txRes?.transactionAttempts[0].chainId

      const blocksParam = blocks?.join(",")

      const res = await fetch(`/api/block/${networkId}/${blocksParam}`)
      const blocksData = (await res.json()) as {
        data: { block: string; timestamp: string }[]
      }

      const mergedData = txRes?.transactionAttempts.map((tx) => {
        const block = blocksData?.data?.find(
          (d) => d.block === tx.block?.toString()
        )
        const unixAsTimestamp = block?.timestamp
          ? formatISO(fromUnixTime(Number(block?.timestamp)))
          : null
        return {
          ...tx,
          blockTimestamp: unixAsTimestamp,
        }
      })

      const finalData = {
        transactionAttempts: mergedData,
        total: txRes?.total,
      }

      return finalData
    },
    { enabled: !!sessionToken, keepPreviousData: true }
  )
}
