import gatewayFetch from "@/utils/gatewayFetch"
import { useQuery } from "@tanstack/react-query"
import useAuthToken from "./useAuthToken"

export interface UserDataType {
  id: string
  stytchId: string
  name: string
  emailAddress: string
  role: "admin" | "manager" | "viewer" | "test-user"
  status: "Active" | "Invited"
  is2FaEnabled: boolean
}

export default function useGetUser() {
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-user", sessionToken],
    async () => {
      const usersResponse = await gatewayFetch({
        endpointPath: `/admin/user/profile`,
        sessionToken,
      })

      return (await usersResponse.json()) as UserDataType
    },
    // DEV: 10 minutes cache time because this data wont change frequently but is used in many places
    { enabled: !!sessionToken, staleTime: 10 * 60 * 1000 }
  )
}
