import { useQuery } from "@tanstack/react-query"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "./useAuthToken"

interface UseGetRequestsArgs {
  projectId: string
  page: number
  limit: number
  invalid: boolean
  search?: string
}
export interface RequestsDataType {
  createdAt: string
  invalid: boolean
  transactionId: string
  updatedAt: string
  chainId: number
  contractAddress: string
  functionSignature: string
  data: string
  value: string
  transactionAttempts: []
  decodedData: Record<string, string | boolean | object | unknown[]>
}

export default function useGetRequests(args: UseGetRequestsArgs) {
  const { page, limit, invalid, projectId, search } = args

  const sessionToken = useAuthToken()

  return useQuery(
    ["get-requests", projectId, page, limit, invalid, search, sessionToken],
    async () => {
      let endpointPath = `/wallet/project/${projectId}/requests?invalid=${invalid}&page=${page}&limit=${limit}`

      if (search) {
        endpointPath += `&search=${search}`
      }

      const res = await gatewayFetch({
        endpointPath: endpointPath as `/${string}`,
        sessionToken,
      })

      const data = (await res.json()) as {
        transactionRequests: RequestsDataType[]
        total: number
      }

      return data
    },
    { enabled: !!sessionToken, keepPreviousData: true }
  )
}
