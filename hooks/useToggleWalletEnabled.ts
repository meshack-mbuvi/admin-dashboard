import gatewayFetch, {
  GatewayFetchArgs,
  ResponseError,
} from "@/utils/gatewayFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useToggleWalletEnabled(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation<Response, ResponseError, GatewayFetchArgs>(gatewayFetch, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-project-wallets", projectId],
      })
    },
  })
}
