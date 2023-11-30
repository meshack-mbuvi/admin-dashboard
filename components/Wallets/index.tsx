"use client"

import { Tab } from "../Tab"
import { useState } from "react"
import { ManagedGas } from "./ManagedGas"
import { TransactionWallets } from "./TransactionWallets"

export default function Wallets() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const tabHeaders = ["Transaction Wallets", "Managed Gas"]
  const tabComponents: Record<string, JSX.Element> = {
    "Transaction Wallets": <TransactionWallets />,
    "Managed Gas": <ManagedGas />,
  }

  return (
    <div>
      <div className="mt-2 md:mb-12 mb-6">
        <Tab
          headers={tabHeaders}
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
        />
      </div>
      <div>{tabComponents[tabHeaders[activeTabIndex]]}</div>
    </div>
  )
}
