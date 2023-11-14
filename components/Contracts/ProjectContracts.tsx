import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

import ContractFunctionsModal from "@/components/Contracts/ContractFunctionsModal"
import CopyToClipboard from "@/components/CopyToClipboard"
import Hex from "@/components/Shared/Hex"
import ResourceID from "@/components/Shared/ResourceID"
import Table from "@/components/Table/Table"
import { IContract } from "@/hooks/useGetProjectById"
import { NetworkId } from "@/utils/network"
import DateTimestamp from "../Shared/Datestamp"
import DisclosureComponent from "../Shared/Disclosure"

interface ProjectNetworkProps {
  networkId: NetworkId
  contracts: IContract[]
}

const columnHelper = createColumnHelper<IContract>()

export default function ProjectContracts({
  networkId,
  contracts,
}: ProjectNetworkProps) {
  const [showModal, setShowModal] = useState(false)
  const [selectedContract, setSelectedContract] = useState<IContract | null>(
    null
  )

  const columns = [
    columnHelper.accessor("name", {
      header: () => <span className="pl-7">Name</span>,
      cell: (info) =>
        info.getValue() ? (
          <div className="text-white pl-7">{info.getValue()}</div>
        ) : (
          <span className="text-gray-3 pl-7">--</span>
        ),
    }),
    columnHelper.accessor("id", {
      size: 64,
      header: () => "",
      cell: (info) => <ResourceID id={info.getValue()} context="contract" />,
    }),
    columnHelper.accessor("chainId", {
      header: () => <span className="pl-7">Chain Id</span>,
      cell: (info) =>
        info.getValue() ? (
          <div className="text-white flex pl-7 group">
            {info.getValue()}
            <CopyToClipboard
              text={`${info.getValue()}`}
              className="ml-4 invisible group-hover:visible"
            />
          </div>
        ) : (
          <span className="text-gray-3 pl-7">--</span>
        ),
    }),
    columnHelper.accessor("address", {
      size: 480,
      header: () => <span>Contract Address</span>,
      cell: (info) => (
        <Hex
          hexValue={info.getValue()}
          hexType={"address"}
          chainId={info.row.original.chainId}
          truncate={false}
        />
      ),
    }),
    columnHelper.accessor("functionSignatures", {
      header: () => <span>Allowed Functions</span>,
      cell: (info) => (
        <span className="text-gray-4">
          {info.getValue().length ? (
            <button
              className="text-blue-1"
              onClick={() => {
                setSelectedContract(info.row.original)
                setShowModal(true)
              }}
            >
              view
            </button>
          ) : (
            "No Functions"
          )}
        </span>
      ),
    }),

    columnHelper.accessor("createdAt", {
      header: () => <span>Date Added</span>,
      cell: (info) => <DateTimestamp date={info.getValue()} showTime={true} />,
    }),
  ]

  const table = useReactTable({
    data: contracts || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="">
      <DisclosureComponent
        networkId={networkId}
        disclosureTitle=""
        itemCount={contracts.length}
        defaultOpen={true}
      >
        <Table tableConfig={table} />
      </DisclosureComponent>

      <ContractFunctionsModal
        show={showModal}
        closeModal={() => setShowModal(false)}
        contractAddress={selectedContract?.address || ""}
        contractName={selectedContract?.name || ""}
        allowedFunctions={selectedContract?.functionSignatures || []}
      />
    </div>
  )
}
