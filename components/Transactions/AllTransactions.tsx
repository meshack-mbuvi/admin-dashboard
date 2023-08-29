import {
  FiltersTableState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import Loading from "@/components/Loading"
import EmptyState from "@/components/Shared/Empty"
import Hex from "@/components/Shared/Hex"
import ResourceID from "@/components/Shared/ResourceID"
import Table from "@/components/Shared/Table"
import TransactionBlock from "@/components/Transactions/atoms/Block"
import TransactionPagination from "@/components/Transactions/atoms/Pagination"
import TransactionStatus, {
  RawStatusEnum,
  StatusEnum,
  getRawStatusFromStatus,
  getStatusLabel,
} from "@/components/Transactions/atoms/Status"
import TransactionTimeStamp from "@/components/Transactions/atoms/TimeStamp"
import CaretDown from "@/components/icons/CaretDown"
import useGetProjectById from "@/hooks/useGetProjectById"
import useGetTransactions, {
  TransactionDataType,
} from "@/hooks/useGetTransactions"
import { QueryParams } from "@/types/queryParams"
import clsx from "clsx"
import { DarkButtonStyles } from "../Buttons"
import CreateContractButton from "../Buttons/CreateContractButton"
import ExternalLink from "../Shared/ExternalLink"
import TableFilterPills from "../Shared/TableFilterPills"
import Text from "../Text"
import TxIdFilter from "./atoms/TxStatusFilter"

const columnHelper = createColumnHelper<TransactionDataType>()

const columns = [
  columnHelper.accessor("transactionId", {
    size: 400,
    enableColumnFilter: true,
    meta: {
      filterComponent: (setFilterValue, filterValues) => (
        <TxIdFilter
          setFilter={setFilterValue}
          filters={(filterValues as StatusEnum[]) || []}
        />
      ),
    },
    header: () => <span className="font-normal">Transaction ID</span>,
    cell: (info) => (
      <span className="text-white flex items-center space-x-3 font-mono">
        <TransactionStatus
          transactionId={info.getValue()}
          transactionStatus={info.row.original.status}
          reverted={info.row.original.reverted}
        />
        <ResourceID ID={info.getValue()} fullView={true} />
      </span>
    ),
  }),
  columnHelper.accessor("chainId", {
    size: 80,
    enableColumnFilter: false,
    header: () => <span>Chain ID</span>,
    cell: (info) => <Text className="text-gray-3">{info.getValue()}</Text>,
  }),
  columnHelper.accessor((row) => row.hash, {
    enableColumnFilter: false,
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
    size: 100,
    enableColumnFilter: false,
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
    enableColumnFilter: false,
    header: () => <span>Block Age</span>,
    cell: (info) => (
      <TransactionTimeStamp
        transactionId={info.row.original.transactionId}
        timeStamp={info.getValue()}
      />
    ),
  }),
  columnHelper.accessor("walletAddress", {
    enableColumnFilter: false,
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

const defaultStatusFilters = [
  RawStatusEnum.PENDING,
  RawStatusEnum.SUBMITTED,
  RawStatusEnum.CONFIRMED,
]

const filterTitles = {
  id: { transactionId: "Transaction Status" },
  value: Object.values(StatusEnum).reduce((acc, curr) => {
    acc[curr] = getStatusLabel(curr)
    return acc
  }, {} as { [key in StatusEnum]: string }),
}

interface AllTransactionsProps {
  searchTerm: string
  setTxCount: (count?: number) => void
}

const AllTransactions = (props: AllTransactionsProps) => {
  const { searchTerm, setTxCount } = props
  const { projectId } = useParams()
  const [columnFilters, setColumnFilters] = useState<
    FiltersTableState["columnFilters"]
  >([])
  const [page, setPage] = useState<number>(0)
  const [limit] = useState<number>(20)
  const [statuses, setStatuses] =
    useState<RawStatusEnum[]>(defaultStatusFilters)
  const [reverted, setReverted] = useState<boolean | null>(null)

  const { data: projectData, isLoading: isProjectLoading } = useGetProjectById({
    projectId,
  })
  const projectHasContracts = useMemo(
    () => projectData?.contracts && projectData?.contracts?.length > 0,
    [projectData?.contracts]
  )

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
    statuses,
    reverted,
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
    setTxCount(transactionsResp?.total)
  }, [transactionsResp?.total, setTxCount])

  useEffect(() => {
    debouncedFetch()
  }, [searchTerm, debouncedFetch])

  const table = useReactTable({
    data: transactionsResp?.transactionAttempts || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    enableColumnFilters: true,
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  })

  useEffect(() => {
    const filters =
      (columnFilters.find((filter) => filter.id === "transactionId")
        ?.value as StatusEnum[]) || []
    const revertedFilter = !!filters.find((item) => item === StatusEnum.Failed)
    const statusFilter = filters.filter((item) => item !== StatusEnum.Failed)
    setPage(0)
    setReverted(revertedFilter || null)
    setStatuses(
      statusFilter.length === 0
        ? defaultStatusFilters
        : (statusFilter.map((status) =>
            getRawStatusFromStatus(status)
          ) as RawStatusEnum[])
    )
  }, [columnFilters])

  if (isTransactionsLoading || isProjectLoading) {
    return (
      <>
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
    )
  } else if (!transactionsResp?.total && columnFilters.length === 0) {
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
            <span>When transactions are requested, they’ll appear here</span>
          )
        }
      >
        {!projectHasContracts ? (
          <>
            <Link
              href={{
                pathname: `/dashboard/${projectId}/contracts`,
                query: {
                  [QueryParams.ShowNewContractModal]: true,
                },
              }}
            >
              <CreateContractButton className="mt-6" />
            </Link>
            <ExternalLink
              href="https://docs.syndicate.io/get-started/introduction"
              linkText="View Guide"
            />
          </>
        ) : (
          <ExternalLink
            href="https://docs.syndicate.io/guides/transactions"
            className={clsx(
              DarkButtonStyles,
              "border-2 border-warning text-white flex space-x-2 py-4 mt-10"
            )}
            linkText="Learn how to send your first transaction"
          />
        )}
      </EmptyState>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <TableFilterPills tableConfig={table} titles={filterTitles} />
      <Table
        tableConfig={table}
        isLoading={isFetching || isPreviousData}
        noDataMessage="No transactions found"
      />
      <TransactionPagination
        page={page}
        limit={limit}
        total={transactionsResp?.total || 0}
        onPageChange={onPageChange}
        isLoading={isFetching || isPreviousData}
      />
    </div>
  )
}

export default AllTransactions
