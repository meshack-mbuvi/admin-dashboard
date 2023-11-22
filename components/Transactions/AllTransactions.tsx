import { Route } from "next"
import { FiltersTableState } from "@tanstack/react-table"
import clsx from "clsx"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import Loading from "@/components/Loading"
import EmptyState from "@/components/Shared/Empty"
import TablePagination, {
  DEFAULT_TABLE_LIMIT,
} from "@/components/Table/TablePagination"
import {
  RawStatusEnum,
  StatusEnum,
  getRawStatusFromStatus,
} from "@/components/Transactions/atoms/Status"
import useGetProjectById from "@/hooks/useGetProjectById"
import useGetTransactions from "@/hooks/useGetTransactions"
import useIsTestUser from "@/hooks/useIsTestUser"
import { QueryParams } from "@/types/queryParams"
import getFirstOrString from "@/utils/getFirstOrString"
import { DarkButtonStyles } from "../Buttons"
import CreateContractButton from "../Buttons/CreateContractButton"
import ExternalLink from "../Shared/ExternalLink"
import TransactionCard from "./TransactionCard"

const defaultStatusFilters = [
  RawStatusEnum.PENDING,
  RawStatusEnum.SUBMITTED,
  RawStatusEnum.CONFIRMED,
]

interface AllTransactionsProps {
  searchTerm: string
  setTxCount: (count?: number) => void
}

const AllTransactions = (props: AllTransactionsProps) => {
  const { searchTerm, setTxCount } = props
  const { projectId } = useParams()
  const projectIdString = getFirstOrString(projectId)
  const [columnFilters] = useState<FiltersTableState["columnFilters"]>([])
  const [page, setPage] = useState<number>(0)
  const [limit] = useState<number>(DEFAULT_TABLE_LIMIT)
  const [statuses, setStatuses] =
    useState<RawStatusEnum[]>(defaultStatusFilters)
  const [reverted, setReverted] = useState<boolean | null>(null)
  const isTestUser = useIsTestUser()

  const { data: projectData, isLoading: isProjectLoading } = useGetProjectById({
    projectId: projectIdString,
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
    projectId: projectIdString,
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
        {[...Array(10)].map((_, i) => (
          <Loading key={i} className="w-full h-24 mb-6" />
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

    const emptyTransactionDocLink: Route = `https://docs.syndicate.io/${
      isTestUser ? "get-started/quickstart" : "guides/transactions"
    }`

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
                pathname: `/projects/${projectId}/contracts`,
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
              className="my-4 text-yellow-secondary"
            />
          </>
        ) : (
          <ExternalLink
            href={emptyTransactionDocLink}
            className={clsx(
              DarkButtonStyles,
              "border-2 border-yellow-secondary text-white flex space-x-2 py-4 mt-10"
            )}
            linkText="Learn how to send your first transaction"
          />
        )}
      </EmptyState>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={clsx(
          "flex flex-col gap-4 w-full",
          isFetching && "opacity-60 pointer-events-none"
        )}
      >
        {transactionsResp?.transactionAttempts.map((transaction) => (
          <TransactionCard
            key={transaction.transactionId}
            transaction={transaction}
          />
        ))}
      </div>

      <TablePagination
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
