"use client"

import clsx from "clsx"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

import useGetTokenMetadata from "@/hooks/useGetTokenMetadata"
import { DarkButtonStyles } from "../Buttons"
import Loading from "../Loading"
import EmptyState from "../Shared/Empty"
import MetadataCard from "./MetadataCard"
import TablePagination, { DEFAULT_TABLE_LIMIT } from "../Table/TablePagination"
import ArrowUpperRight from "../icons/ArrowUpperRight"

export default function Metadata() {
  const { projectId } = useParams()
  const [page, setPage] = useState(0)
  const [limit] = useState(DEFAULT_TABLE_LIMIT)
  const onPageChange = (page: number) => setPage(page)

  const { data, isFetching, isPreviousData, isLoading } = useGetTokenMetadata({
    projectId: projectId as string,
    page,
    limit,
  })

  if (isLoading) {
    return (
      <div>
        <div className="grid grid-cols-1 gap-4">
          <Loading className="h-24 w-full" />
          <Loading className="h-24 w-full" />
          <Loading className="h-24 w-full" />
          <Loading className="h-24 w-full" />
          <Loading className="h-24 w-full" />
          <Loading className="h-24 w-full" />
          <Loading className="h-24 w-full" />
          <Loading className="h-24 w-full" />
          <Loading className="h-24 w-full" />
        </div>
      </div>
    )
  } else if (data?.metadata.length === 0) {
    return (
      <div className="mt-16">
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
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 w-full">
        {data?.metadata.map((metadata) => (
          <MetadataCard
            key={`${metadata.metadataId}-${metadata.tokenId}`}
            metadata={metadata}
          />
        ))}
      </div>

      <TablePagination
        page={page}
        limit={limit}
        total={data?.total || 0}
        onPageChange={onPageChange}
        isLoading={isFetching || isPreviousData}
      />
    </div>
  )
}
