import gatewayFetch from "@/utils/gatewayFetch"
import { useMutation } from "@tanstack/react-query"

interface UseSet2FAArgs {
  requestType: "setup2FA" | "complete2FA"
  onSuccess: (totpString?: string) => void
  onError?: () => void
}

export default function use2FA(args: UseSet2FAArgs) {
  return useMutation(gatewayFetch, {
    onSuccess: async (resp: Response) => {
      if (args.requestType === "setup2FA") {
        const authString = await resp.json()
        args.onSuccess(authString)
      }
      args.onSuccess()
    },
    onError: async (resp: Response) => {
      args.onError?.()
    },
  })
}
