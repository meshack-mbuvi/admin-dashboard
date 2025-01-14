import { useMutation, useQueryClient } from "@tanstack/react-query"

import gatewayFetch, {
  JsonAwaitableResponse,
  ResponseError,
} from "@/utils/gatewayFetch"
import { SessionToken } from "@/utils/gatewayFetch"
import { Project } from "./useGetProjects"

export type Environment = "staging" | "production"

interface CreateProjectParams extends SessionToken {
  organizationId: string
  name: string
  environment: Environment
  chainId: number
  numWallets: number
}

export default function useCreateProject({
  onSuccess,
}: {
  onSuccess?: (data: Response) => void
} = {}) {
  const queryClient = useQueryClient()
  return useMutation<JsonAwaitableResponse<Project>, ResponseError, CreateProjectParams>(({
    sessionToken,
    ...project
  }) => gatewayFetch({
    method: "POST",
    endpointPath: "/admin/project",
    body: JSON.stringify(project),
    sessionToken
  }), {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["get-projects"],
      })
      onSuccess && onSuccess(data)
    },
  })
}
