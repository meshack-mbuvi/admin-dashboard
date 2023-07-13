import EnterCode from "@/components/2fa/EnterCode"
import Modal from "@/components/Modal"
import { ModalType } from "@/components/Modal"

interface Verify2FAModal {
  show: boolean
  closeModal: () => void
}

export default function Verify2FAModal(props: Verify2FAModal) {
  const { show, closeModal } = props

  const onVerify = () => {
    setTimeout(() => {
      closeModal()
    }, 500)
  }
  return (
    <Modal show={show} closeModal={closeModal} modalType={ModalType.FullScreen}>
      <EnterCode onVerify={onVerify} mode="verify" />
    </Modal>
  )
}
