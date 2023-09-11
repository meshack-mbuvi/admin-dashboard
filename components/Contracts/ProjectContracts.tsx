import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import format from "date-fns/format"
import { useState } from "react"

import ContractFunctionsModal from "@/components/Contracts/ContractFunctionsModal"
import Hex from "@/components/Shared/Hex"
import Table from "@/components/Shared/Table"
import ResourceID from "@/components/Shared/ResourceID"
import { IContract } from "@/hooks/useGetProjectById"
import { NetworkId } from "@/utils/getNetwork"
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
          <span className="text-white pl-7">{info.getValue()}</span>
        ) : (
          <span className="text-gray-3 pl-7">--</span>
        ),
    }),
    columnHelper.accessor("id", {
      size: 64,
      header: () => "",
      cell: (info) => <ResourceID ID={info.getValue()} />,
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
      cell: (info) => (
        <span> {format(new Date(info.getValue()), "MMMM do yyyy")}</span>
      ),
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
        disclosureTitle="contracts"
        itemCount={contracts.length}
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
