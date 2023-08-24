import { useState } from "react"

import { Tab } from "@/components/Tab"
import AllTransactions from "@/components/Transactions/AllTransactions"
import FailedRequests from "@/components/Transactions/FailedRequests"
import Search from "@/components/Transactions/atoms/Search"
import useGetRequests from "@/hooks/useGetRequests"
import { useParams } from "next/navigation"

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
      </div>
      <div className="ml-2">{tabComponents[tabHeaders[activeTabIndex]]}</div>
    </div>
  )
}
