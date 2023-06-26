import gatewayFetch from "@/utils/gatewayFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UseUpdateProjectNameArgs {
  projectId: string
  onSuccess?: () => void
}

export default function useUpdateProjectName(args: UseUpdateProjectNameArgs) {
  const { projectId, onSuccess } = args
  const queryClient = useQueryClient()
  return useMutation(gatewayFetch, {
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
