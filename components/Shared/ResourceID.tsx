import clsx from "clsx"
import { MouseEvent, useEffect, useState } from "react"
import { Tooltip } from "react-tooltip"

import IdIcon from "@/components/icons/ID"
import Clipboard from "@/components/icons/Clipboard"

export default function ResourceID(props: {
  ID: string
  className?: string
  fullView?: boolean // allow displaying either the placeholder icon or the full ID
  copyIcon?: boolean
}) {
  const { ID, className, fullView, copyIcon = true } = props

  const [copied, setCopied] = useState<boolean>(false)

  const copyContent = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(ID)
      setCopied(true)
    } catch (err) {
      setCopied(false)
    }
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [copied])

  return (
    <span className={clsx(className, copyIcon && "flex space-x-4 group")}>
      {copyIcon && fullView && (
        <span className="overflow-x-hidden text-ellipsis">{ID}</span>
      )}
      <button className="relative flex align-center py-1" onClick={copyContent}>
        <span
          data-tooltip-id={"resource-" + ID}
          data-tooltip-content={copied ? "Copied" : ""}
          data-tooltip-place="top"
          className="h-5"
        >
          {copyIcon && fullView ? (
            <Clipboard className="cursor-pointer w-4 invisible group-hover:visible" />
          ) : fullView ? (
            <span className="overflow-x-hidden text-ellipsis">{ID}</span>
          ) : (
            <IdIcon className="cursor-pointer w-5" />
          )}
        </span>
      </button>
      <Tooltip id={"resource-" + ID} />
    </span>
  )
}
