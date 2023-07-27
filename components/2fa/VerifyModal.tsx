import { useEffect, useState } from "react"

import EnterCode from "@/components/2fa/EnterCode"
import Modal from "@/components/Modal"
import { ModalType } from "@/components/Modal"
import StatusModal, { RequestStatus } from "@/components/StatusModal"

interface Verify2FAModal {
  show: boolean
  closeModal: () => void
  onAuthCode: (authCode: string) => void
  success: boolean
  error: boolean
  authCodeError: boolean
  loading: boolean
  reset: () => void
  statusMessage?: string
}

export default function Verify2FAModal(props: Verify2FAModal) {
  const {
    show,
    closeModal,
    onAuthCode,
    success,
    error,
    authCodeError,
    loading,
    reset,
    statusMessage,
  } = props
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false)
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    RequestStatus.PENDING
  )

  useEffect(() => {
    if (!success || !closeModal || !reset) return
    if (success) {
      setRequestStatus(RequestStatus.SUCCESS)
      setShowStatusModal(true)
      setTimeout(() => {
        setShowStatusModal(false)
        reset()
      }, 3000)
    }
    setTimeout(() => {
      closeModal()
    }, 300)
  }, [success, closeModal, reset])

  useEffect(() => {
    if (error) {
      setRequestStatus(RequestStatus.FAILURE)
      setShowStatusModal(true)
      closeModal()
      return
    }
  }, [error, closeModal])

  return (
    <>
      <Modal
        show={show}
        closeModal={closeModal}
        modalType={ModalType.FullScreen}
      >
        <EnterCode
          onAuthCode={onAuthCode}
          mode="verify"
          verifyError={authCodeError}
          verifySuccess={success}
          verifyLoading={loading}
        />
      </Modal>
      <StatusModal
        show={showStatusModal}
        status={requestStatus}
        closeModal={() => {
          setShowStatusModal(false)
          reset()
        }}
      >
        {statusMessage
          ? statusMessage
          : requestStatus === RequestStatus.FAILURE
          ? "Sorry, something went wrong with your request."
          : "Your request was been processed successfully."}
      </StatusModal>
    </>
  )
}
