import gatewayFetch, { GatewayFetchArgs } from "@/utils/gatewayFetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useCreateApiKey<ResponseData>(projectId: string) {
    const queryClient = useQueryClient()
    return useMutation<ResponseData, unknown, GatewayFetchArgs>(gatewayFetch, {
        onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["get-project-api-keys", projectId],
            })
        },
    })
};
