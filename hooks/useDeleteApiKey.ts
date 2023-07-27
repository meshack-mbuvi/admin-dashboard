import gatewayFetch from "@/utils/gatewayFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useDeleteApiKey(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation(gatewayFetch, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-project-api-keys", projectId],
      })
    },
  })
}
