import Link from "next/link"

import Section from "../Section"
import Hex from "../Shared/Hex"

import { TokenMetadata } from "@/hooks/useGetTokenMetadata"
import TableTimeStampCell from "../Table/TableTimeStampCell"

interface MetadataCardProps {
  metadata: TokenMetadata
}

export default function MetadataCard(props: MetadataCardProps) {
  const { metadata } = props

  return (
    <Section className="py-2 px-4 w-full flex flex-col">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <p className="text-xs text-gray-4 mb-1">Contract address</p>
          <Hex
            hexValue={metadata.tokenAddress}
            hexType={"address"}
            chainId={metadata.chainId}
            truncate
            className="text-sm sm:text-base"
          />
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">Token ID</p>
          <p className="text-sm sm:text-base">{metadata.tokenId}</p>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">Chain ID</p>
          <p className="text-sm sm:text-base">{metadata.chainId}</p>
        </div>

        <div className="overflow-hidden">
          <p className="text-xs text-gray-4 mb-1">Metadata ID</p>
          <Link
            href={`https://ipfs.io/ipfs/${metadata.metadataId}`}
            target="_blank"
            className="text-sm sm:text-base text-blue-1"
          >
            {metadata.metadataId}
          </Link>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1 md:text-right">Updated at</p>
          <TableTimeStampCell
            id={`${metadata.tokenId}-${metadata.metadataId}`}
            timeStamp={metadata.updatedAt}
            className="text-sm sm:text-base"
          />
        </div>
      </div>
    </Section>
  )
}
