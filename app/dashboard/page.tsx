"use client"

import clsx from "clsx"
import { useState } from "react"

import AddUserModal from "@/components/AddUserModal"
import Button, { LightButtonStyles } from "@/components/Buttons"
import CreateProjectModal from "@/components/CreateProjectModal"
import Projects from "@/components/Projects"
import UpgradeRequiredModal from "@/components/Shared/UpgradeRequiredModal"
import { Tab } from "@/components/Tab"
import Users from "@/components/Users"
import Add from "@/components/icons/Add"
import useGetProjects from "@/hooks/useGetProjects"
import useTestUser from "@/hooks/useTestUser"

export default function Dashboard() {
  const tabHeaders = ["Projects", "People"]
  const tabButtonText = ["Create project", "Invite user"]

  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false)
  const [showLimitedAccessModal, setShowLimitedAccessModal] = useState(false)
  const isTestUser = useTestUser()
  const { data } = useGetProjects()

  const tabComponents: {
    [key: string]: JSX.Element
  } = {
    Projects: <Projects onCreateProject={setShowCreateProjectModal} />,
    People: <Users />,
  }

  const tabButtonHandler = [
    () => {
      // DEV: we only show upgrade modal for a test user who has at least one project
      if (isTestUser && data?.length) {
        setShowLimitedAccessModal(true)
        return
      }
      setShowCreateProjectModal(true)
    },
    () => {
      if (isTestUser && data?.length) {
        setShowLimitedAccessModal(true)
        return
      }
      setShowAddUserModal(true)
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
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
          onClose={() => setShowAddUserModal(false)}
        />
        <CreateProjectModal
          show={showCreateProjectModal}
          onClose={() => setShowCreateProjectModal(false)}
        />

        <UpgradeRequiredModal
          show={showLimitedAccessModal}
          handleClose={() => setShowLimitedAccessModal(false)}
        />
      </div>
      <div className="ml-2">{tabComponents[tabHeaders[activeTabIndex]]}</div>
    </div>
  )
}
