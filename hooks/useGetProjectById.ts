import gatewayFetch from "@/utils/gatewayFetch"
import { useQuery } from "@tanstack/react-query"
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

export default function useGetProjectById(args: UseGetProjectByIdArgs) {
  const { projectId } = args
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-project-by-id", projectId],
    async () => {
      const data = await gatewayFetch<ProjectInterface>({
        endpointPath: `/admin/project/${projectId}`,
        sessionToken,
      })

      return data
    },
    { enabled: !!sessionToken }
  )
}
