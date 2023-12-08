import { useMutation, useQueryClient } from "@tanstack/react-query"

import gatewayFetch, { JsonAwaitableResponse, ResponseError } from "@/utils/gatewayFetch"
import { SessionToken } from "@/utils/gatewayFetch"

interface FaucetFundsParams extends SessionToken {
  projectId: string
  chainId: number
  walletAddress: string
}

interface FaucetFundsResponse {
  success: boolean
}

export default function useFaucet() {
  const queryClient = useQueryClient()

  return useMutation<JsonAwaitableResponse<FaucetFundsResponse>, ResponseError, FaucetFundsParams>(
    ({
      sessionToken,
      ...args
    }) => {
      return gatewayFetch({
        method: "POST",
        endpointPath: "/funding/dripFaucet",
        body: JSON.stringify({
          projectId: args.projectId,
          chainId: args.chainId,
          walletAddress: args.walletAddress,
        }),
        sessionToken,
      })
    },
    {
      onSettled: (_, error, args) => {
        queryClient.invalidateQueries({
          queryKey: ["get-project-wallets", args.projectId, true],
        })
      },
    }
  )
}
