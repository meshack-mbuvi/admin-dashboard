import { useMutation, useQueryClient } from "@tanstack/react-query"

import gatewayFetch, {
  ResponseError,
} from "@/utils/gatewayFetch"
import { SessionToken } from "@/utils/gatewayFetch"

interface CreateDemoProjectParams extends SessionToken {
  organizationId: string
}

export default function useCreateDemoProject({
  onSuccess,
}: {
  onSuccess?: (data: Response) => void
} = {}) {
  const queryClient = useQueryClient()
  return useMutation<Response, ResponseError, CreateDemoProjectParams>(({ sessionToken, ...project }) => gatewayFetch({
    method: "POST",
    endpointPath: "/admin/project/demo",
    body: JSON.stringify(project),
    sessionToken
  }), {
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
      queryClient.invalidateQueries({
        queryKey: ["get-projects"],
      })
    },
  })
}
