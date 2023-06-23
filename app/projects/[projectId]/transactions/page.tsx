"use client"

import { Tab } from "@/components/Tab"
import AllTransactions from "@/components/Transactions"
import FailedRequests from "@/components/Transactions/FailedRequests"
import { useState } from "react"

export default function Transactions() {
  const tabHeaders = ["Transactions", "Failed requests"]

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    Transactions: <AllTransactions />,
    "Failed Request": <FailedRequests />,
  }

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <div className="flex flex-col">
      <div className="flex ml-2">
        <Tab
          headers={tabHeaders}
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
        />
      </div>
      <div className="ml-2">{tabComponents[tabHeaders[activeTabIndex]]}</div>
    </div>
  )
}
