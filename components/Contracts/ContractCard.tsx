import { useState } from "react"
import { cn } from "@/utils/cn"

import CopyToClipboard from "../CopyToClipboard"
import Section from "../Section"
import DateTimestamp from "../Shared/Datestamp"
import Hex from "../Shared/Hex"
import ResourceID from "../Shared/ResourceID"
import { Contract } from "@/hooks/useCreateContract"


interface ContractCardProps {
  contract: Contract
}

export default function ContractCard(props: ContractCardProps) {
  const { contract } = props

  const [isViewMore, setIsViewMore] = useState(false)

  return (
    <Section className="p-4 w-full flex flex-col">
      <div className="flex flex-wrap gap-4 justify-between">
        <div>
          <p className="text-xs text-gray-4 mb-1">Name</p>
          <p>{contract.name}</p>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">ID</p>

          <ResourceID id={contract.id} context="contract" truncate fullView />
        </div>

        <div className="overflow-hidden">
          <p className="text-xs text-gray-4 mb-1">Contract address</p>
          <Hex
            hexValue={contract.address}
            hexType={"address"}
            chainId={contract.chainId}
            truncate
            className="text-sm sm:text-base"
          />
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">Chain ID</p>
          <div className="text-white flex group text-sm sm:text-base">
            {contract.chainId}
            <CopyToClipboard
              text={contract.chainId.toString()}
              className="invisible group-hover:visible ml-2"
            />
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">Date added</p>
          <p className="text-gray-1 text-sm sm:text-base">
            <DateTimestamp date={contract.createdAt} showTime={true} />
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs text-gray-4 mb-1.5">Allowed functions</p>
        {contract.functionSignatures.length ? (
          <div className="font-mono text-xs">
            {contract.functionSignatures.map((func, i) => {
              return (
                <div
                  key={i}
                  className={cn(
                    "pb-2 mb-2 border-gray-6 border-b last:border-b-0 last:mb-0 last:pb-0",
                    i > 2 && !isViewMore && "hidden"
                  )}
                >
                  {func.signature}
                </div>
              )
            })}
          </div>
        ) : (
          <p>No allowed functions</p>
        )}

        {contract.functionSignatures.length > 3 && (
          <button
            className="mt-2 text-blue-1 text-sm"
            onClick={() => setIsViewMore((prev) => !prev)}
          >
            View {isViewMore ? "less" : "more"}
          </button>
        )}
      </div>
    </Section>
  )
}
