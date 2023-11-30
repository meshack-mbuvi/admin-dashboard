import { useQuery } from "@tanstack/react-query"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "./useAuthToken"

interface UseGetProjectTransactionStatsArgs {
  projectId: string
}

type ProjectTransactionStats = {
  numberOfConfirmedTransactions: number
  numberOfSubmittedTransactions: number
  numberOfPendingTransactions: number
  numberOfFailedTransactions: number
}

export default function useGetProjectTransactionStats(
  args: UseGetProjectTransactionStatsArgs
) {
  const { projectId } = args
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-project-transaction-stats", projectId, sessionToken],
    async () => {
      const res = await gatewayFetch({
        endpointPath: `/wallet/project/${projectId}/transactionStats`,
        sessionToken,
      })

      const data = (await res.json()) as ProjectTransactionStats

      return data
    },
    { enabled: !!sessionToken }
  )
}
