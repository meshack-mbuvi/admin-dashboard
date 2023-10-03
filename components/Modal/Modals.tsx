"use client"

import UpgradeRequiredModal from "@/components/Shared/UpgradeRequiredModal"

import { useUpgradeModalStore } from "@/store/useUpgradeModalStore"

export default function Modals() {
  const { show, toggle } = useUpgradeModalStore()
  return (
    <>
      <UpgradeRequiredModal show={show} handleClose={() => toggle(false)} />
    </>
  )
}
