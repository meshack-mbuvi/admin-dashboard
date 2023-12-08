import { useMutation, useQueryClient } from "@tanstack/react-query"

import gatewayFetch, { ResponseError } from "@/utils/gatewayFetch"
import { SessionToken } from "@/utils/gatewayFetch";
import { MFA_HEADER_KEY } from "@/components/Shared/constants";

interface DeleteApiKeyParams extends SessionToken {
  accessKeyId: string;
  authCode: string;
}

export default function useDeleteApiKey(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation<Response, ResponseError, DeleteApiKeyParams>(({ sessionToken, ...params }) => gatewayFetch({
    method: "DELETE",
    endpointPath: `/admin/accessKey/${params.accessKeyId}`,
    headers: {
      [MFA_HEADER_KEY]: params.authCode,
    },
    sessionToken
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-project-api-keys", projectId],
      })
    },
  })
}
