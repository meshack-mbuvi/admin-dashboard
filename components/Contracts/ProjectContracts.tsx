import { Disclosure } from "@headlessui/react"
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import format from "date-fns/format"
import { useMemo, useState } from "react"

import ContractFunctionsModal from "@/components/Contracts/ContractFunctionsModal"
import Hex from "@/components/Shared/Hex"
import Table from "@/components/Shared/Table"
import ChevronDown from "@/components/icons/ChevronDown"
import ChevronRight from "@/components/icons/ChevronRight"
import Remove from "@/components/icons/Remove"
import { IContract } from "@/hooks/useGetProjectById"
import { NetworkId, getNetwork } from "@/utils/getNetwork"
import { getNetworkIcon } from "@/utils/getNetworkIcon"

interface ProjectNetworkProps {
  networkId: NetworkId
  contracts: IContract[]
  handleDeleteContract: (contractId: string) => void
}

const columnHelper = createColumnHelper<IContract>()

export default function ProjectContracts({
  networkId,
  contracts,
  handleDeleteContract,
}: ProjectNetworkProps) {
  const [showModal, setShowModal] = useState(false)
  const [selectedContract, setSelectedContract] = useState<IContract | null>(
    null
  )

  const NetworkInfo = useMemo(() => {
    const network = getNetwork(networkId)
    const networkIcon = getNetworkIcon(networkId, "w-5 h-5")
    return { networkIcon, network }
  }, [networkId])

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
    columnHelper.accessor("address", {
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
    columnHelper.accessor("id", {
      header: () => <span></span>,
      cell: (info) => (
        <span className="text-white">
          <button
            className="flex items-center text-gray-4 space-x-2 h-10 hover:text-red"
            onClick={() => handleDeleteContract(info.getValue())}
          >
            <Remove className="h-4" />
            <span className="leading-5">Remove</span>
          </button>
        </span>
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
      <Disclosure as="div" className="pt-6">
        {({ open }) => (
          <>
            <dt>
              <Disclosure.Button className="flex items-center py-6 pl-7 hover:bg-gray-8  rounded-lg  space-x-2.5 h-full w-full cursor-pointer">
                {NetworkInfo.networkIcon}
                <div className="leading-5">
                  {NetworkInfo.network.name} ({contracts.length} contracts)
                </div>
                {open ? (
                  <ChevronDown className="w-4 h-auto" />
                ) : (
                  <ChevronRight className="w-4 h-auto" />
                )}
              </Disclosure.Button>
            </dt>
            <Disclosure.Panel as="dd" className={"mt-2 pr-12 pl-7"}>
              <Table tableConfig={table} />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
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
