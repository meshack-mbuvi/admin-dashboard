import Image from "next/image"
import Link from "next/link"
import chevronDown from "public/images/chevronDown.svg"
import helpIcon from "public/images/help.svg"
import logo from "public/images/logo.svg"
import userIcon from "public/images/user.svg"
import { B2, B3 } from "../Typography"

const LabelWithDropdown = ({ text }: { text: string }) => {
  return (
    <div className="flex rounded-full space-x-2 font-normal  bg-gray-8 w-fit py-2 px-4">
      <B2 extraClasses="text-gray-2">{text}</B2>
      <span className="flex">
        <Image width={16} height={16} src={chevronDown} alt="" />
      </span>{" "}
    </div>
  )
}

const Help = () => {
  return (
    <div className="flex space-x-2 font-Slussen w-fit py-2 px-4 text-gray-4">
      <span className="flex">
        <Image width={16} height={16} src={helpIcon} alt="" />
      </span>
      <B2>Help</B2>
    </div>
  )
}

export default function Header() {
  return (
    <div className="fixed top-0 flex w-full py-7">
      <div className="mx-7 top-0">
        <Link href="/">
          <Image width={35} height={35} src={logo} alt="" />
        </Link>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex space-x-4">
          <LabelWithDropdown text="Nike" />
          <LabelWithDropdown text=".swoosh" />
        </div>
        <div className="flex space-x-2 mr-24">
          <Help />
          <div
            className={`flex space-x-2 rounded-full text-gray-2 bg-gray-8 w-fit py-3 px-4`}
          >
            <span className="flex">
              <Image width={12} height={12} src={userIcon} alt="" />
            </span>
            <B3 extraClasses="text-gray-2">Nathan</B3>
          </div>
        </div>
      </div>
    </div>
  )
}
