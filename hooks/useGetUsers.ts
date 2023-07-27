import gatewayFetch from "@/utils/gatewayFetch"
import { useQuery } from "@tanstack/react-query"
import useAuthToken from "./useAuthToken"

export interface UserDataType {
  id: string
  name: string
  emailAddress: string
  role: "admin" | "manager" | "read"
  status: "Active" | "Invited"
}

export default function useGetUsers() {
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-users"],
    async () => {
      const usersResponse = await gatewayFetch({
        endpointPath: `/admin/organization/users`,
        sessionToken,
      })

      return (await usersResponse.json()) as UserDataType[]
    },
    { enabled: !!sessionToken}
  )
}
