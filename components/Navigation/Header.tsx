import UserMenu from "@/components/Navigation/UserMenu"
import FreePlanBadge from "@/components/Navigation/FreePlanBadge"
import Breadcrumbs from "@/components/Navigation//Breadcrumbs"
import Logo from "@/components/icons/Logo"
import Docs from "@/components/icons/Docs"

export const Header = () => {
  return (
    <div className="flex py-7 mb-7 mx-10 bg-black z-50">
      <div className="mr-11 flex items-center">
        <Logo className="w-8" />
      </div>

      <div className="flex items-center w-full">
        <Breadcrumbs />

        <FreePlanBadge />

        <div className="flex space-x-2 ml-auto">
          <a
            href="https://docs.syndicate.io"
            target="_blank"
            className="flex items-center text-sm text-gray-4 mr-8"
          >
            <Docs className="w-4 mr-2" />
            Documentation
          </a>
          <UserMenu />
        </div>
      </div>
    </div>
  )
}

export default Header
