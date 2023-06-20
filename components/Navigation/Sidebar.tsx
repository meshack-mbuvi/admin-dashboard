import RequestsIcon from "@/components/icons/Requests"
import SettingsIcon from "@/components/icons/Settings"

import NavLink from "./NavLink"

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-center fixed left-0 top-0 h-screen">
      <div className="flex flex-col space-y-14 justify-center mx-10 w-7">
        <NavLink path={"transactions"} page={"transactions"}>
          <RequestsIcon className="w-full" />
        </NavLink>

        <NavLink path={"settings"} page={"settings"}>
          <SettingsIcon className="w-full" />
        </NavLink>
      </div>
    </div>
  )
}
