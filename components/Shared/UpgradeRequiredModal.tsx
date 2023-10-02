import clsx from "clsx"
import { ReactComponentElement } from "react"

import Modal from "@/components/Modal"
import Check from "@/components/icons/Check"
import { LightButtonStyles } from "@/components/Buttons"

type UpgradeRequiredModalProps = {
  show: boolean
  handleClose: () => void
}
type UpgradePerkProps = {
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

  return (
    <Modal
      show={show}
      outsideOnClick
      closeModal={() => {
        handleClose()
      }}
    >
      <div className="flex flex-col space-y-14">
        <p className="font-sans font-medium text-2xl text-gray-1">
          Upgrade to access premium features
        </p>
        <div className="space-y-4">
          {UpgradePerks.map((perk) => {
            return upgradePerkComponent({ text: perk })
          })}
        </div>
        <button className={clsx(LightButtonStyles, "rounded-lg w-full")}>
          Contact us to upgrade your account
        </button>
      </div>
    </Modal>
  )
}

function upgradePerkComponent(props: UpgradePerkProps) {
  const { text } = props

  return (
    <div className="flex space-x-3.5 items-center">
      <Check className="h-3.5 text-teal" />
      <div>{text}</div>
    </div>
  )
}
