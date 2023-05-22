"use client"

import APIKeys from "@/components/APIKeys"
import General from "@/components/General"
import { Tab } from "@/components/Tab"
import Wallets from "@/components/Wallets"
import useAuth from "@/hooks/useAuth"
import { useState } from "react"

export default function Home() {
  const { isSessionLoading, session } = useAuth()

  const tabHeaders = ["General", "API Keys", "Wallets"]

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    General: <General />,
    "API Keys": <APIKeys />,
    Wallets: <Wallets />,
  }

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <div className="flex flex-col ml-28 container">
      <div className="flex justify-between ml-2">
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
