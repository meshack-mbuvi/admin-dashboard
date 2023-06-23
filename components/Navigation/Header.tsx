import Link from "next/link"

import UserMenu from "@/components/Navigation/UserMenu"
import Logo from "@/components/icons/Logo"
import Breadcrumbs from "./Breadcrumbs"

export const Header = () => {
  return (
    <div className="flex py-7 mb-7 mx-10 bg-black z-50">
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
          <UserMenu />
        </div>
      </div>
    </div>
  )
}

export default Header
