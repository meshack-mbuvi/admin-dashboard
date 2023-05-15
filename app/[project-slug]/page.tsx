"use client"

import { Tab } from "@/components/Tab"
import General from "@/components/General";
import APIKeys from "@/components/APIKeys";
import Wallets from "@/components/Wallets";
import { useState } from "react"
import useAuth from "@/hooks/useAuth"

export default function Home() {
  const { isSessionLoading, session } = useAuth()

  const tabHeaders = ["General", "API Keys", "Wallets"]

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    "General": <General />,
    "API Keys": <APIKeys />,
    "Wallets": <Wallets />,
  }

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <div className="flex flex-col">
      <div className="flex justify-between pt-14">
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
