import { useMutation, useQueryClient } from "@tanstack/react-query";

import gatewayFetch, { JsonAwaitableResponse, ResponseError } from "@/utils/gatewayFetch";
import { SessionToken } from "@/utils/gatewayFetch";
import { AuthCode } from "@/utils/gatewayFetch";

interface UseComplete2FAArgs {
  onSuccess: () => void;
  onError: () => void;
}

interface UseComplete2FAParams extends SessionToken, AuthCode {}

interface UseComplete2FAResponse {}

export default function useComplete2FA(args: UseComplete2FAArgs) {
  const { onSuccess, onError } = args;
  const queryClient = useQueryClient()
  return useMutation<JsonAwaitableResponse<UseComplete2FAResponse>, ResponseError, UseComplete2FAParams>(({ authCode, sessionToken }) => gatewayFetch({
    method: "POST",
    endpointPath: '/admin/user/complete2FA',
    body: JSON.stringify({
      Code: authCode
    }),
    sessionToken
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-user"],
      })
      return onSuccess()
    },
    onError
  })
}
