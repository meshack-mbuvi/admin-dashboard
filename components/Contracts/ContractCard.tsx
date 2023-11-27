import CopyToClipboard from "../CopyToClipboard"
import Section from "../Section"
import DateTimestamp from "../Shared/Datestamp"
import Hex from "../Shared/Hex"
import ResourceID from "../Shared/ResourceID"

import { IContract } from "@/hooks/useGetProjectById"

interface ContractCardProps {
  contract: IContract
}

export default function ContractCard(props: ContractCardProps) {
  const { contract } = props

  return (
    <Section className="py-2 px-4 w-full flex flex-col">
      <div className="flex items-center mb-4">
        <ResourceID id={contract.id} context="contract" className="mr-2" />
        <p>{contract.name}</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <div className=" overflow-hidden">
          <p className="text-xs text-gray-4 mb-1">Contract address</p>
          <Hex
            hexValue={contract.address}
            hexType={"address"}
            chainId={contract.chainId}
            truncate={false}
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

      <div>
        <p className="text-xs text-gray-4 mb-1">Allowed functions</p>
        {contract.functionSignatures.length ? (
          <div className="font-mono text-xs">
            {contract.functionSignatures.map((func, i) => (
              <div
                key={i}
                className="py-2 border-gray-6 border-b last:border-b-0"
              >
                {func.signature}
              </div>
            ))}
          </div>
        ) : (
          <p>No allowed functions</p>
        )}
      </div>
    </Section>
  )
}
