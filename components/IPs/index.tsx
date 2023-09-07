"use client"
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import clsx from "clsx"
import { format } from "date-fns"
import { useParams } from "next/navigation"

import Table from "@/components/Shared/Table"
import Text from "@/components/Text"
import { DarkButtonStyles } from "@/components/Buttons"
import ExternalLink from "@/components/Shared/ExternalLink"
import ResourceID from "@/components/Shared/ResourceID"
import Loading from "@/components/Loading"
import useGetIpRanges, { IPsDataType } from "@/hooks/useGetIpRanges"

const columnHelper = createColumnHelper<IPsDataType>()

const columns = [
  columnHelper.accessor("ipRange", {
    size: 250,
    header: () => <span>IPs</span>,
    cell: (info) => (
      <div className="flex space-x-8">
        <span className="font-mono">{info.getValue()}</span>
        <ResourceID ID={info.getValue()} />
      </div>
    ),
  }),

  columnHelper.accessor("createdAt", {
    header: () => <span>Date Added</span>,
    cell: (info) => (
      <span> {format(new Date(info.getValue()), "do MMM yyyy")}</span>
    ),
  }),
]

export default function IpRanges() {
  const { projectId } = useParams()
  const {
    data: IPsData,
    isLoading: isIpsLoading,
    isFetching,
    isPreviousData,
  } = useGetIpRanges({
    projectId,
  })

  const table = useReactTable({
    data: IPsData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <div className="flex flex-col p-10 border border-gray-8 bg-gray-9 rounded-2lg mb-10 mr-10">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Text className="font-medium text-2xl ">Allowed IP Ranges</Text>
            <p className="font-small text-gray-3 text-sm">
              These IP ranges will be allowed at access the API
            </p>
          </div>
          <ExternalLink
            href="https://docs.syndicate.io/guides/ip-range"
            className={clsx(
              DarkButtonStyles,
              "border-2 border-warning text-white flex space-x-2 py-3"
            )}
            linkText="View Guide"
          />
        </div>

        <div className="pb-5 overflow-x-auto mt-16">
          {isIpsLoading ? (
            <>
              {[...Array(2)].map((_, i) => (
                <div className="flex gap-5 py-4" key={i}>
                  <Loading className="w-1/5 h-4" />
                  <Loading className="w-1/5 h-4" />
                  <Loading className="w-1/5 h-4" />
                </div>
              ))}
            </>
          ) : (
            <Table
              tableConfig={table}
              isLoading={isFetching || isPreviousData}
            />
          )}
        </div>
      </div>
    </div>
  )
}
