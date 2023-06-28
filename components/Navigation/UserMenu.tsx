"use client"

import { useState } from "react"
import { useStytchB2BClient, useStytchMember } from "@stytch/nextjs/b2b"
import ClickAwayListener from "react-click-away-listener"
import { useRouter } from "next/navigation"

import User from "../icons/User"

export default function UserMenu() {
  const { member } = useStytchMember()
  const stytchClient = useStytchB2BClient()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = async () => {
    await stytchClient.session.revoke()
    router.push("/")
  }

  return (
    <div className="relative">
      <div
        className="flex space-x-2 rounded-full bg-gray-8 w-fit py-[10px] px-4 cursor-pointer select-none"
        onClick={handleToggleMenu}
      >
        <User className="w-3 text-gray-4" />
        <span className="text-sm flex items-center text-gray-2">
          {member?.name}
        </span>
      </div>

      {menuOpen && (
        <ClickAwayListener onClickAway={handleToggleMenu}>
          <div className="absolute z-40 right-0 translate-y-2 rounded-2xl bg-gray-8 border border-gray-7 px-4 py-4 w-96">
            <p className="text-xl mb-1">{member?.name}</p>
            <p className="text-gray-4 mb-4">{member?.email_address}</p>
            <button
              className="w-full bg-gray-6 rounded-lg py-4 font-medium"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </ClickAwayListener>
      )}
    </div>
  )
}
