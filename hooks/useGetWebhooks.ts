import { useQuery } from "@tanstack/react-query"

import useAuthToken from "@/hooks/useAuthToken"
import gatewayFetch from "@/utils/gatewayFetch"

export interface WebhooksDataType {
  id: string
  eventType: string
  projectId: string
  callbackURL: string
  secret: string
}

interface useGetWebhooksArgs {
  projectId: string
}

export default function useGetWebhooks({ projectId }: useGetWebhooksArgs) {
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-webhooks", projectId, sessionToken],
    async () => {
      const webhooksResponse = await gatewayFetch({
        endpointPath: `/webhook/project/${projectId}/eventCallback`,
        sessionToken,
      })

      return (await webhooksResponse.json()) as WebhooksDataType[]
    },
    { enabled: !!sessionToken }
  )
}
