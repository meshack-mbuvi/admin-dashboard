import { Tooltip } from "react-tooltip"
import { useMemo } from "react"
import { cn } from "@/utils/cn"

import Check from "@/components/icons/Check"
import DoubleCheck from "@/components/icons/DoubleCheck"
import Operating from "@/components/icons/Operating"
import WarningOctagon from "@/components/icons/WarningOctagon"
import TripleCheck from "@/components/icons/TripleCheck"

export enum StatusEnum {
  "InProgress" = "InProgress",
  "Processed" = "Processed",
  "Succeeded" = "Succeeded",
  "Failed" = "Failed",
  "Finalized" = "Finalized",
}

export enum RawStatusEnum {
  "PENDING" = "PENDING",
  "SUBMITTED" = "SUBMITTED",
  "PROCESSED" = "PROCESSED",
  "CONFIRMED" = "CONFIRMED",
}

export function getRawStatusFromStatus(status: StatusEnum) {
  if (status === StatusEnum.Failed) {
    return null
  } else if (status === StatusEnum.InProgress) {
    return RawStatusEnum.PENDING
  } else if (status === StatusEnum.Processed) {
    return RawStatusEnum.PROCESSED
  } else if (status === StatusEnum.Succeeded) {
    return RawStatusEnum.SUBMITTED
  } else if (status === StatusEnum.Finalized) {
    return RawStatusEnum.CONFIRMED
  }
}

export function getStatusLabel(status: StatusEnum) {
  switch (status) {
    case StatusEnum.Failed:
      return "Reverted"
    case StatusEnum.InProgress:
      return "Pending"
    case StatusEnum.Processed:
      return "Processed"
    case StatusEnum.Succeeded:
      return "Submitted"
    case StatusEnum.Finalized:
      return "Confirmed"
  }
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
  InProgress: {
    icon: <Operating className="h-[1.125rem] w-[1.125rem]" />,
    info: "In Progress",
    styleClasses:
      "text-blue-secondary border-blue-secondary/[.12] bg-blue-secondary/[.12]",
  },
  Processed: {
    icon: <Check className="w-3.5" />,
    info: "Processed",
    styleClasses:
      "text-blue-secondary border-blue-secondary/[.12] bg-blue-secondary/[.12]",
  },
  Succeeded: {
    icon: <DoubleCheck className="w-3.5" />,
    info: "Succeeded",
    styleClasses: "text-teal border-teal/[.12] bg-teal/[.12]",
  },
  Failed: {
    icon: <WarningOctagon className="h-3.5 w-3.5" />,
    info: "Failed",
    styleClasses: "text-red border-red/[.12] bg-red/[.12]",
  },
  Finalized: {
    icon: <TripleCheck className="w-3.5" />,
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
        return StatusEnum.InProgress
      case RawStatusEnum.PROCESSED:
        return StatusEnum.Processed
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
          className={cn(
            "h-[1.625rem] w-10  rounded-[1.875rem] px-[0.625rem]",
            "py-[0.125rem] flex justify-center items-center border text-xs",
            StatusObject[status].styleClasses
          )}
          data-tooltip-id={`statusTooltip-${transactionId}`}
          data-tooltip-content={StatusObject[status].info}
          data-tooltip-place="bottom"
        >
          <Tooltip id={`statusTooltip-${transactionId}`} />
          {StatusObject[status].icon}
        </div>
      )}
    </>
  )
}

export default TransactionStatus
