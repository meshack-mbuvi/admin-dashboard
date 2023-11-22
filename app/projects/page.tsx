"use client"

import clsx from "clsx"
import { useState } from "react"

import AddUserModal from "@/components/Users/AddUserModal"
import Button, { LightButtonStyles } from "@/components/Buttons"
import CreateProjectModal from "@/components/Projects/CreateProjectModal"
import Projects from "@/components/Projects"
import { Tab } from "@/components/Tab"
import Users from "@/components/Users"
import Add from "@/components/icons/Add"

export default function Dashboard() {
  const tabHeaders = ["Projects", "People"]
  const tabButtonText = ["Create project", "Invite user"]

  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false)

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    Projects: <Projects onCreateProject={setShowCreateProjectModal} />,
    People: <Users />,
  }

  const tabButtonHandler = [
    () => setShowCreateProjectModal(true),
    () => setShowAddUserModal(true),
  ]

  return (
    <div className="flex flex-col">
      <div className="sm:flex justify-between">
        <Tab
          headers={tabHeaders}
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
        />

        <Button
          onClick={tabButtonHandler[activeTabIndex]}
          className={clsx(
            LightButtonStyles,
            "flex items-center mb-6 md:mb-0 ml-auto"
          )}
        >
          <Add className="h-4 w-4 mr-4" />
          {tabButtonText[activeTabIndex]}
        </Button>
      </div>

      {tabComponents[tabHeaders[activeTabIndex]]}

      <AddUserModal
        show={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      />
      <CreateProjectModal
        show={showCreateProjectModal}
        onClose={() => setShowCreateProjectModal(false)}
      />
    </div>
  )
}
