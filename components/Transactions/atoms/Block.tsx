import Link from "next/link"

import CopyComponent from "@/components/CopyToClipboard"
import { getNetwork, NetworkId } from "@/utils/getNetwork"

interface BlockProps {
  viewType: "block" | "timeStamp"
  blockValue: number | null
  chainId: NetworkId
}

const TransactionBlock = (props: BlockProps) => {
  const { viewType, blockValue, chainId } = props

  return (
    <div className="">
      {!blockValue && <span className="text-gray-6 font-mono">•••</span>}
      {!!(viewType === "block" && blockValue) && (
        <span className="text-blue-1 group flex cursor-pointer">
          <Link
            href={{
              pathname: `${
                getNetwork(chainId).blockExplorers?.default.url
              }/block/${blockValue}`,
            }}
            target="_blank"
          >
            {blockValue}
          </Link>

          <CopyComponent
            text={blockValue.toString()}
            className="ml-4 invisible group-hover:visible"
          />
        </span>
      )}
    </div>
  )
}

export default TransactionBlock