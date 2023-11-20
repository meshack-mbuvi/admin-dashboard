import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

import { RawStatusEnum } from "@/components/Transactions/atoms/Status"
import gatewayFetch from "@/utils/gatewayFetch"
import { NetworkId } from "@/utils/network"
import { formatISO, fromUnixTime } from "date-fns"
import useAuthToken from "./useAuthToken"

interface UseGetTransactionsArgs {
  projectId: string
  page: number
  limit: number
  statuses: RawStatusEnum[]
  search?: string
  reverted?: boolean | null
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
  const { page, limit, statuses, projectId, search, reverted } = args
  const sessionToken = useAuthToken()

  const statusFilters: string = useMemo(() => {
    return statuses.map((status) => `status=${status}`).join("&")
  }, [statuses])

  return useQuery(
    [
      "get-transactions",
      projectId,
      page,
      limit,
      statusFilters,
      search,
      reverted,
    ],
    async () => {
      let endpointPath: `/${string}` = `/wallet/project/${projectId}/transactions?page=${page}&limit=${limit}&${statusFilters}`
      if (search) {
        endpointPath += `&search=${search}`
      }
      if (reverted) {
        endpointPath += `&reverted=${reverted}`
      }
      const txRes = await gatewayFetch({
        endpointPath: endpointPath as `/${string}`,
        sessionToken,
      })

      const txData = (await txRes.json()) as {
        transactionAttempts: TransactionDataType[]
        total: number
      }

      const blocks = txData?.transactionAttempts
        .map((tx) => tx.block)
        .filter((block) => block !== 0)
      
      // DEV: if there are no transactions, return early
      if (txData?.total === 0 || blocks?.length === 0) {
        return txData
      }

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
