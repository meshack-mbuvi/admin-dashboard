"use client"

import { useState } from "react"

import { Tab } from "@/components/Tab"
import { ListContracts } from "@/components/Contract"

import useAuth from "@/hooks/useAuth"

export default function Home() {
  const { isSessionLoading, session } = useAuth()

  const tabHeaders = ["Contracts", "Second item"]

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    Contracts: <ListContracts />,
    "Second item": <div>Second item</div>,
  }

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <div className="flex flex-col  ">
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
