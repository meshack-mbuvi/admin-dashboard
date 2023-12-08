import { useMutation, useQueryClient } from "@tanstack/react-query"

import { MFA_HEADER_KEY } from "@/components/Shared/constants";
import { SessionToken } from "@/utils/gatewayFetch";
import { AuthCode } from "@/utils/gatewayFetch";
import gatewayFetch, { JsonAwaitableResponse, ResponseError } from "@/utils/gatewayFetch"

interface UseDeleteUserParams extends SessionToken, AuthCode {
  id: string;
}

interface UseDeleteUserResponse {}

export default function useDeleteUserById() {
  const queryClient = useQueryClient()

  return useMutation<JsonAwaitableResponse<UseDeleteUserResponse>, ResponseError, UseDeleteUserParams>(({ sessionToken, authCode, id }) => gatewayFetch({
    method: 'DELETE',
    endpointPath: `/admin/user/${id}`,
    headers: {
      [MFA_HEADER_KEY]: authCode,
    },
    sessionToken
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      })
    },
  })
}
