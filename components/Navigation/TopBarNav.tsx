"use client"

import RequestsIcon from "@/components/icons/Requests"
import SettingsIcon from "@/components/icons/Settings"
import ContractIcon from "../icons/Contract"
import WalletIcon from "../icons/Wallet"
import NavLink from "./NavLink"
import FileIcon from "../icons/File"

export default function TopBarNav() {
  const linkStyles = "text-sm rounded-full"
  return (
    <div className="flex space-x-4 p-1 border w-fit border-gray-6 rounded-full">
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

      <NavLink path="metadata" page="metadata" className={linkStyles}>
        <p className="flex space-x-2 px-6 py-2">
          <FileIcon className="w-4" />
          <span>Metadata</span>
        </p>
      </NavLink>

      <NavLink path="wallets" page="wallets" className={linkStyles}>
        <p className="flex space-x-2 px-6 py-2">
          <WalletIcon className="w-5" />
          <span>Wallets</span>
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
