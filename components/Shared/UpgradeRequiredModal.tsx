"use client"

import { cn } from "@/utils/cn"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { LightButtonStyles } from "@/components/Buttons"
import Modal from "@/components/Modal"
import Check from "@/components/icons/Check"

import useContactSales from "@/hooks/useContactSales"
import useGetUser from "@/hooks/useGetUser"
import Spinner from "../icons/Spinner"
import AppreciationContent from "./AppreciationContent"

type UpgradeRequiredModalProps = {
  show: boolean
  handleClose: () => void
}
type PerkProps = {
  text: string
}

const UpgradePerks: string[] = [
  "Production-scale API access",
  "Syndicate custom smart contract factories access",
  "Add your own smart contracts",
  "Add unlimited projects, smart contracts, members",
  "Deploy to any EVM blockchain",
  "Auto-scaling transaction wallets and managed gas",
  "API key creation, 2FA, advanced security settings",
  "Full developer dashboard functionality",
  "Priority support, shared Slack channel, custom SLA",
  "And more",
]

export default function UpgradeRequiredModalModal(
  props: UpgradeRequiredModalProps
) {
  const { show, handleClose } = props
  const pathname = usePathname()

  const { data } = useGetUser()
  const { mutateAsync, isLoading } = useContactSales()
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleUpgradeClick = async () => {
    if (!data) return

    mutateAsync({
      email: data?.emailAddress,
      referrer: pathname,
    }).then(() => {
      setHasSubmitted(true)
    })
  }

  const handleCloseClick = () => {
    handleClose()
    setHasSubmitted(false)
  }

  return (
    <Modal
      show={show}
      outsideOnClick
      overflowYScroll={true}
      closeModal={handleCloseClick}
    >
      {hasSubmitted ? (
        <AppreciationContent handleCloseClick={handleCloseClick} />
      ) : (
        <div className="flex flex-col space-y-8">
          <p className="font-sans font-medium text-2xl text-gray-1">
            Upgrade to access premium features
          </p>
          <div className="space-y-4">
            {UpgradePerks.map((perk, index) => {
              return <Perk text={perk} key={index} />
            })}
          </div>

          <button
            className={cn(LightButtonStyles, "rounded-lg w-full relative")}
            onClick={handleUpgradeClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex justify-center gap-3">
                <Spinner className="h-6 w-6 text-blue-neptune animate-spin" />
                Submitting...
              </span>
            ) : (
              "Contact us to upgrade your account"
            )}
          </button>
        </div>
      )}
    </Modal>
  )
}

const Perk = ({ text }: PerkProps) => (
  <div className="flex space-x-3.5 items-center">
    <Check className="h-3.5 text-teal" />
    <div className="text-sm">{text}</div>
  </div>
)
