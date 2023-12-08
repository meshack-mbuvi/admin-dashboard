import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "./useAuthToken"
import { Project } from "./useGetProjects"

interface UseGetProjectByIdArgs {
  projectId: string
}

export interface IFunctionSignature {
  id: string
  signature: string
}

export default function useGetProjectById(
  args: UseGetProjectByIdArgs,
  queryOptions?: UseQueryOptions<
    Project,
    unknown,
    Project,
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

      const data = (await res.json()) as Project

      return data
    },
    { enabled: !!sessionToken && !!projectId, ...queryOptions }
  )
}
