import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useStytchMember } from "@stytch/nextjs/b2b"

import HelpIcon from "@/components/icons/Help"
import Logo from "@/components/icons/Logo"
import NikeBrand from "@/components/icons/NikeBrand"
import User from "@/components/icons/User"

const Help = () => {
  return (
    <div className="flex items-center space-x-2 w-fit py-2 px-4 text-gray-4">
      <HelpIcon className="w-4 text-gray-4" />
      <p className="text-base">Help</p>
    </div>
  )
}

export const Header = () => {
  const { contractAddress } = useParams()
  const { member } = useStytchMember()
  const router = useRouter()

  const handleProjectsNav = () => {
    router.push("/projects")
  }

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
        <ul className="breadcrumb flex">
          <li
            onClick={handleProjectsNav}
            className="cursor-pointer flex space-x-3 py-2 text-sm active pl-3 bg-gray-8 rounded-l-full"
          >
            <NikeBrand className="w-7" />
            <span className="flex text-center items-center text-gray-2">
              Nike
            </span>
          </li>

          {contractAddress && (
            <li className="flex items-center space-x-3 pl-10 py-2.5 active text-sm bg-gray-8 text-gray-2">
              .Swoosh
            </li>
          )}
        </ul>

        <div className="flex space-x-2">
          <Help />

          <div className="flex space-x-2 rounded-full bg-gray-8 w-fit py-[10px] px-4">
            <User className="w-3 text-gray-4" />
            <span className="text-sm flex items-center text-gray-2">
              {member?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
