import { useQuery } from "@tanstack/react-query"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "./useAuthToken"

export default function useGetProjects() {
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-projects"],
    async () => {
      const data = await gatewayFetch({
        endpointPath: "/admin/organization/projects",
        sessionToken,
      })

      return data
    },
    { enabled: !!sessionToken }
  )
}
