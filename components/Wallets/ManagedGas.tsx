import { useParams } from "next/navigation";
import { formatUnits } from "viem";

import useGetProjectGasFunded from "@/hooks/useGetProjectGasFunded";
import getFirstOrString from "@/utils/getFirstOrString";
import { WalletSection } from "./WalletSection";
import { useNetworkInfo } from "@/hooks/useNetworkInfo";
import EmptyState from "../Shared/Empty";
import useFreePlan from "@/hooks/useFreePlan";
import { useUpgradeModalStore } from "@/store/useUpgradeModalStore";

export function ManagedGas() {
  const { projectId } = useParams()
  const isFreePlan = useFreePlan()
  const { data, isLoading } = useGetProjectGasFunded({ projectId: getFirstOrString(projectId) })
  const hasFundingHistory = data && data.length > 0
  const { toggle } = useUpgradeModalStore()
  return <WalletSection
    title="Managed Gas"
    description="This is the total amount of gas that has been automatically funded to this project's wallets to perform transactions since inception. Data may differ from final billing amount."
    // @note This may need to be updated when this guide is published
    helperLink="https://docs.syndicate.io/guides/managed-gas"
    helperText="Learn More"      
    isLoading={isLoading}
  >
    {hasFundingHistory && <div className="flex flex-col pt-6">
      <div className="py-6 pl-7">
        <div className="flex justify-between text-base-medium text-gray-3">
          <div>Network</div>
          <div>Total Gas Funded</div>
        </div>
        <div className="mt-3">
          {data.map(({chainId, amount}) => <GasItem 
            amount={amount} 
            chainId={chainId} 
            key={`funding-${chainId}`}
          />)}
        </div>
      </div>
    </div>}
    {!hasFundingHistory && <EmptyState heading={isFreePlan ? <div>
      Tired of manually managing and worrying about insufficient gas for transactions? <button onClick={() => toggle(true)} className="underline">Get in touch</button>
    </div> : "No gas funded yet"}/>}
  </WalletSection>
}

interface GasItemProps {
  chainId: number;
  amount: string;
}

function GasItem(props: GasItemProps) {
  const { chainId, amount } = props
  const { networkIcon, network } = useNetworkInfo(chainId)
  const currency = network?.nativeCurrency
  const name = network?.name.replace(" ", " - ")

  return <div className="flex justify-between">
    <div className="flex items-center space-x-2.5">
      <span>{networkIcon}</span>
      <span>{name ? name : chainId}</span>
    </div>
    <div className="flex items-center">
      {currency ? `${formatUnits(BigInt(amount), currency.decimals)} ${currency.symbol}` : amount}
    </div>
  </div>
}
