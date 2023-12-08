import { useMutation } from "@tanstack/react-query";

import gatewayFetch, { JsonAwaitableResponse, ResponseError } from "@/utils/gatewayFetch";
import { SessionToken } from "@/utils/gatewayFetch";

interface UseSetup2FAParams extends SessionToken {}

interface UseSetup2FA {
  onSuccess: (authString: string) => void
}

type UseSetup2FAResponse = string

export default function useSetup2FA(args: UseSetup2FA) {
  const { onSuccess } = args;
  return useMutation<JsonAwaitableResponse<UseSetup2FAResponse>, ResponseError, UseSetup2FAParams>(({ sessionToken }) => gatewayFetch({
    method: "POST",
    endpointPath: '/admin/user/set2FA',
    sessionToken
  }), {
    onSuccess: async (res) => {
      const authString = await res.json()
      return onSuccess(authString)
    }
  })
}
