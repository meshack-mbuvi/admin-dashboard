import clsx from "clsx"

import IdIcon from "@/components/icons/ID"
import Clipboard from "@/components/icons/Clipboard"
import CopyToClipboard from "@/components/CopyToClipboard"

export default function ResourceID(props: {
  ID: string
  className?: string
  fullView?: boolean // allow displaying either the placeholder icon or the full ID
  copyIcon?: boolean
}) {
  const { ID, className, fullView, copyIcon = true } = props

  return (
    <span className={clsx(className, copyIcon && "flex space-x-4 group")}>
      {copyIcon && fullView && (
        <span className="overflow-x-hidden text-ellipsis">{ID}</span>
      )}
      <CopyToClipboard text={ID} copyId={ID} tooltipCopiedText="ID Copied">
        {copyIcon && fullView ? (
          <Clipboard className="cursor-pointer w-4 invisible group-hover:visible" />
        ) : fullView ? (
          <span className="overflow-x-hidden text-ellipsis">{ID}</span>
        ) : (
          <IdIcon className="cursor-pointer w-5" />
        )}
      </CopyToClipboard>
    </span>
  )
}
