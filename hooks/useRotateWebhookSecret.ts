import { useMutation, useQueryClient } from "@tanstack/react-query"

import useAuthToken from "@/hooks/useAuthToken"
import gatewayFetch, { ResponseError } from "@/utils/gatewayFetch"

interface RotateWebhookArgs {
  projectId: string
  callbackEventId: string
}

export default function useRotateWebhookSecret() {
  const sessionToken = useAuthToken()
  const queryClient = useQueryClient()

  return useMutation<Response, ResponseError, RotateWebhookArgs>(
    (args) => {
      return gatewayFetch({
        method: "POST",
        endpointPath: `/webhook/project/${args.projectId}/eventCallback/${args.callbackEventId}/rotateSecret`,
        headers: {
          "Content-Type": "application/json",
        },
        sessionToken,
      })
    },
    {
      onSettled: (_, error, args) => {
        queryClient.invalidateQueries({
          queryKey: ["get-webhooks", , args.projectId, true],
        })
      },
    }
  )
}
