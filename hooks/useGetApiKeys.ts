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
    ["get-project-api-keys", projectId, sessionToken],
    async () => {
      const res = await gatewayFetch({
        sessionToken,
        endpointPath: `/admin/project/${projectId}/accessKeys`,
      })

      const data = (await res.json()) as ProjectAccessKeys[]

      return data
    },
    { enabled: !!sessionToken }
  )
}
