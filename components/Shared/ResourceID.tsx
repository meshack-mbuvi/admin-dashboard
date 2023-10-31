import clsx from "clsx"

import IdIcon from "@/components/icons/ID"
import Clipboard from "@/components/icons/Clipboard"
import CopyToClipboard from "@/components/CopyToClipboard"

export default function ResourceID(props: {
  id: string
  className?: string
  fullView?: boolean // allow displaying either the placeholder icon or the full ID
  copyIcon?: boolean
  context: string
}) {
  const { id, className, fullView, copyIcon, context = "project" } = props

  const tooltipCopyText = fullView ? "Click to copy ID" : `Click to copy ${id}`
  const tooltipCopiedText = fullView
    ? "ID Copied"
    : `Copied ${context} ID ${id}`

  return (
    <span className={clsx(className, copyIcon && "flex space-x-4 group")}>
      {copyIcon && fullView && (
        <span className="overflow-x-hidden text-ellipsis">{id}</span>
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
            {id}
          </span>
        ) : (
          <IdIcon className="cursor-pointer w-5" />
        )}
      </CopyToClipboard>
    </span>
  )
}
