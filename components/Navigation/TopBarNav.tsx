"use client"

import RequestsIcon from "@/components/icons/Requests"
import SettingsIcon from "@/components/icons/Settings"
import ContractIcon from "@/components/icons/Contract"
import WalletIcon from "@/components/icons/Wallet"
import NavLink from "./NavLink"
import MetadataIcon from "../icons/Metadata"

export default function TopBarNav() {
  const linkStyles = "text-sm rounded-full flex items-center"
  return (
    <div className="lg:flex lg:space-x-4 lg:p-1 lg:border w-fit lg:border-gray-6 lg:rounded-full">
      <NavLink path="transactions" page="transactions" className={linkStyles}>
        <p className="flex space-x-2 px-6 py-2">
          <RequestsIcon className="w-5" />
          <span>Transactions</span>
        </p>
      </NavLink>

      <NavLink path="contracts" page="contracts" className={linkStyles}>
        <p className="flex space-x-2 px-6 py-2">
          <ContractIcon className="w-5" />
          <span>Contracts</span>
        </p>
      </NavLink>

      <NavLink path="wallets" page="wallets" className={linkStyles}>
        <p className="flex space-x-2 px-6 py-2">
          <WalletIcon className="w-5" />
          <span>Wallets & Gas</span>
        </p>
      </NavLink>

      <NavLink path="metadata" page="metadata" className={linkStyles}>
        <p className="flex space-x-2 px-6 py-2">
          <MetadataIcon className="w-5" />
          <span>Metadata</span>
        </p>
      </NavLink>

      <NavLink path="settings/general" page="settings" className={linkStyles}>
        <p className="flex space-x-2 px-6 py-2">
          <SettingsIcon className="w-4" />
          <span>Settings</span>
        </p>
      </NavLink>
    </div>
  )
}
