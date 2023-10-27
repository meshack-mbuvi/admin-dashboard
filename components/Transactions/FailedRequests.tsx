import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import Loading from "@/components/Loading"
import EmptyState from "@/components/Shared/Empty"
import ResourceID from "@/components/Shared/ResourceID"
import Table from "@/components/Table/Table"
import TablePagination from "@/components/Table/TablePagination"
import TableTimeStampCell from "@/components/Table/TableTimeStampCell"
import Text from "@/components/Text"
import useGetRequests, { RequestsDataType } from "@/hooks/useGetRequests"
import TransactionRequestModal from "./TransactionRequestModal"
import FunctionSignature from "./atoms/FunctionSignature"
import getFirstOrString from "@/utils/getFirstOrString"

const columnHelper = createColumnHelper<RequestsDataType>()

interface FailedRequestsProps {
  searchTerm: string
}

export default function FailedRequests(props: FailedRequestsProps) {
  const { searchTerm } = props
  const [page, setPage] = useState<number>(0)
  const [limit] = useState<number>(20)

  const [showModal, setShowModal] = useState(false)
  const [selectedRequest, setSelectedRequest] =
    useState<RequestsDataType | null>(null)

  const { projectId } = useParams()
  const projectIdString = getFirstOrString(projectId)

  const columns = [
    columnHelper.accessor("transactionId", {
      size: 300,
      header: () => "Request ID",
      cell: (info) => (
        <ResourceID
          id={info.getValue()}
          fullView={true}
          context="Request"
          className="text-white font-mono overflow-x-hidden text-ellipsis block"
        />
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
        <TableTimeStampCell
          id={info.row.original.transactionId}
          timeStamp={info.getValue()}
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
    projectId: projectIdString,
    page,
    limit,
    invalid: true,
    search: searchTerm,
  })

  const onPageChange = (page: number) => {
    setPage(page)
    refetch?.()
  }

  const debouncedFetch = useDebouncedCallback(() => {
    refetch?.()
  }, 300)

  useEffect(() => {
    debouncedFetch()
  }, [searchTerm, debouncedFetch])

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
          <TablePagination
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
        showModal={showModal}
        onCloseModal={() => setShowModal(false)}
        request={selectedRequest}
      />
    </div>
  )
}
