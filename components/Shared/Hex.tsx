import Link from "next/link"
import { useMemo } from "react"
import clsx from "clsx"

import CopyToClipboard from "@/components/CopyToClipboard"
import { formatAddress } from "@/utils/formatAddress"
import { getNetwork, NetworkId } from "@/utils/network"

interface HexProps {
  hexType: "address" | "tx"
  hexValue: string
  chainId: NetworkId
  truncate?: boolean
  className?: string
}

interface MaybeLinkProps {
  children: React.ReactNode
  isLink: boolean
  href: string
}

export default function Hex(props: HexProps) {
  const { hexType, hexValue, chainId, truncate = true, className } = props

  const networkConfig = getNetwork(chainId)

  const formattedHexValue = useMemo(() => {
    if (!hexValue) return
    if (!truncate) return hexValue

    if (hexType === "address") {
      return formatAddress(hexValue, 6, 4)
    }
    if (hexType === "tx") {
      return `${hexValue.slice(0, 13)}…`
    }
  }, [hexValue, hexType, truncate])

  const linkAddress = `${networkConfig?.blockExplorers?.default.url}/${hexType}/${hexValue}`

  return (
    <div className="flex space-x-5 group">
      <span
        className={clsx(
          "flex focus:outline-none text-base leading-5.5 group text-white hover:text-blue-1 cursor-pointer font-mono",
          className
        )}
      >
        <MaybeLink href={linkAddress} isLink={Boolean(networkConfig)}>
          <span className="text-gray-3 group-hover/link:text-blue-1">
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
  const { children, isLink, href } = props
  if (!isLink) {
    return (
      <span className="cursor-default text-white group/link">{children}</span>
    )
  }

  return (
    <Link
      className="hover:text-blue-1 text-white group/link"
      href={{
        pathname: href,
      }}
      target="_blank"
    >
      {children}
    </Link>
  )
}
