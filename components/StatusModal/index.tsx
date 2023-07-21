import React from "react"
import Modal from "../Modal"
import { Spinner } from "../Spinner"
import FailureSvg from "../icons/failureIcon"
import SuccessCheckMark from "../icons/successCheckMark"

export enum RequestStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}
interface Props {
  show: boolean
  children: string
  status: RequestStatus
}

/**
 * This is a modal that shows different request states
 * @returns an html node in a form of a modal
 */
export const StatusModal: React.FC<Props> = (props) => {
  const { children, ...otherProps } = props

  const icon =
    props.status === RequestStatus.SUCCESS ? (
      <SuccessCheckMark />
    ) : props.status === RequestStatus.FAILURE ? (
      <FailureSvg />
    ) : (
      <Spinner />
    )

  return (
    <Modal {...otherProps}>
      <div className="flex flex-col justify-center m-auto mb-4">
        <div className="flex w-full justify-center m-auto my-8">{icon}</div>

        <div className="mb-4 font-medium text-center leading-8 text-gray-3">
          {children}
        </div>
      </div>
    </Modal>
  )
}

export default StatusModal
