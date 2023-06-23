import { useQuery } from "@tanstack/react-query"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "./useAuthToken"

interface UseGetRequestArgs {
  projectId: string
  page: number
  limit: number
  invalid: boolean
}
export interface RequestDataType {
  createdAt: string
  invalid: boolean
  transactionId: string
  updatedAt: string
  transactionAttempts: []
}

export default function useGetRequest(args: UseGetRequestArgs) {
  const { page, limit, invalid, projectId } = args

  const sessionToken = useAuthToken()

  return useQuery(
    ["get-requests", projectId, page, limit, invalid],
    async () => {
      const res = await gatewayFetch({
        endpointPath: `/wallet/project/${projectId}/requests?invalid=${invalid}&page=${page}&limit=${limit}`,
        sessionToken,
      })

      const data = (await res.json()) as {
        transactionRequests: RequestDataType[]
        total: number
      }

      return data
    },
    { enabled: !!sessionToken, keepPreviousData: true }
  )
}
