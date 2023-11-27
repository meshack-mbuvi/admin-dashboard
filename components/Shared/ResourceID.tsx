import clsx from "clsx"

import CopyToClipboard from "@/components/CopyToClipboard"
import Clipboard from "@/components/icons/Clipboard"
import IdIcon from "@/components/icons/ID"
import { formatAddress } from "@/utils/formatAddress"

export default function ResourceID(props: {
  id: string
  className?: string
  fullView?: boolean // allow displaying either the placeholder icon or the full ID
  copyIcon?: boolean
  context: string
  truncate?: boolean
}) {
  const {
    id,
    className,
    fullView,
    copyIcon,
    context = "project",
    truncate,
  } = props

  const tooltipCopyText = fullView ? "Click to copy ID" : "Click to copy"
  const tooltipCopiedText = fullView ? "ID Copied" : `Copied ${context} ID`

  return (
    <span className={clsx(className, copyIcon && "flex space-x-4 group")}>
      {copyIcon && fullView && (
        <span className="overflow-x-hidden text-ellipsis">
          {truncate ? formatAddress(id, 4, 4) : id}
        </span>
      )}
      <CopyToClipboard
        text={id}
        copyId={id}
        tooltipCopyText={tooltipCopyText}
        tooltipCopiedText={tooltipCopiedText}
      >
        {copyIcon && fullView ? (
          <Clipboard className="cursor-pointer w-4 invisible group-hover:visible" />
        ) : fullView ? (
          <span className="overflow-x-hidden text-ellipsis block text-left">
            {truncate ? formatAddress(id, 4, 4) : id}
          </span>
        ) : (
          <IdIcon className="cursor-pointer w-5" />
        )}
      </CopyToClipboard>
    </span>
  )
}
