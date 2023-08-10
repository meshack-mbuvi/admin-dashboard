import { useState } from "react"

import { Tab } from "@/components/Tab"
import AllTransactions from "@/components/Transactions/AllTransactions"
import FailedRequests from "@/components/Transactions/FailedRequests"
import Search from "@/components/Transactions/atoms/Search"
import { RawStatusEnum } from "@/components/Transactions/atoms/Status"
import useGetRequests from "@/hooks/useGetRequests"
import useGetTransactions from "@/hooks/useGetTransactions"
import { useParams } from "next/navigation"

export default function TransactionTables() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const { projectId } = useParams()

  const { data: failedTxResponse } = useGetRequests({
    projectId,
    page: 0,
    limit: 20,
    invalid: true,
  })

  const { data: successfulTxResponse } = useGetTransactions({
    projectId,
    page: 0,
    limit: 20,
    search: searchTerm,
    statuses: [
      RawStatusEnum.PENDING,
      RawStatusEnum.SUBMITTED,
      RawStatusEnum.CONFIRMED,
    ],
  })

  const tabHeaders = [`Transactions`, `Failed requests`]

  const tabSuffixes = [
    ` (${successfulTxResponse?.total || 0})`,
    ` (${failedTxResponse?.total || 0})`,
  ]

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    Transactions: <AllTransactions searchTerm={searchTerm} />,
    "Failed requests": <FailedRequests />,
  }

  return (
    <div className="flex flex-col">
      <div className="flex ml-2 justify-between">
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
