"use client"

import { useStytchMember } from "@stytch/nextjs/b2b"
import { useState } from "react"

import User from "../icons/User"

export default function UserMenu() {
  const { member } = useStytchMember()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <div
        className="flex space-x-2 rounded-full bg-gray-8 w-fit py-[10px] px-4"
        onClick={handleToggleMenu}
      >
        <User className="w-3 text-gray-4" />
        <span className="text-sm flex items-center text-gray-2">
          {member?.name}
        </span>
      </div>

      <div className="rounded-2xl bg-gray-8 border-1 border-gray-7 px-4 py-4"></div>
    </>
  )
}
