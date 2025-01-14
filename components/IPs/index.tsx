"use client"
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { cn } from "@/utils/cn"
import { useParams } from "next/navigation"

import { DarkButtonStyles } from "@/components/Buttons"
import Loading from "@/components/Loading"
import ExternalLink from "@/components/Shared/ExternalLink"
import PremiumPill from "@/components/Shared/PremiumPill"
import ResourceID from "@/components/Shared/ResourceID"
import Table from "@/components/Table/Table"
import Text from "@/components/Text"
import useFreePlan from "@/hooks/useFreePlan"
import useGetIpRanges, { IPsDataType } from "@/hooks/useGetIpRanges"
import getFirstOrString from "@/utils/getFirstOrString"
import DateTimestamp from "../Shared/Datestamp"
import EmptyState from "../Shared/Empty"

const columnHelper = createColumnHelper<IPsDataType>()

const columns = [
  columnHelper.accessor("ipRange", {
    size: 250,
    header: () => <span>IPs</span>,
    cell: (info) => (
      <div className="flex space-x-8">
        <span className="font-mono">{info.getValue()}</span>
        <ResourceID id={info.row.original.id} context="Ip" />
      </div>
    ),
  }),

  columnHelper.accessor("note", {
    size: 250,
    header: () => <span>Note</span>,
    cell: (info) => <span className="font-mono">{info.getValue()}</span>,
  }),

  columnHelper.accessor("createdAt", {
    header: () => <span>Date Added</span>,
    cell: (info) => <DateTimestamp date={info.getValue()} showTime={true} />,
  }),
]

export default function IpRanges() {
  const { projectId } = useParams()
  const projectIdString = getFirstOrString(projectId)
  const isFreePlan = useFreePlan()

  const {
    data: IPsData,
    isLoading: isIpsLoading,
    isFetching,
    isPreviousData,
  } = useGetIpRanges({
    projectId: projectIdString,
  })

  const table = useReactTable({
    data: IPsData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <div className="flex flex-col p-10 border border-gray-8 bg-gray-9 rounded-2lg mb-10">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Text className="font-medium text-2xl ">Allowed IP Ranges</Text>
            <p className="font-small text-gray-3 text-sm">
              These IP ranges will be allowed at access the API
            </p>
          </div>
          <div className="flex space-x-7">
            {isFreePlan && <PremiumPill />}

            <ExternalLink
              href="https://docs.syndicate.io/guides/ip-range"
              className={cn(
                DarkButtonStyles,
                "border-2 border-warning text-white flex space-x-2 py-3"
              )}
              linkText="View Guide"
            />
          </div>
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
          ) : IPsData?.length !== 0 ? (
            <Table
              tableConfig={table}
              isLoading={isFetching || isPreviousData}
            />
          ) : (
            <div className="mt-16">
              <EmptyState
                heading={"No IP ranges yet"}
                description={<span>View the guide to add IP ranges.</span>}
              ></EmptyState>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
