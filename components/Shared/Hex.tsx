import Link from "next/link"
import { useMemo } from "react"
import clsx from "clsx"

import CopyToClipboard from "@/components/CopyToClipboard"
import { formatAddress } from "@/utils/formatAddress"
import { getNetwork, NetworkId } from "@/utils/getNetwork"

interface HexProps {
  hexType: "address" | "tx"
  hexValue: string
  chainId: NetworkId
  truncate?: boolean
  className?: string
}

const Hex = (props: HexProps) => {
  const { hexType, hexValue, chainId, truncate = true, className } = props

  const formattedHexValue = useMemo(() => {
    if (!hexValue) return
    if (!truncate) return hexValue

    if (hexType === "address") {
      return formatAddress(hexValue, 6, 4)
    }
    if (hexType === "tx") {
      return `${hexValue.slice(0, 13)}...`
    }
  }, [hexValue, hexType, truncate])

  const linkAddress = `${
    getNetwork(chainId).blockExplorers?.default.url
  }/${hexType}/${hexValue}`

  return (
    <div className="flex space-x-5 group">
      <span
        className={clsx(
          "flex focus:outline-none text-base leading-5.5 group text-white hover:text-blue-1 cursor-pointer font-mono",
          className
        )}
      >
        <Link
          className="hover:text-blue-1 text-white group/link"
          href={{
            pathname: linkAddress,
          }}
          target="_blank"
        >
          <span className="text-gray-3 group-hover/link:text-blue-1">
            {formattedHexValue?.slice(0, 2)}
          </span>
          {formattedHexValue?.slice(2)}
        </Link>
        <CopyToClipboard
          text={hexValue}
          className="ml-4 invisible group-hover:visible"
        />
      </span>
    </div>
  )
}
export default Hex
