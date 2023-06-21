import gatewayFetch from "@/utils/gatewayFetch"
import { useQuery } from "@tanstack/react-query"
import useAuthToken from "./useAuthToken"

interface UseGetProjectApiKeysArgs {
  projectId: string
}

export interface ProjectAccessKeys {
  AccessKey: AccessKey
  RoleTitle: string
}

export interface AccessKey {
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
        sessionToken,
        endpointPath: `/admin/project/${projectId}/accessKeys`,
      })

      return data
    },
    { enabled: !!sessionToken }
  )
}
