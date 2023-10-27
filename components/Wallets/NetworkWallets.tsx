import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import Table from "@/components/Table/Table"
import { Wallet } from "@/hooks/useGetProjectWallets"
import { NetworkId } from "@/utils/network"
import format from "date-fns/format"
import Label from "../Label"
import DisclosureComponent from "../Shared/Disclosure"
import Hex from "../Shared/Hex"
import ResourceID from "@/components/Shared/ResourceID"

interface NetworkWalletsProps {
  networkId: NetworkId
  wallets: Wallet[]
}

const columnHelper = createColumnHelper<Wallet>()

export default function NetworkWallets({
  networkId,
  wallets,
}: NetworkWalletsProps) {
  const columns = [
    columnHelper.accessor("walletAddress", {
      size: 500,
      header: () => (
        <Label className="text-gray-3 pl-7 text-sm">Wallet Address</Label>
      ),
      cell: (info) =>
        info.getValue() ? (
          <div className="text-white m-0 pl-7">
            <Hex
              hexValue={info.getValue()}
              hexType={"address"}
              chainId={info.row.original.chainId as NetworkId}
              truncate={false}
            />
          </div>
        ) : (
          <span className="text-gray-3 pl-7">--</span>
        ),
    }),
    columnHelper.accessor("walletId", {
      maxSize: 64,
      header: () => "",
      cell: (info) => <ResourceID id={info.getValue()} context="wallet" />,
    }),
    columnHelper.accessor("txCount", {
      header: () => <Label className="text-gray-3 text-sm">Transactions</Label>,
      cell: (info) => <span>{info.getValue().toLocaleString()}</span>,
    }),
    columnHelper.accessor("createdAt", {
      header: () => <Label className="text-gray-3 text-sm">Date Added</Label>,
      cell: (info) => (
        <span> {format(new Date(info.getValue()), "yyyy-MM-dd")}</span>
      ),
    }),
  ]

  const table = useReactTable({
    data: wallets || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <DisclosureComponent
        networkId={networkId}
        disclosureTitle="wallets"
        itemCount={wallets.length}
        className="text-white"
      >
        <Table tableConfig={table} />
      </DisclosureComponent>
    </div>
  )
}
