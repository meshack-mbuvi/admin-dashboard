import { useState } from "react"
import { cn } from "@/utils/cn"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Tab } from "@/components/Tab"
import AllTransactions from "@/components/Transactions/AllTransactions"
import FailedRequests from "@/components/Transactions/FailedRequests"
import Search from "@/components/Transactions/atoms/Search"
import useGetRequests from "@/hooks/useGetRequests"

import { DarkButtonStyles } from "@/components/Buttons"
import ArrowUpperRight from "../icons/ArrowUpperRight"
import getFirstOrString from "@/utils/getFirstOrString"

export default function TransactionTables() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [searchTxsTerm, setSearchTxsTerm] = useState<string>("")
  const [searchReqsTerm, setSearchReqsTerm] = useState<string>("")
  const [txCount, setTxCount] = useState<number>()

  const { projectId } = useParams()
  const projectIdString = getFirstOrString(projectId)

  const { data: failedTxResponse } = useGetRequests({
    projectId: projectIdString,
    page: 0,
    limit: 20,
    invalid: true,
  })

  const tabHeaders = [`Transactions`, `Failed requests`]

  const tabSuffixes = [
    ` (${txCount?.toLocaleString() || 0})`,
    ` (${failedTxResponse?.total.toLocaleString() || 0})`,
  ]

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    Transactions: (
      <AllTransactions setTxCount={setTxCount} searchTerm={searchTxsTerm} />
    ),
    "Failed requests": <FailedRequests searchTerm={searchReqsTerm} />,
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap justify-between items-end gap-4 md:mb-12 mb-6">
        <Tab
          headers={tabHeaders}
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
          tabSuffixes={tabSuffixes}
        />
        {activeTabIndex === 1 && (
          <div className="flex flex-shrink-0 items-center sm:items-end">
            {!!(searchReqsTerm || failedTxResponse?.total) && (
              <Search
                searchTerm={searchReqsTerm}
                setSearchTerm={setSearchReqsTerm}
                placeholder="Search requests"
              />
            )}

            <Link
              href="https://docs.syndicate.io/guides/transactions"
              target="_blank"
              className={cn(
                DarkButtonStyles,
                "border-yellow-secondary flex items-baseline ml-2"
              )}
            >
              Troubleshoot
              <ArrowUpperRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        )}

        {activeTabIndex === 0 && !!(searchTxsTerm || txCount) && (
          <Search
            searchTerm={searchTxsTerm}
            setSearchTerm={setSearchTxsTerm}
            placeholder="Search transactions"
          />
        )}
      </div>
      {tabComponents[tabHeaders[activeTabIndex]]}
    </div>
  )
}
