import EnterCode from "@/components/2fa/EnterCode"
import Modal from "@/components/Modal"
import { ModalType } from "@/components/Modal"
import { useEffect } from "react"

interface Verify2FAModal {
  show: boolean
  closeModal: () => void
  onAuthCode: (authCode: string) => void
  success: boolean
  error: boolean
  loading: boolean
  reset: () => void
}

export default function Verify2FAModal(props: Verify2FAModal) {
  const { show, closeModal, onAuthCode, success, error, loading, reset } = props

  useEffect(() => {
    if (!success || !closeModal || !reset) return
    setTimeout(() => {
      reset()
      closeModal()
    }, 500)
  }, [success, closeModal, reset])

  return (
    <Modal show={show} closeModal={closeModal} modalType={ModalType.FullScreen}>
      <EnterCode
        onAuthCode={onAuthCode}
        mode="verify"
        verifyError={error}
        verifySuccess={success}
        verifyLoading={loading}
      />
    </Modal>
  )
}
