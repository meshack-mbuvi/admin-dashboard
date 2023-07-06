"use client"

import Button, { DarkButtonStyles } from "@/components/Buttons"
import Projects from "@/components/Projects"
import { Tab } from "@/components/Tab"
import Users from "@/components/Users"
import Add from "@/components/icons/Add"
import clsx from "clsx"
import { useState } from "react"

export default function Dashboard() {
  const tabHeaders = ["Projects", "People"]

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    Projects: <Projects />,
    People: <Users />,
  }

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <div className="flex flex-col">
      <div className="flex ml-2 justify-between">
        <Tab
          headers={tabHeaders}
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
        />

        <Button className={clsx(DarkButtonStyles, "flex items-center")}>
          <Add className="h-4 w-4 mr-4" />
          Add a manager
        </Button>
      </div>
      <div className="ml-2">{tabComponents[tabHeaders[activeTabIndex]]}</div>
    </div>
  )
}
