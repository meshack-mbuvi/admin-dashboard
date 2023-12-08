import { useQuery } from "@tanstack/react-query"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "./useAuthToken"
import { DateTime, Nullable } from "@/types/utils"
import { Contract } from "./useCreateContract"

export type Project = {
  id: string
  createdAt: DateTime
  updatedAt: Nullable<DateTime>
  deletedAt: Nullable<DateTime>
  name: string
  environment: string
  organizationId: string
  allowlistIpRanges: Nullable<string[]>
  contracts: Contract[]
}

type GetProjectsResponse = Project[]

export default function useGetProjects() {
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-projects", sessionToken],
    async () => {
      const res = await gatewayFetch({
        endpointPath: "/admin/organization/projects",
        sessionToken,
      })

      const data = (await res.json()) as GetProjectsResponse
      return data
    },
    { enabled: !!sessionToken }
  )
}
