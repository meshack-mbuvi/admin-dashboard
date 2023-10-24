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
      <Tab 
        headers={tabHeaders}
        activeIndex={activeTabIndex}
        setActiveIndex={setActiveTabIndex}
      />
      <div className="ml-2">{tabComponents[tabHeaders[activeTabIndex]]}</div>
    </div>
  )
}
