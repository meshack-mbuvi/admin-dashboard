import Link from "next/link"

import CopyToClipboard from "@/components/CopyToClipboard"
import { getNetwork, NetworkId } from "@/utils/network"

interface BlockProps {
  viewType: "block" | "timeStamp"
  blockValue: number | null
  chainId: NetworkId
}

export default function Block(props: BlockProps) {
  const { viewType, blockValue, chainId } = props

  const networkConfig = getNetwork(chainId)

  return (
    <div>
      {!blockValue && <span className="text-gray-4 font-mono">…</span>}
      {!!(viewType === "block" && blockValue) && (
        <span className="hover:text-blue-1 text-gray-1 group flex cursor-pointer">
          {networkConfig ? (
            <Link
              href={{
                pathname: `${networkConfig.blockExplorers?.default.url}/block/${blockValue}`,
              }}
              target="_blank"
            >
              {blockValue}
            </Link>
          ) : (
            <span className="text-gray-1 cursor-default">{blockValue}</span>
          )}

          <CopyToClipboard
            text={blockValue.toString()}
            className="ml-2 invisible group-hover:visible flex"
          />
        </span>
      )}
    </div>
  )
}
