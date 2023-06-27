import useAuthToken from "./useAuthToken";
import { useQuery } from "@tanstack/react-query"
import gatewayFetch from "@/utils/gatewayFetch"


export default function useGetOrganization() {
    const sessionToken = useAuthToken()

    return useQuery(
        ["get-organization"],
        async () => {
          const res = await gatewayFetch({
            endpointPath: "/admin/organization",
            sessionToken,
          })
    
          const data = (await res.json())
          return data
        },
        { enabled: !!sessionToken }
      )
}
