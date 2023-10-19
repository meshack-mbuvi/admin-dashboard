import { MouseEvent, useEffect, useState } from "react"
import { PlacesType, Tooltip } from "react-tooltip"

import Clipboard from "@/components/icons/Clipboard"

export interface CopyToClipboardProps {
  text: string
  children?: React.ReactNode
  className?: string
  tooltipCopyText?: string
  tooltipCopiedText?: string
  tooltipPosition?: PlacesType
  copyId?: string
}

export default function CopyToClipboard(props: CopyToClipboardProps) {
  const {
    text,
    children,
    className,
    tooltipCopyText,
    tooltipCopiedText,
    tooltipPosition,
    copyId = text.substring(0, 6), // default to first 6 characters of text
  } = props

  const [copied, setCopied] = useState<boolean>(false)

  const copyContent = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch (err) {
      console.error("Failed to copy: ", err)
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
    <span className={className}>
      <button
        className="relative flex align-center py-1 w-full"
        onClick={copyContent}
      >
        <span
          data-tooltip-id={"copy-" + copyId}
          data-tooltip-content={
            copied ? tooltipCopiedText || "Copied" : tooltipCopyText
          }
          data-tooltip-place={tooltipPosition || "top"}
          className="w-full"
        >
          {children ? children : <Clipboard className="cursor-pointer w-4" />}
        </span>
      </button>
      <Tooltip id={"copy-" + copyId} />
    </span>
  )
}
