import { useState } from "react"

import AllTransactions from "@/components/Transactions/AllTransactions"
import FailedRequests from "@/components/Transactions/FailedRequests"
import Search from "@/components/Transactions/atoms/Search"
import { Tab } from "@/components/Tab"

export default function TransactionTables() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const tabHeaders = ["Transactions", "Failed requests"]

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
        />
        {activeTabIndex === 0 && (
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}
      </div>
      <div className="ml-2">{tabComponents[tabHeaders[activeTabIndex]]}</div>
    </div>
  )
}
