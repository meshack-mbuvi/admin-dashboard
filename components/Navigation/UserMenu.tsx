"use client"

import { useStytchMember } from "@stytch/nextjs/b2b"

import User from "../icons/User"

export default function UserMenu() {
  const { member } = useStytchMember()

  return (
    <div className="flex space-x-2 rounded-full bg-gray-8 w-fit py-[10px] px-4">
      <User className="w-3 text-gray-4" />
      <span className="text-sm flex items-center text-gray-2">
        {member?.name}
      </span>
    </div>
  )
}
