import gatewayFetch from "@/utils/gatewayFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useDeleteUserById() {
  const queryClient = useQueryClient()

  return useMutation(gatewayFetch, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      })
    },
  })
}
