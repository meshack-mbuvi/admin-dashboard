import clsx from "clsx"

import { useUpgradeModalStore } from "@/store/useUpgradeModalStore"

type PremiumPillProps = {
  className?: string
}

export default function PremiumPill(props: PremiumPillProps) {
  const { className } = props
  const { toggle } = useUpgradeModalStore()
  return (
    <div
      onClick={() => toggle(true)}
      className={clsx(
        "bg-blue-nasa w-fit px-6 py-2.5 rounded-full items-center justify-center flex font-medium cursor-pointer",
        className
      )}
    >
      Premium Feature
    </div>
  )
}
