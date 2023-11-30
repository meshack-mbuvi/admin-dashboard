import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import DisclosureComponent from "../Shared/Disclosure"
import TxWalletCard from "./TxWalletCard"

import { Wallet } from "@/hooks/useGetProjectWallets"
import { NetworkId } from "@/utils/network"

interface NetworkWalletsProps {
  networkId: NetworkId
  wallets: Wallet[]
}

export default function NetworkWallets({
  networkId,
  wallets,
}: NetworkWalletsProps) {
  return (
    <div>
      <DisclosureComponent
        networkId={networkId}
        disclosureTitle=""
        itemCount={wallets.length}
        className="text-white"
      >
        <div className="flex flex-col gap-4">
          {wallets.map((wallet) => (
            <TxWalletCard key={wallet.walletId} wallet={wallet} />
          ))}
        </div>
      </DisclosureComponent>
    </div>
  )
}
