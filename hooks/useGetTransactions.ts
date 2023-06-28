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
  search?: string
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
  const { page, limit, statuses, projectId, search } = args

  const sessionToken = useAuthToken()

  const statusFilters: string = useMemo(() => {
    return statuses.map((status) => `status=${status}`).join("&")
  }, [statuses])

  return useQuery(
    ["get-transactions", projectId, page, limit, statusFilters, search],
    async () => {
      const txRes = await gatewayFetch({
        endpointPath: `/wallet/project/${projectId}/transactions?page=${page}&limit=${limit}&${statusFilters}${search && `&search=${search}`}`,
        sessionToken,
      })

      const txData = (await txRes.json()) as {
        transactionAttempts: TransactionDataType[]
        total: number
      }

      // DEV: if there are no transactions, return early
      if (txData?.total === 0) {
        return txData
      }

      const blocks = txData?.transactionAttempts.map((tx) => tx.block)
      const networkId = txData?.transactionAttempts[0].chainId

      const blocksParam = blocks?.join(",")

      const res = await fetch(`/api/block/${networkId}/${blocksParam}`)
      const blocksData = (await res.json()) as {
        data: { block: string; timestamp: string }[]
      }

      const mergedData = txData?.transactionAttempts.map((tx) => {
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
        total: txData?.total,
      }

      return finalData
    },
    { enabled: !!sessionToken, keepPreviousData: true }
  )
}
