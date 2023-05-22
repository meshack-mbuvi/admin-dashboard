import { useEffect, useState } from "react"
import { Tooltip } from "react-tooltip"
import { CopyLinkIcon } from "../icons/copy"

export default function CopyComponent(props: {
  text: string
  className?: string
}) {
  const { text, className } = props

  const [copied, setCopied] = useState(false)

  const copyContent = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
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
      <button className="relative flex align-center py-1" onClick={copyContent}>
        <span
          data-tooltip-id="copy"
          data-tooltip-content={copied ? "Copied" : ""}
          data-tooltip-place="top"
        >
          <CopyLinkIcon className="cursor-pointer w-4" />
        </span>
      </button>
      <Tooltip id="copy" />
    </span>
  )
}