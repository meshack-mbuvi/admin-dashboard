import { useQuery } from "@tanstack/react-query"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "./useAuthToken"

export type GetProjectsResponse = {
  id: string
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  name: string
  organizationId: string
  tokens: {
    id: string
    createdAt: string
    updatedAt: string | null
    deletedAt: string | null
    chainId: number
    address: string
    expiresAt: string | null
    functionSignatures: []
    projectId: string
  }[]
}[]

export default function useGetProjects() {
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-projects"],
    async () => {
      const data = await gatewayFetch<GetProjectsResponse>({
        endpointPath: "/admin/organization/projects",
        sessionToken,
      })

      return data
    },
    { enabled: !!sessionToken }
  )
}
