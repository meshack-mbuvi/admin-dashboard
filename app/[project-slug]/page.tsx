"use client"

import { ListContracts } from "@/components/Contract"
import PageLoading from "@/components/PageLoading"
import { Tab } from "@/components/Tab"
import useAuth from "@/hooks/useAuth"
import { useState } from "react"

export default function Contracts() {
  const { isSessionLoading, session } = useAuth()

  const tabHeaders = ["Contracts", "Second item"]

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    Contracts: <ListContracts />,
    "Second item": <div>Second item</div>,
  }

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  if (isSessionLoading) return <PageLoading />
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
