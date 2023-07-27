import gatewayFetch, {
  GatewayFetchArgs,
  ResponseError,
} from "@/utils/gatewayFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation<Response, ResponseError, GatewayFetchArgs>(gatewayFetch, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      })
    },
  })
}
