import { useMutation, useQueryClient } from "@tanstack/react-query"

import gatewayFetch, {
  JsonAwaitableResponse,
  ResponseError,
} from "@/utils/gatewayFetch"
import { SessionToken } from "@/utils/gatewayFetch";
import { Wallet } from "./useGetProjectWallets";

interface ToggleWalletParams extends SessionToken {
  walletAddress: string;
}

export default function useToggleWalletEnabled(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation<JsonAwaitableResponse<Wallet>, ResponseError, ToggleWalletParams>(({ sessionToken, ...params }) => gatewayFetch({
    method: "POST",
    endpointPath: '/wallet/toggleIsActive',
    body: JSON.stringify({
      ...params,
      projectId
    }),
    sessionToken
  }), {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-project-wallets", projectId],
      })
    },
  })
}
