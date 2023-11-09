import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Tooltip } from "react-tooltip"

import ResourceID from "@/components/Shared/ResourceID"
import Table from "@/components/Table/Table"
import { Wallet } from "@/hooks/useGetProjectWallets"
import Label from "../Label"
import DateTimestamp from "../Shared/Datestamp"
import DisclosureComponent from "../Shared/Disclosure"
import Hex from "../Shared/Hex"
import Warning from "@/components/icons/Warning"

import { NetworkId } from "@/utils/network"
import { isBalanceLow } from "@/utils/isBalanceLow"

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
      size: 510,
      header: () => (
        <Label className="text-gray-3 pl-7 text-sm">Wallet Address</Label>
      ),
      cell: (info) =>
        info.getValue() ? (
          <div className="text-white m-0 pl-7 flex items-center">
            {isBalanceLow(info.row.original.balance, 18) && (
              <div
                className="mr-2"
                data-tooltip-id="t-low-bal"
                data-tooltip-content="Wallet has low balance"
                data-tooltip-place="top"
              >
                <Warning className="text-warning w-4" />
                <Tooltip
                  id="t-low-bal"
                  className="drop-shadow-2xl opacity-100"
                  style={{
                    padding: "8px",
                  }}
                />
              </div>
            )}
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
      cell: (info) => <DateTimestamp date={info.getValue()} showTime={true} />,
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
        disclosureTitle=""
        itemCount={wallets.length}
        className="text-white"
      >
        <Table tableConfig={table} />
      </DisclosureComponent>
    </div>
  )
}
