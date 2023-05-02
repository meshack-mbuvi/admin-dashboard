import Image from "next/image"
import Link from "next/link"

import Logo from "../icons/Logo"
import chevronDown from "public/images/chevronDown.svg"
import helpIcon from "public/images/help.svg"
import userIcon from "public/images/user.svg"

const LabelWithDropdown = ({ text }: { text: string }) => {
  return (
    <div className="flex rounded-full space-x-2 font-normal bg-gray-8 w-fit py-2 px-4">
      <p className="text-base text-gray-2">{text}</p>
      <span className="flex">
        <Image width={16} height={16} src={chevronDown} alt="" />
      </span>
    </div>
  )
}

const Help = () => {
  return (
    <div className="flex items-center space-x-2 w-fit py-2 px-4 text-gray-4">
      <Image width={16} height={16} src={helpIcon} alt="help" />

      <p className="text-base">Help</p>
    </div>
  )
}

export const Header = () => {
  return (
    <div className="fixed top-0 flex w-full pt-7 mb-14">
      <div className="mx-7 top-0">
        <Link href="/projects">
          <Logo className="w-9 text-white" />
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
            <span className="flex">
              <Image width={12} height={12} src={userIcon} alt="" />
            </span>
            <p className="text-sm text-gray-2">Nathan</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
