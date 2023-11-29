"use client"

import { useStytchB2BClient } from "@stytch/nextjs/b2b"
import { useQuery } from "@tanstack/react-query"

import useGetUser from "@/hooks/useGetUser"

export default function useGetOrganizations() {
  const stytchClient = useStytchB2BClient()
  const { data: user } = useGetUser()

  return useQuery(
    ["get-organizations"],
    async () => {
      const { discovered_organizations } =
        await stytchClient.discovery.organizations.list()
      return discovered_organizations
    },
    { enabled: !!user?.id }
  )
}
