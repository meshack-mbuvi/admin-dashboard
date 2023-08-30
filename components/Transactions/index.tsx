import { useState } from "react"
import clsx from "clsx"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Tab } from "@/components/Tab"
import AllTransactions from "@/components/Transactions/AllTransactions"
import FailedRequests from "@/components/Transactions/FailedRequests"
import Search from "@/components/Transactions/atoms/Search"
import useGetRequests from "@/hooks/useGetRequests"

import { DarkButtonStyles } from "@/components/Buttons"
import ArrowUpperRight from "../icons/ArrowUpperRight"

export default function TransactionTables() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [txCount, setTxCount] = useState<number>()

  const { projectId } = useParams()

  const { data: failedTxResponse } = useGetRequests({
    projectId,
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
      <AllTransactions setTxCount={setTxCount} searchTerm={searchTerm} />
    ),
    "Failed requests": <FailedRequests />,
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <Tab
          headers={tabHeaders}
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
          tabSuffixes={tabSuffixes}
        />
        {activeTabIndex === 0 && (
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}

        {activeTabIndex === 1 && (
          <Link
            // TODO: ADD URL here
            href="https://docs.syndicate.io"
            target="_blank"
            className={clsx(
              DarkButtonStyles,
              "border-yellow-secondary flex items-baseline"
            )}
          >
            Troubleshoot
            <ArrowUpperRight className="h-4 w-4 ml-2" />
          </Link>
        )}
      </div>
      <div className="ml-2">{tabComponents[tabHeaders[activeTabIndex]]}</div>
    </div>
  )
}
