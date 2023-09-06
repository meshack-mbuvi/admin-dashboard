import gatewayFetch, {
  GatewayFetchArgs,
  ResponseError,
} from "@/utils/gatewayFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useCreateProject({
  onSuccess,
}: {
  onSuccess?: (data: Response) => void
} = {}) {
  const queryClient = useQueryClient()
  return useMutation<Response, ResponseError, GatewayFetchArgs>(gatewayFetch, {
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
      queryClient.invalidateQueries({
        queryKey: ["get-projects"],
      })
    },
  })
}
