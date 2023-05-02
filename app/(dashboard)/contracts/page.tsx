"use client"

import Button from "@/components/Buttons"
import { ListContracts } from "@/components/Contract"
import { Tab } from "@/components/Tab"
import { useAddContractContext } from "@/context/addContract"
import { useState } from "react"

export default function Contracts() {
  const { handleShowAddContractModal } = useAddContractContext()
  const tabHeaders = ["Contracts", "Second item"]

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    Contracts: <ListContracts />,
    "Second item": <div>Second item</div>,
  }

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const handleButtonClick = () => {
    handleShowAddContractModal?.(true)
  }

  return (
    <div className="flex flex-col text-white">
      <div className="flex justify-between pt-14">
        <Tab
          headers={tabHeaders}
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
        />
        {activeTabIndex === 0 && (
          <Button onClick={handleButtonClick} buttonLabel="Add contract" />
        )}
      </div>
      <div className="text-white">
        {tabComponents[tabHeaders[activeTabIndex]]}
      </div>
    </div>
  )
}
