import Link from "next/link"

import Logo from "@/components/icons/Logo"
import ChevronDown from "@/components/icons/ChevronDown"
import HelpIcon from "@/components/icons/Help"
import User from "@/components/icons/User"

const LabelWithDropdown = ({ text }: { text: string }) => {
  return (
    <div className="flex rounded-full space-x-2 font-normal bg-gray-8 w-fit py-2 px-4">
      <p className="text-base text-gray-2">{text}</p>
      <span className="flex">
        <ChevronDown className="w-4 text-gray-4" />
      </span>
    </div>
  )
}

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
    <div className="fixed top-0 flex w-full pt-7 mb-14">
      <div className="mx-7 top-0">
        <Link href="/projects">
          <Logo className="w-9" />
        </Link>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex space-x-4">
          <LabelWithDropdown text="Nike" />
          <LabelWithDropdown text=".swoosh" />
        </div>
        <div className="flex space-x-2 mr-24">
          <Help />
          <div className="flex space-x-2 rounded-full text-gray-2 bg-gray-8 w-fit py-3 px-4">
            <User className="w-3 text-gray-4" />

            <p className="text-sm text-gray-2">Nathan</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
