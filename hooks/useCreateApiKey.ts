import { useMutation, useQueryClient } from "@tanstack/react-query"

import gatewayFetch, { JsonAwaitableResponse, ResponseError } from "@/utils/gatewayFetch"
import { DateTime, Nullable } from "@/types/utils";
import { SessionToken } from "@/utils/gatewayFetch";
import { MFA_HEADER_KEY } from "@/components/Shared/constants";

interface CreateApiKeyParams extends SessionToken {
  authCode: string
}

interface ApiKey {
  id: string;
  createdAt: DateTime,
  updatedAt: DateTime,
  deletedAt: Nullable<DateTime>,
  key: string,
  hash: string,
  expiresAt: Nullable<DateTime>,
  organizationId: string
}

export default function useCreateApiKey(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation<JsonAwaitableResponse<ApiKey>, ResponseError, CreateApiKeyParams>(({ authCode, sessionToken }) => gatewayFetch({
    method: "POST",
    endpointPath: '/admin/accessKey',
    body: JSON.stringify({
      projectId,
      roleTitle: 'admin'
    }),
    headers: {
      [MFA_HEADER_KEY]: authCode,
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
