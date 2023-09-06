"use client"

import useGetOrganization from "@/hooks/useGetOrganization"

export default function FreePlanBadge() {
  const { data } = useGetOrganization()

  const isFreePlan = data?.organization?.tier === "free"

  if (!isFreePlan) return null

  // TODO: Swap to link once docs page is ready
  return (
    <div
      // href="https://docs.syndicate.io"
      // target="_blank"
      // rel="noopener"
      className="bg-blue-secondary rounded-full flex items-center px-3 text-xs h-6 ml-4"
    >
      Free Plan
    </div>
  )
}
