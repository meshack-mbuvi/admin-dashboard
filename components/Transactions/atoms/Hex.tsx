import Link from "next/link"
import { useMemo } from "react"

import CopyToClipboard from "@/components/CopyToClipboard"
import { formatAddress } from "@/utils/formatAddress"
import { getNetwork, NetworkId } from "@/utils/getNetwork"

interface HexProps {
  hexType: "address" | "tx"
  hexValue: string
  chainId: NetworkId
}

const Hex = (props: HexProps) => {
  const { hexType, hexValue, chainId } = props

  const formattedHexValue = useMemo(() => {
    if (!hexValue) return

    if (hexType === "address") {
      return formatAddress(hexValue, 6, 4)
    }
    if (hexType === "tx") {
      return `${hexValue.slice(0, 13)}...`
    }
  }, [hexValue, hexType])

  const linkAddress = `${
    getNetwork(chainId).blockExplorers?.default.url
  }/${hexType}/${hexValue}`

  return (
    <div className="flex space-x-5 group">
      <span className="flex focus:outline-none text-base leading-5.5 group text-white hover:text-blue-1 cursor-pointer font-mono">
        <Link
          className="hover:text-blue-1 text-gray-3"
          href={{
            pathname: linkAddress,
          }}
          target="_blank"
        >
          {formattedHexValue?.slice(0, 2)}
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
