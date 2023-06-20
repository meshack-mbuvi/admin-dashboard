import gatewayFetch from "@/utils/gatewayFetch"
import { useQuery } from "@tanstack/react-query"
import useAuthToken from "./useAuthToken"

interface UseGetProjectApiKeysArgs {
  projectId: string
}

export interface ProjectAccessKeys {
  AccesKey: AccesKey
  RoleTitle: string
}

export interface AccesKey {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  key: string
  hash: string
  expiresAt: any
  organizationId: string
}

export default function useGetProjectApiKeys(args: UseGetProjectApiKeysArgs) {
  const { projectId } = args
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-project-api-keys", projectId],
    async () => {
      const data = await gatewayFetch<ProjectAccessKeys[]>({
        endpointPath: `/admin/project/${projectId}/accessKeys`,
        sessionToken,
      })

      return data
    },
    { enabled: !!sessionToken }
  )
}