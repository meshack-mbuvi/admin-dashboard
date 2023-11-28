import { useMutation } from "@tanstack/react-query"

import useAuthToken from "./useAuthToken"

import gatewayFetch, { ResponseError } from "@/utils/gatewayFetch"

interface FaucetFundsArgs {
  projectId: string
  chainId: number
  walletAddress: string
}

interface FaucetFundsResponse extends Response {
  json: () => Promise<{
    success: boolean
  }>
}

export default function useFaucet() {
  const sessionToken = useAuthToken()

  return useMutation<FaucetFundsResponse, ResponseError, FaucetFundsArgs>(
    (args) => {
      return gatewayFetch({
        method: "POST",
        endpointPath: "/funding/dripFaucet",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: args.projectId,
          chainId: args.chainId,
          walletAddress: args.walletAddress,
        }),
        sessionToken,
      })
    }
  )
}
