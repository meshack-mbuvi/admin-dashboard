import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import clsx from "clsx"
import Link from "next/link"

import Loading from "@/components/Loading"
import EmptyState from "@/components/Shared/Empty"
import Hex from "@/components/Shared/Hex"
import Table from "@/components/Shared/Table"
import TransactionBlock from "@/components/Transactions/atoms/Block"
import TransactionPagination from "@/components/Transactions/atoms/Pagination"
import TransactionStatus, {
  RawStatusEnum,
} from "@/components/Transactions/atoms/Status"
import TransactionTimeStamp from "@/components/Transactions/atoms/TimeStamp"
import CaretDown from "@/components/icons/CaretDown"
import useGetProjectById from "@/hooks/useGetProjectById"
import useGetTransactions, {
  TransactionDataType,
} from "@/hooks/useGetTransactions"
import CreateContractButton from "../Buttons/CreateContractButton"
import Text from "../Text"
import { QueryParams } from "@/types/queryParams"

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
  columnHelper.accessor("chainId", {
    header: () => <span>Chain ID</span>,
    cell: (info) => <Text className="text-gray-3">{info.getValue()}</Text>,
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
    data: projectData,
    isLoading: isProjectLoading,
  } = useGetProjectById({
    projectId,
  })
  const projectHasContracts = useMemo(() => projectData?.contracts && projectData?.contracts?.length > 0, [projectData?.contracts])

  const {
    isLoading: isTransactionsLoading,
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

  if (isTransactionsLoading || isProjectLoading) {
    return <>
      {[...Array(6)].map((_, i) => (
        <div className="flex gap-5 py-4" key={i}>
          <Loading className="w-1/5 h-4" />
          <Loading className="w-1/5 h-4" />
          <Loading className="w-1/5 h-4" />
          <Loading className="w-1/5 h-4" />
          <Loading className="w-1/5 h-4" />
        </div>
      ))}
    </>
  } else if (!transactionsResp?.total) {
    const renderHeading = () => {
      if (searchTerm) {
        return "No transactions found"
      } else if (!projectHasContracts) {
        return "No contracts or transactions yet"
      } else {
        return "No transactions yet"
      }
    }
    return (
      <EmptyState
        heading={renderHeading()}
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
      >
        {!projectHasContracts && <Link href={{
          pathname: `/dashboard/${projectId}/settings/contracts`,
          query: {
            [QueryParams.ShowNewContractModal]: true
          }
        }}>
          <CreateContractButton className={clsx("mt-6")}/>
        </Link>}
      </EmptyState>
    )
  }

  return (
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
  )
}

export default AllTransactions
