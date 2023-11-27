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
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-4 mb-1">Contract address</p>
          <Hex
            hexValue={metadata.tokenAddress}
            hexType={"address"}
            chainId={metadata.chainId}
            truncate={false}
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
      </div>

      <div className="flex flex-col md:flex-row flex-wrap justify-between gap-4 overflow-hidden">
        <div>
          <p className="text-xs text-gray-4 mb-1">Metadata ID</p>
          <p className="text-sm sm:text-base">{metadata.metadataId}</p>
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
