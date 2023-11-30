import gatewayFetch from "@/utils/gatewayFetch"
import { useQuery } from "@tanstack/react-query"
import useAuthToken from "./useAuthToken"
import { UserDataType } from "./useGetUser"

export default function useGetUsers() {
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-users", sessionToken],
    async () => {
      const usersResponse = await gatewayFetch({
        endpointPath: `/admin/organization/users`,
        sessionToken,
      })

      return (await usersResponse.json()) as UserDataType[]
    },
    { enabled: !!sessionToken }
  )
}
