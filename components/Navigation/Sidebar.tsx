"use client"
import { Tooltip } from "react-tooltip"

import RequestsIcon from "@/components/icons/Requests"
import SettingsIcon from "@/components/icons/Settings"
import NavLink from "./NavLink"

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-center fixed left-0 top-0 h-screen">
      <div className="flex flex-col space-y-14 justify-center mx-10 w-7">
        <NavLink path={"transactions"} page={"transactions"}>
          <span
            data-tooltip-id={`t-tx`}
            data-tooltip-content="Transactions"
            data-tooltip-place="bottom"
          >
            <RequestsIcon className="w-full" />
            <Tooltip
              id={`t-tx`}
              className="drop-shadow-2xl opacity-100"
              style={{
                marginLeft: "8px",
                padding: "8px",
              }}
            />
          </span>
        </NavLink>
        <NavLink 
          path="settings/general"
          page={"settings"}
        >
          <span
            data-tooltip-id={`t-settings`}
            data-tooltip-content="settings"
            data-tooltip-place="bottom"
          >
            <SettingsIcon className="w-full" />
            <Tooltip
              id={`t-settings`}
              className=""
              style={{
                marginLeft: "8px",
                padding: "8px",
              }}
            />
          </span>
        </NavLink>
      </div>
    </div>
  )
}
