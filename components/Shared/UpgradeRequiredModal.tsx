import Link from "next/link"
import Modal from "../Modal"

type UpgradeRequiredModalProps = {
  show: boolean
  handleClose: () => void
}
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
      <div className="flex flex-col space-y-4">
        <p className="font-sans font-medium text-2xl text-gray-1">
          Upgrade Required
        </p>
        <p>
          This feature requires a Premium plan, please contact
          <Link
            href="mailto:support@syndicate.io"
            className="mx-1 text-gray-3 hover:bg-gray-8"
          >
            support@syndicate.io
          </Link>
          to upgrade.
        </p>
      </div>
    </Modal>
  )
}
