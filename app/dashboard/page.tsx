"use client"

import AddUserModal from "@/components/AddUserModal"
import CreateProjectModal from "@/components/CreateProjectModal"
import Button, { LightButtonStyles } from "@/components/Buttons"
import Projects from "@/components/Projects"
import { Tab } from "@/components/Tab"
import Users from "@/components/Users"
import Add from "@/components/icons/Add"
import clsx from "clsx"
import { useState } from "react"

export default function Dashboard() {
  const tabHeaders = ["Projects", "People"]
  const tabButtonText = ["Create project", "Invite user"]

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    Projects: <Projects />,
    People: <Users />,
  }

  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false)

  const handleAddUserModal = () => {
    setShowAddUserModal(true)
  }
  const handleCloseAddUserModal = () => {
    setShowAddUserModal(false)
  }

  const handleOpenCreateProjectModal = () => {
    setShowCreateProjectModal(true)
  }
  const handleCloseCreateProjectModal = () => {
    setShowCreateProjectModal(false)
  }

  const tabButtonHandler = [handleOpenCreateProjectModal, handleAddUserModal]

  return (
    <div className="flex flex-col">
      <div className="flex ml-2 justify-between">
        <Tab
          headers={tabHeaders}
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
        />

        <Button
          onClick={tabButtonHandler[activeTabIndex]}
          className={clsx(LightButtonStyles, "flex items-center")}
        >
          <Add className="h-4 w-4 mr-4" />
          {tabButtonText[activeTabIndex]}
        </Button>

        <AddUserModal
          show={showAddUserModal}
          onClose={handleCloseAddUserModal}
        />
        <CreateProjectModal
          show={showCreateProjectModal}
          onClose={handleCloseCreateProjectModal}
        />
      </div>
      <div className="ml-2">{tabComponents[tabHeaders[activeTabIndex]]}</div>
    </div>
  )
}
