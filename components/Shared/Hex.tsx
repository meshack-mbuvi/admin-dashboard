import { cn } from "@/utils/cn"
import Link from "next/link"
import { useMemo } from "react"

import CopyToClipboard from "@/components/CopyToClipboard"
import { centerTruncate } from "@/utils/centerTruncate"
import { getNetwork, NetworkId } from "@/utils/network"

interface HexProps {
  hexType: "address" | "tx"
  hexValue: string
  chainId: NetworkId
  truncate?: boolean
  className?: string
  disabled?: boolean
}

interface MaybeLinkProps {
  children: React.ReactNode
  isLink: boolean
  href: string
  disabled?: boolean
}
const disabledColor = "text-gray-5"

export default function Hex(props: HexProps) {
  const {
    hexType,
    hexValue,
    chainId,
    disabled,
    className,
    truncate = true,
  } = props

  const networkConfig = getNetwork(chainId)

  const formattedHexValue = useMemo(() => {
    if (!hexValue) return
    if (!truncate) return hexValue

    if (hexType === "address") {
      return centerTruncate(hexValue, 6, 4)
    }
    if (hexType === "tx") {
      return `${hexValue.slice(0, 13)}…`
    }
  }, [hexValue, hexType, truncate])

  const linkAddress = `${networkConfig?.blockExplorers?.default.url}/${hexType}/${hexValue}`

  return (
    <div className="flex space-x-5 group">
      <span
        className={cn(
          "flex focus:outline-none text-base leading-5.5 group text-white hover:text-blue-1 cursor-pointer font-mono",
          className
        )}
      >
        <MaybeLink
          href={linkAddress}
          isLink={Boolean(networkConfig)}
          disabled={disabled}
        >
          <span
            className={cn(
              "group-hover/link:text-blue-1",
              disabled ? disabledColor : "text-gray-3"
            )}
          >
            {formattedHexValue?.slice(0, 2)}
          </span>
          {formattedHexValue?.slice(2)}
        </MaybeLink>
        <CopyToClipboard
          text={hexValue}
          className="ml-2 invisible group-hover:visible flex"
        />
      </span>
    </div>
  )
}

function MaybeLink(props: MaybeLinkProps) {
  const { children, isLink, href, disabled } = props
  if (!isLink) {
    return (
      <span
        className={cn(
          "cursor-default group/link",
          disabled ? disabledColor : "text-white"
        )}
      >
        {children}
      </span>
    )
  }

  return (
    <Link
      className={cn(
        "hover:text-blue-1 group/link",
        disabled ? disabledColor : "text-white"
      )}
      href={{
        pathname: href,
      }}
      target="_blank"
    >
      {children}
    </Link>
  )
}
