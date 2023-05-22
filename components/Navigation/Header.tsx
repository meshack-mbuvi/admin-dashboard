import Link from "next/link"

import HelpIcon from "@/components/icons/Help"
import Logo from "@/components/icons/Logo"
import NikeBrand from "@/components/icons/NikeBrand"
import User from "@/components/icons/User"
import { getNetworkIcon } from "@/components/icons/networkIcons"
import { formatAddress } from "@/utils/formatAddress"
import { useParams } from "next/navigation"

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
  return (
    <div className="fixed top-0 flex pb-7 w-full pt-7 mb-7">
      <div className="ml-10 mr-11 flex items-center">
        <Link
          href={{
            pathname: "/projects",
          }}
        >
          <Logo className="w-8" />
        </Link>
      </div>
      <div className="flex borders  w-full justify-between">
        <div className="flex space-x-6">
          <ul className="breadcrumb">
            <li>
              <div className="flex breadcrumb-level space-x-3 pt-[7px] pb-[6px] text-sm active capitalize">
                <span className="flex">
                  <NikeBrand className="w-7" />
                </span>
                <span className="flex text-center items-center">Nike</span>
              </div>
            </li>
            {contractAddress && (
              <li>
                <div className="flex items-center breadcrumb-level space-x-3 px-12 py-2 active capitalize">
                  <span className="">.Swoosh</span>
                  <span className="text-gray-3 text-sm flex items-baseline ordinal slashed-zero">
                    {formatAddress(contractAddress, 6, 4)}
                  </span>
                </div>
              </li>
            )}
          </ul>

          <div className="flex items-center">
            <span className="flex mr-2">{getNetworkIcon(137, "w-[14px]")}</span>
            <span className="p-0 uppercase font-mono text-xs text-gray-4">
              Polygon Mainnet
            </span>
          </div>
        </div>

        <div className="flex space-x-2 mr-24">
          <Help />
          <div className="flex space-x-2 rounded-full text-gray-2 bg-gray-8 w-fit py-[10px] px-4">
            <User className="w-3 text-gray-4" />

            <p className="text-sm text-gray-2">Nathan</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
