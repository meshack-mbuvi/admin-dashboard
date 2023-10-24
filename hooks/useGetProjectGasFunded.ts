import { useQuery } from "@tanstack/react-query"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "./useAuthToken"

interface UseGetProjectGasFundedArgs {
  projectId: string
  start?: string
  end?: string
}

type GetGasFundedResponse = Array<{chainId: number, amount: string}>

export default function useGetProjectGasFunded(args: UseGetProjectGasFundedArgs) {
  const { projectId, start, end } = args
  const sessionToken = useAuthToken()
  const searchParams = { 
    ...(start && { start }),
    ...(end && { end }),
   }
  const searchQuery = new URLSearchParams(searchParams)

  return useQuery(
    ["get-project-gas-funded"],
    async () => {
      const res = await gatewayFetch({
        endpointPath: `/funding/project/${projectId}/gasFunded?${searchQuery.toString()}`,
        sessionToken,
      })

      const data = (await res.json()) as GetGasFundedResponse
      return data
    },
    { enabled: !!sessionToken }
  )
}
