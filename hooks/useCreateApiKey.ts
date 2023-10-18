import gatewayFetch from "@/utils/gatewayFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useCreateApiKey(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation(gatewayFetch, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-project-api-keys", projectId],
      })
      queryClient.invalidateQueries({
        queryKey: ["get-user"],
      })
    },
  })
}
