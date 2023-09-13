"use client"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import clsx from "clsx"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

import useGetTokenMetadata, { TokenMetadata } from "@/hooks/useGetTokenMetadata"
import { DarkButtonStyles } from "../Buttons"
import Loading from "../Loading"
import EmptyState from "../Shared/Empty"
import Table from "../Table/Table"
import TablePagination, { DEFAULT_TABLE_LIMIT } from "../Table/TablePagination"
import TableTimeStampCell from "../Table/TableTimeStampCell"
import ArrowUpperRight from "../icons/ArrowUpperRight"


const columnHelper = createColumnHelper<TokenMetadata>()
const columns = [
  columnHelper.accessor("updatedAt", {
    enableColumnFilter: false,
    header: () => <span>Updated At</span>,
    cell: (info) => <TableTimeStampCell 
      id={`${info.row.original.tokenId}-${info.row.original.metadataId}`}
      timeStamp={info.getValue()}
    />
  }),
  columnHelper.accessor("metadataId", {
    size: 200,
    header: () => <span>Metadata ID</span>,
    cell: (info) => <span>{info.getValue()}</span>
  }),
  columnHelper.accessor("tokenId", {
    size: 55,
    header: () => <span>Token ID</span>,
    cell: (info) => <span>{info.getValue()}</span>
  }),
  columnHelper.accessor("chainId", {
    header: () => <span>Chain ID</span>,
    cell: (info) => <span>{info.getValue()}</span>
  })
]


export default function Metadata() {
  const { projectId } = useParams()
  const [page, setPage] = useState(0)
  const [limit] = useState(DEFAULT_TABLE_LIMIT)
  const onPageChange = (page: number) => setPage(page)

  const {
    data,
    isFetching,
    isPreviousData,
    isLoading
  } = useGetTokenMetadata({
    projectId: projectId as string,
    page,
    limit
  })

  const table = useReactTable({
    data: data?.metadata || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return (
    <div>
      {[...Array(6)].map((_, i) => (
      <div className="flex gap-5 py-4" key={i}>
        <Loading className="w-1/5 h-4" />
        <Loading className="w-1/5 h-4" />
        <Loading className="w-1/5 h-4" />
        <Loading className="w-1/5 h-4" />
        <Loading className="w-1/5 h-4" />
      </div>
      ))}
    </div>
    )
  } else if (data?.metadata.length === 0) {
    return <div className="mt-16">
      <EmptyState
        heading={"No metadata found"}
        description={<span>View the guide below to add metadata</span>}
      >
        <Link
          href="https://docs.syndicate.io/guides/dynamic-nft-metadata"
          target="_blank"
          className={clsx(
            DarkButtonStyles,
            "border-yellow-secondary flex items-baseline mt-8"
          )}
        >
          View Guide
          <ArrowUpperRight className="h-4 w-4 ml-2" />
        </Link>
      </EmptyState>
    </div>
  }

  return <div className="flex flex-col items-center">
    <Table 
      tableConfig={table}
      isLoading={isFetching || isPreviousData}
      noDataMessage="No metadata found"
    />
    <TablePagination 
      page={page}
      limit={limit}
      total={data?.total || 0}
      onPageChange={onPageChange}
      isLoading={isFetching || isPreviousData}
    />
  </div>
}
