import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useParams } from "next/navigation"
import { useState } from "react"

import CaretDown from "@/components/icons/CaretDown"
import Hex from "@/components/Transactions/atoms/Hex"
import Table from "@/components/Transactions/atoms/Table"
import TransactionBlock from "@/components/Transactions/atoms/Block"
import TransactionPagination from "@/components/Transactions/atoms/Pagination"
import TransactionStatus, {
  RawStatusEnum,
} from "@/components/Transactions/atoms/Status"
import TransactionTimeStamp from "@/components/Transactions/atoms/TimeStamp"
import useGetTransactions, {
  TransactionDataType,
} from "@/hooks/useGetTransactions"

const columnHelper = createColumnHelper<TransactionDataType>()

const columns = [
  columnHelper.accessor("transactionId", {
    header: () => "Transaction",
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
    id: "Hash",
    cell: (info) => (
      <Hex
        hexValue={info.getValue()}
        hexType={"tx"}
        chainId={info.row.original.chainId}
      />
    ),
    header: () => <span>Hash</span>,
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
  columnHelper.accessor("updatedAt", {
    header: () => <span>Transaction age</span>,
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

const AllTransactions = () => {
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
    statuses: [
      RawStatusEnum.PENDING,
      RawStatusEnum.CONFIRMED,
      RawStatusEnum.PENDING,
    ],
  })

  const onPageChange = (page: number) => {
    setPage(page)
    refetch?.()
  }

  const table = useReactTable({
    data: transactionsResp?.transactionAttempts || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div>
      {isLoading ? (
        <div className="">Loading...</div>
      ) : !isLoading && transactionsResp?.total ? (
        <div className="flex flex-col items-center">
          <Table tableConfig={table} />
          <TransactionPagination
            page={page}
            limit={limit}
            total={transactionsResp.total}
            onPageChange={onPageChange}
            isLoading={isFetching || isPreviousData}
          />
        </div>
      ) : (
        <div>No transactions</div>
      )}
    </div>
  )
}

export default AllTransactions
