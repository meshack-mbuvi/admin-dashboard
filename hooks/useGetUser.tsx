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
  is2FAEnabled: boolean
}

export default function useGetUser() {
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-user"],
    async () => {
      const usersResponse = await gatewayFetch({
        endpointPath: `/admin/user/profile`,
        sessionToken,
      })

      return (await usersResponse.json()) as UserDataType
    },
    { enabled: !!sessionToken }
  )
}
