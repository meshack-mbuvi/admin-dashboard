import { useQuery } from "@tanstack/react-query"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "./useAuthToken"
import { DateTime, Nullable } from "@/types/utils"

interface UseGetProjectApiKeysArgs {
  projectId: string
}

export interface ProjectAccessKeys {
  AccessKey: AccessKey
  RoleTitle: string
}

export interface AccessKey {
  id: string
  createdAt: DateTime
  updatedAt: DateTime
  deletedAt: any
  key: string
  hash: string
  expiresAt: Nullable<DateTime>
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
