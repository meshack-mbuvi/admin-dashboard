import { Tooltip } from "react-tooltip"
import { useMemo } from "react"
import clsx from "clsx"

import Check from "@/components/icons/Check"
import DoubleCheck from "@/components/icons/DoubleCheck"
import Operating from "@/components/icons/Operating"
import WarningOctagon from "@/components/icons/WarningOctagon"

export enum StatusEnum {
  "InProgress" = "InProgress",
  "Succeeded" = "Succeeded",
  "Failed" = "Failed",
  "Finalized" = "Finalized",
}

export enum RawStatusEnum {
  "PENDING" = "PENDING",
  "SUBMITTED" = "SUBMITTED",
  "CONFIRMED" = "CONFIRMED",
}

interface StatusObjStyles {
  [key: string]: {
    icon: JSX.Element
    info: string
    styleClasses: string
  }
}

interface StatusProps {
  reverted: boolean
  transactionStatus: RawStatusEnum
  transactionId: string
}

export const StatusObject: StatusObjStyles = {
  "In Progress": {
    icon: <Operating className="h-[1.125rem] w-[1.125rem]" />,
    info: "In Progress",
    styleClasses:
      "text-ultraviolet border-ultraviolet/[.12] bg-ultraviolet/[.12]",
  },
  Succeeded: {
    icon: <Check className="h-3.5 w-3.5" />,
    info: "Succeeded",
    styleClasses: "text-teal border-teal/[.12] bg-teal/[.12]",
  },
  Failed: {
    icon: <WarningOctagon className="h-3.5 w-3.5" />,
    info: "Failed",
    styleClasses: "text-red border-red/[.12] bg-red/[.12]",
  },
  Finalized: {
    icon: <DoubleCheck className="h-[1.167rem] w-3.5" />,
    info: "Finalized",
    styleClasses: "text-success border-success/[.12] bg-success/[.12]",
  },
}

const TransactionStatus = (props: StatusProps) => {
  const { transactionStatus, transactionId, reverted } = props

  const status: StatusEnum = useMemo(() => {
    if (reverted) return StatusEnum[StatusEnum.Failed]

    switch (transactionStatus) {
      case RawStatusEnum.PENDING:
        return StatusEnum["InProgress"]
      case RawStatusEnum.SUBMITTED:
        return StatusEnum.Succeeded
      case RawStatusEnum.CONFIRMED:
        return StatusEnum.Finalized
    }
  }, [transactionStatus, reverted])

  return (
    <>
      {status && (
        <div
          className={clsx(
            "h-[1.625rem] w-10  rounded-[1.875rem] px-[0.625rem]",
            "py-[0.125rem] flex justify-center items-center border",
            StatusObject[status].styleClasses
          )}
          data-tooltip-id={`statusTooltip-${transactionId}`}
          data-tooltip-content={StatusObject[status].info}
          data-tooltip-place="bottom"
        >
          <Tooltip id={`statusTooltip-${transactionId}`} className="" />
          {StatusObject[status].icon}
        </div>
      )}
    </>
  )
}

export default TransactionStatus
