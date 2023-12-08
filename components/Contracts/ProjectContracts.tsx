import ContractCard from "./ContractCard"
import DisclosureComponent from "../Shared/Disclosure"

import { NetworkId } from "@/utils/network"
import { Contract } from "@/hooks/useCreateContract"

interface ProjectNetworkProps {
  networkId: NetworkId
  contracts: Contract[]
}

export default function ProjectContracts({
  networkId,
  contracts,
}: ProjectNetworkProps) {
  return (
    <div>
      <DisclosureComponent
        networkId={networkId}
        disclosureTitle=""
        itemCount={contracts.length}
        defaultOpen={true}
      >
        <div className="flex flex-col gap-4">
          {contracts.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      </DisclosureComponent>
    </div>
  )
}
