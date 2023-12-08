import useAuthToken from "./useAuthToken"
import { useQuery } from "@tanstack/react-query"
import gatewayFetch from "@/utils/gatewayFetch"
import { Project } from "./useGetProjects"
import { UserDataType } from "./useGetUser"
import { DateTime, Nullable } from "@/types/utils"

export interface Organization {
  organization: {
    id: string
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: Nullable<DateTime>
    name: string
    contact: string
    accessKeys: Nullable<string[]>
    projects: Project[]
    users: UserDataType[]
    stytchId: string
    tier: "free" | "premium"
  }
  stytchInformation: {
    email_allowed_domains: string[]
    organization_logo_url: Nullable<string>
  }
}

export default function useGetOrganization() {
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-organization", sessionToken],
    async () => {
      const res = await gatewayFetch({
        endpointPath: "/admin/organization",
        sessionToken,
      })

      const data = (await res.json()) as Organization
      return data
    },
    // DEV: 10 minutes cache time because this data wont change frequently but is used in many places
    { enabled: !!sessionToken, staleTime: 10 * 60 * 1000 }
  )
}
