import Link from "next/link"
import { useMemo } from "react"

import CopyComponent from "@/components/CopyToClipboard"
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

  return (
    <div className="flex space-x-5 group">
      <span
        className={`focus:outline-none text-base leading-5.5 text-white cursor-pointer font-mono`}
      >
        <Link
          href={{
            pathname: `${
              getNetwork(chainId).blockExplorers?.default.url
            }/${hexType}/${hexValue}`,
          }}
          target="_blank"
        >
          <span className="text-gray-3">{formattedHexValue?.slice(0, 2)}</span>
          {formattedHexValue?.slice(2)}
        </Link>
      </span>
      <CopyComponent
        text={hexValue}
        className="ml-4 invisible group-hover:visible"
      />
    </div>
  )
}
export default Hex
