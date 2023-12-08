import { useMutation, useQueryClient } from "@tanstack/react-query"

import gatewayFetch, { JsonAwaitableResponse, ResponseError } from "@/utils/gatewayFetch"
import { SessionToken } from "@/utils/gatewayFetch"
import { Project } from "./useGetProjects"

interface UpdateProjectNameParams extends SessionToken {
  name: string
}

interface UseUpdateProjectNameArgs {
  projectId: string
  onSuccess?: () => void
}

export default function useUpdateProjectName(args: UseUpdateProjectNameArgs) {
  const { projectId, onSuccess } = args
  const queryClient = useQueryClient()
  return useMutation<JsonAwaitableResponse<Project>, ResponseError, UpdateProjectNameParams>(({ sessionToken, ...body }) => gatewayFetch({
    method: "POST",
    endpointPath: `/admin/project/${projectId}/updateName`,
    body: JSON.stringify(body),
    sessionToken
  }), {
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["get-project-by-id", projectId],
        refetchType: "all",
      })

      queryClient.invalidateQueries({
        queryKey: ["get-projects"],
        refetchType: "all",
      })

      onSuccess && onSuccess()
    },
  })
}
