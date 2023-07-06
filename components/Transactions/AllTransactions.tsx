import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import Loading from "@/components/Loading"
import Table from "@/components/Shared/Table"
import TransactionBlock from "@/components/Transactions/atoms/Block"
import EmptyState from "@/components/Transactions/atoms/Empty"
import Hex from "@/components/Transactions/atoms/Hex"
import TransactionPagination from "@/components/Transactions/atoms/Pagination"
import TransactionStatus, {
  RawStatusEnum,
} from "@/components/Transactions/atoms/Status"
import TransactionTimeStamp from "@/components/Transactions/atoms/TimeStamp"
import CaretDown from "@/components/icons/CaretDown"
import useGetTransactions, {
  TransactionDataType,
} from "@/hooks/useGetTransactions"

const columnHelper = createColumnHelper<TransactionDataType>()

const columns = [
  columnHelper.accessor("transactionId", {
    header: () => <span className="font-normal">Transaction ID</span>,
    cell: (info) => (
      <span className="text-white flex items-center space-x-3 font-mono">
        <TransactionStatus
          transactionId={info.getValue()}
          transactionStatus={info.row.original.status}
          reverted={info.row.original.reverted}
        />
        <span>{info.getValue()}</span>
      </span>
    ),
  }),
  columnHelper.accessor((row) => row.hash, {
    id: "TX Hash",
    cell: (info) => (
      <Hex
        hexValue={info.getValue()}
        hexType={"tx"}
        chainId={info.row.original.chainId}
      />
    ),
    header: () => <span>TX Hash</span>,
  }),
  columnHelper.accessor("block", {
    header: () => (
      <span className="flex space-x-[5px] items-center">
        <span>Block </span>
        <span className="h-[5px] w-[11px]">
          <CaretDown />
        </span>
      </span>
    ),
    cell: (info) => (
      <TransactionBlock
        blockValue={info.getValue()}
        viewType={"block"}
        chainId={info.row.original.chainId}
      />
    ),
  }),
  columnHelper.accessor("blockTimestamp", {
    header: () => <span>Block Age</span>,
    cell: (info) => (
      <TransactionTimeStamp
        transactionId={info.row.original.transactionId}
        timeStamp={info.getValue()}
      />
    ),
  }),
  columnHelper.accessor("walletAddress", {
    header: "From",
    cell: (info) => (
      <Hex
        hexValue={info.getValue()}
        hexType={"address"}
        chainId={info.row.original.chainId}
      />
    ),
  }),
]

const AllTransactions = ({ searchTerm }: { searchTerm: string }) => {
  const [page, setPage] = useState<number>(0)
  const [limit] = useState<number>(20)

  const { projectId } = useParams()

  const {
    isLoading,
    isFetching,
    data: transactionsResp,
    refetch,
    isPreviousData,
  } = useGetTransactions({
    projectId,
    page,
    limit,
    search: searchTerm,
    statuses: [
      RawStatusEnum.PENDING,
      RawStatusEnum.SUBMITTED,
      RawStatusEnum.CONFIRMED,
    ],
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
    data: transactionsResp?.transactionAttempts || [],
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
      ) : !isLoading && transactionsResp?.total ? (
        <div className="flex flex-col items-center">
          <Table tableConfig={table} isLoading={isFetching || isPreviousData} />
          <TransactionPagination
            page={page}
            limit={limit}
            total={transactionsResp.total}
            onPageChange={onPageChange}
            isLoading={isFetching || isPreviousData}
          />
        </div>
      ) : (
        <EmptyState
          heading={searchTerm ? "No transactions found" : "No transactions yet"}
          description={
            searchTerm ? (
              <span>Try searching for a different transaction or wallet</span>
            ) : (
              <span>
                When transactions are successfully added to the blockchain they
                will appear here
              </span>
            )
          }
        />
      )}
    </div>
  )
}

export default AllTransactions
