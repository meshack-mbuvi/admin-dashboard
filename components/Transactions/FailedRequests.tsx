import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useParams } from "next/navigation"
import { useState } from "react"

import Loading from "@/components/Loading"
import Table from "@/components/Shared/Table"
import EmptyState from "@/components/Shared/Empty"
import TransactionPagination from "@/components/Transactions/atoms/Pagination"
import TransactionTimeStamp from "@/components/Transactions/atoms/TimeStamp"
import Text from "@/components/Text"
import ResourceID from "@/components/Shared/ResourceID"

import useGetRequests, { RequestsDataType } from "@/hooks/useGetRequests"
import TransactionRequestModal from "./TransactionRequestModal"
import FunctionSignature from "./atoms/FunctionSignature"

const columnHelper = createColumnHelper<RequestsDataType>()

export default function FailedRequests() {
  const [page, setPage] = useState<number>(0)
  const [limit] = useState<number>(20)

  const [showModal, setShowModal] = useState(false)
  const [selectedRequest, setSelectedRequest] =
    useState<RequestsDataType | null>(null)

  const { projectId } = useParams()

  const columns = [
    columnHelper.accessor("transactionId", {
      size: 300,
      header: () => "Request ID",
      cell: (info) => (
        <span className="text-white font-mono">
          <ResourceID ID={info.getValue()} fullView={true} />
        </span>
      ),
    }),
    columnHelper.accessor("functionSignature", {
      header: () => "Function",
      cell: (info) => (
        <FunctionSignature
          requestId={info.row.original.transactionId}
          functionSignature={info.getValue()}
        />
      ),
    }),
    columnHelper.accessor("data", {
      header: () => "Request Details",
      cell: (info) => (
        <span className="text-gray-4">
          <button
            className="text-blue-1"
            onClick={() => {
              setSelectedRequest(info.row.original)
              setShowModal(true)
            }}
          >
            view
          </button>
        </span>
      ),
    }),
    columnHelper.accessor("chainId", {
      header: () => <span>Chain ID</span>,
      cell: (info) => <Text className="text-gray-3">{info.getValue()}</Text>,
    }),
    columnHelper.accessor("updatedAt", {
      header: () => <span>Request Age</span>,
      cell: (info) => (
        <TransactionTimeStamp
          timeStamp={info.getValue()}
          transactionId={info.row.original.transactionId}
        />
      ),
    }),
  ]

  const {
    isLoading,
    isFetching,
    data: requestsResp,
    refetch,
    isPreviousData,
  } = useGetRequests({
    projectId,
    page,
    limit,
    invalid: true,
  })

  const onPageChange = (page: number) => {
    setPage(page)
    refetch?.()
  }

  const table = useReactTable({
    data: requestsResp?.transactionRequests || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div>
      {isLoading ? (
        [...Array(6)].map((_, i) => (
          <div className="flex gap-5 py-4" key={i}>
            <Loading className="w-1/5 h-4" />
            <Loading className="w-1/5 h-4" />
            <Loading className="w-1/5 h-4" />
            <Loading className="w-1/5 h-4" />
            <Loading className="w-1/5 h-4" />
          </div>
        ))
      ) : !isLoading && requestsResp?.total ? (
        <div className="flex flex-col items-center">
          <Table tableConfig={table} />
          <TransactionPagination
            page={page}
            limit={limit}
            total={requestsResp.total}
            onPageChange={onPageChange}
            isLoading={isFetching || isPreviousData}
          />
        </div>
      ) : (
        <EmptyState heading="No failed requests" description={""} />
      )}

      <TransactionRequestModal
        show={showModal}
        closeModal={() => setShowModal(false)}
        chainId={selectedRequest?.chainId || 0}
        contractAddress={selectedRequest?.contractAddress || ""}
        functionSignature={selectedRequest?.functionSignature || ""}
        calldata={selectedRequest?.data || ""}
        value={selectedRequest?.value || ""}
      />
    </div>
  )
}
