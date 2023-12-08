import { useQuery } from "@tanstack/react-query"

import useAuthToken from "@/hooks/useAuthToken"
import gatewayFetch from "@/utils/gatewayFetch"
import { DateTime } from "@/types/utils"

export interface IPsDataType {
  id: string
  ipRange: string
  createdAt: DateTime
  note: string
}

interface useGetIpRangesArgs {
  projectId: string
}

export default function useGetIpRanges({ projectId }: useGetIpRangesArgs) {
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-ip-ranges", projectId, sessionToken],
    async () => {
      const allowedIPResponse = await gatewayFetch({
        endpointPath: `/admin/project/${projectId}/allowedIPRanges`,
        sessionToken,
      })

      return (await allowedIPResponse.json()) as IPsDataType[]
    },
    { enabled: !!sessionToken }
  )
}
