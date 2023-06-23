import gatewayFetch from "@/utils/gatewayFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useProjectNameUpdater(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation(gatewayFetch, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-project-by-id", projectId],
      })
    },
  })
}
