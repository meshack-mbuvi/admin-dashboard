import Image from "next/image"

import fileIcon from "@/public/images/file.svg"
import settingsIcon from "@/public/images/settings.svg"
import NavLink from "./NavLink"

export default function Sidebar() {
  return (
    <div className="flex flex-col relative justify-center">
      <div className="flex flex-col space-y-8 justify-center w-6 h-fit mx-8">
        <NavLink path="" page={null}>
          <Image width={25} height={23} src={fileIcon} alt="" />
        </NavLink>

        <NavLink path="/settings" page="settings">
          <Image width={25} height={23} src={settingsIcon} alt="" />
        </NavLink>
      </div>
    </div>
  )
}
