import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useParams } from "next/navigation"
import { useState } from "react"

import Loading from "@/components/Loading"
import Table from "@/components/Shared/Table"
import EmptyState from "@/components/Transactions/atoms/Empty"
import TransactionPagination from "@/components/Transactions/atoms/Pagination"
import TransactionTimeStamp from "@/components/Transactions/atoms/TimeStamp"

import useGetRequests, { RequestsDataType } from "@/hooks/useGetRequests"
import Text from "../Text"

const columnHelper = createColumnHelper<RequestsDataType>()

const columns = [
  columnHelper.accessor("transactionId", {
    header: () => "Request ID",
    cell: (info) => (
      <span className="text-white font-mono">{info.getValue()}</span>
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

export default function FailedRequests() {
  const [page, setPage] = useState<number>(0)
  const [limit] = useState<number>(20)

  const { projectId } = useParams()

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
    </div>
  )
}
