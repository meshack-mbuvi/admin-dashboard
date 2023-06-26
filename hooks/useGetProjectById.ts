import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "./useAuthToken"

interface UseGetProjectByIdArgs {
  projectId: string
}

export interface ProjectInterface {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  name: string
  organizationId: string
  tokens: any[]
}

export default function useGetProjectById(
  args: UseGetProjectByIdArgs,
  queryOptions?: UseQueryOptions<
    ProjectInterface,
    unknown,
    ProjectInterface,
    string[]
  >
) {
  const { projectId } = args
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-project-by-id", projectId],
    async () => {
      const res = await gatewayFetch({
        endpointPath: `/admin/project/${projectId}`,
        sessionToken,
      })

      const data = (await res.json()) as ProjectInterface

      return data
    },
    { enabled: !!sessionToken, ...queryOptions }
  )
}
