"use client"

import Button, { DarkButtonStyles } from "@/components/Buttons"
import Loading from "@/components/Loading"
import { Tab } from "@/components/Tab"
import Add from "@/components/icons/Add"
import useGetProjects from "@/hooks/useGetProjects"
import clsx from "clsx"
import { useState } from "react"
import ProjectRow from "./components/ProjectRow"

const Projects = () => {
  const { data, isLoading } = useGetProjects()

  return (
    <>
      <div className="text-2xl text-gray-1 pl-1 mb-7">Projects</div>
      <div className="flex flex-col space-y-7">
        {/* Header */}
        <div className="flex">
          <div className="w-1/4 text-left italic text-sm text-gray-4">Name</div>
        </div>

        {/* Project list */}
        {isLoading && (
          <div>
            <Loading className="h-6 w-48" />
            <div className="border-b border-gray-7 my-6" />
            <Loading className="h-6 w-52" />
            <div className="border-b border-gray-7 my-6" />
            <Loading className="h-6 w-60" />
            <div className="border-b border-gray-7 my-6" />
            <Loading className="h-6 w-48" />
            <div className="border-b border-gray-7 my-6" />
          </div>
        )}

        {data && (
          <div className="-ml-7 -mr-7 flex flex-col">
            {data.map(({ name, id }) => (
              <ProjectRow key={id} name={name} projectId={id} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default function Dashboard() {
  const tabHeaders = ["Projects", "People"]

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    Projects: <Projects />,
    People: <>People</>,
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
