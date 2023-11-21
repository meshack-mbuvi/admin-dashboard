import { useParams } from "next/navigation"

import useGetProjectWallets, { Wallet } from "@/hooks/useGetProjectWallets"
import getFirstOrString from "@/utils/getFirstOrString"
import { NetworkId } from "@/utils/network"
import NetworkWallets from "./NetworkWallets"
import { WalletSection } from "./WalletSection"

export function TransactionWallets() {
  const { projectId } = useParams()
  const { data: wallets, isLoading } = useGetProjectWallets({
    projectId: getFirstOrString(projectId),
    withOnchainData: true,
  })

  const networkWallets = wallets?.reduce((acc, wallet) => {
    if (!acc[wallet.chainId]) {
      acc[wallet.chainId] = []
    }
    acc[wallet.chainId].push(wallet as Wallet)
    return acc
  }, {} as { [key: number]: Wallet[] })

  return (
    <WalletSection
      title="Secure Transaction Wallets"
      description="These wallets will be used to perform programmatic actions on your contract. Please add them as an allowed operator."
      helperLink="https://docs.syndicate.io/features/transaction-broadcasting"
      helperText="View Guide"
      isLoading={isLoading}
    >
      {networkWallets && (
        <div>
          {Object.keys(networkWallets).map((key, index) => {
            const chainId = +key as NetworkId
            return (
              <NetworkWallets
                key={index}
                networkId={chainId}
                wallets={networkWallets[chainId]}
              />
            )
          })}
        </div>
      )}
    </WalletSection>
  )
}
