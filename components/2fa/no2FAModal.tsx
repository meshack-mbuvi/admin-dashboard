import clsx from "clsx"
import { useRouter } from "next/navigation"

import Button, { LightButtonStyles } from "@/components/Buttons"
import Modal from "@/components/Modal"
import TwoFactorIcon from "@/components/icons/TwoFactor"

interface No2FAModalProps {
  show: boolean
  closeModal: () => void
}

export default function No2FAModal(props: No2FAModalProps) {
  const { show, closeModal } = props
  const router = useRouter()

  return (
    <Modal show={show} closeModal={closeModal} outsideOnClick={true}>
      <div className="flex flex-col justify-center items-center text-center">
        <TwoFactorIcon className="w-44" />
        <div className="mt-4 text-2xl">Set up 2FA to continue</div>
        <div className="mt-4 text-gray-4 flex flex-col space-y-2">
          <div>
            Two factor authentication (2FA) is mandatory to perform this action,
            as it protects your organization from authorized access and
            maintains the integrity of sensitive information.
          </div>
          <div>
            Please ensure that you have enabled and configured 2FA for your
            account before proceeding.
          </div>
        </div>
        <Button
          className={clsx(LightButtonStyles, "mt-6")}
          onClick={() => router.push("/2fa")}
        >
          Continue
        </Button>
      </div>
    </Modal>
  )
}
