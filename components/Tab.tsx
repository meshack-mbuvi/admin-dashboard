"use client"
import clsx from "clsx"
import { useState } from "react"

export type TabProps = {
  [key: string]: {
    header: string
    content: JSX.Element | any
  }
}
/**
 * Renders tab headers and content for the active header
 * @param tabs
 * @returns
 */
export const Tab = (props: { tabs: TabProps }) => {
  const { tabs } = props
  const tabKeys = Object.keys(tabs)
  const [activeTab, setActiveTab] = useState(tabKeys[0])

  return (
    <div className="flex flex-col w-full h-screens">
      <div className="flex space-x-10 w-full mt-2 mb-12">
        {tabKeys.map((key) => {
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={clsx(
                "w-fit pb-1",
                key === activeTab
                  ? "border-b text-gray-1 border-gray-1"
                  : "text-gray-5 "
              )}
            >
              {tabs[`${key}`].header}
            </button>
          )
        })}
      </div>
      <div className="w-full">
        <div>{tabs[activeTab].content}</div>
      </div>
    </div>
  )
}
