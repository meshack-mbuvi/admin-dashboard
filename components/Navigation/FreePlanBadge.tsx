"use client"

import useFreePlan from "@/hooks/useFreePlan"
import { useUpgradeModalStore } from "@/store/useUpgradeModalStore"

export default function FreePlanBadge() {
  const { toggle } = useUpgradeModalStore()
  const isFreePlan = useFreePlan()

  if (!isFreePlan) return null

  return (
    <div
      onClick={() => toggle(true)}
      className="bg-gray-6 rounded-full flex items-center px-3 text-xs h-6 ml-4 cursor-pointer"
    >
      Free Account
    </div>
  )
}
