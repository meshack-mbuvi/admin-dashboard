"use client"

import { useState } from "react"

import { Tab } from "@/components/Tab"
import APIKeys from "@/components/APIKeys"
import General from "@/components/General"
import Wallets from "@/components/Wallets"

export default function Home() {
  const tabHeaders = ["General", "API Keys", "Wallets"]

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    General: <General />,
    "API Keys": <APIKeys />,
    Wallets: <Wallets />,
  }

  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)

  return (
    <>
      <div className="flex justify-between">
        <Tab
          headers={tabHeaders}
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
        />
      </div>
      <div>{tabComponents[tabHeaders[activeTabIndex]]}</div>
    </>
  )
}
