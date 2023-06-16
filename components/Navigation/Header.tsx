import Link from "next/link"

import HelpIcon from "@/components/icons/Help"
import Logo from "@/components/icons/Logo"
import UserMenu from "@/components/Navigation/UserMenu"
import Breadcrumbs from "./Breadcrumbs"

const Help = () => {
  return (
    <div className="flex items-center space-x-2 w-fit py-2 px-4 text-gray-4">
      <HelpIcon className="w-4 text-gray-4" />
      <p className="text-base">Help</p>
    </div>
  )
}

export const Header = () => {
  return (
    <div className="flex py-7 mb-7 mx-10">
      <div className="mr-11 flex items-center">
        <Link
          href={{
            pathname: "/projects",
          }}
        >
          <Logo className="w-8" />
        </Link>
      </div>

      <div className="flex w-full justify-between">
        <Breadcrumbs />

        <div className="flex space-x-2">
          <Help />

          <UserMenu />
        </div>
      </div>
    </div>
  )
}

export default Header
