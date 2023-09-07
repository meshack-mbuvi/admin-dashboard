
import { useQuery } from "@tanstack/react-query"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "@/hooks/useAuthToken"

export interface IPsDataType {
  id: string
  ipRange: string
  createdAt: string
}

interface useGetIpRangesArgs {
  projectId: string
}

export default function useGetIpRanges({
  projectId
}: useGetIpRangesArgs) {
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-ip-ranges", projectId],
    async () => {
      const allowedIPResponse = await gatewayFetch({
        endpointPath: `/admin/project/${projectId}/allowedIPRanges`,
        sessionToken
      })

      return (await allowedIPResponse.json()) as IPsDataType[]
    },
    { enabled: !!sessionToken}
  )
}