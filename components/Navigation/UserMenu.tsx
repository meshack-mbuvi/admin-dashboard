"use client"

import { useStytchB2BClient, useStytchMember } from "@stytch/nextjs/b2b"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ClickAwayListener from "react-click-away-listener"

import User from "@/components/icons/User"
import SwitchOrgModal from "@/components/Navigation/SwitchOrgModal"
import ArrowUpperRight from "@/components/icons/ArrowUpperRight"
import useGetUser from "@/hooks/useGetUser"
import CheckCircle from "@/components/icons/CheckCircle"
import useGetOrganization from "@/hooks/useGetOrganization"
import useGetOrganizations from "@/hooks/useGetOrganizations"

export default function UserMenu() {
  const { member } = useStytchMember()
  const stytchClient = useStytchB2BClient()
  const router = useRouter()
  const { data: organizationData } = useGetOrganization()
  const { data: user } = useGetUser()
  const { data: organizations } = useGetOrganizations()

  const [menuOpen, setMenuOpen] = useState(false)
  const [showOrgModal, setShowOrgModal] = useState(false)

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = async () => {
    handleToggleMenu()
    await stytchClient.session.revoke()
    router.push("/")
  }

  const handleOrgSwitch = () => {
    setShowOrgModal(true)
  }

  return (
    <div className="relative">
      <div
        className="flex space-x-2 rounded-full bg-gray-8 py-[10px] px-4 cursor-pointer select-none"
        onClick={handleToggleMenu}
      >
        <User className="w-3 text-gray-4" />
        <span className="text-xs md:text-sm hidden sm:flex items-center text-gray-2 whitespace-nowrap">
          {member?.name}
        </span>
      </div>

      {menuOpen && (
        <ClickAwayListener onClickAway={handleToggleMenu}>
          <div className="absolute z-40 right-0 translate-y-2 rounded-2xl bg-gray-8 border border-gray-7 px-4 py-4 w-96">
            <p className="text-xl mb-1">{member?.name}</p>
            <p className="text-gray-4 mb-4">{member?.email_address}</p>
            <div className="mb-4 text-blue-1 align-middle">
              {user?.is2FaEnabled ? (
                <div className="text-success flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />{" "}
                  <div className="leading-4 py-1">2FA enabled</div>
                </div>
              ) : (
                <Link
                  href={{
                    pathname: "/2fa",
                  }}
                  className="flex space-x-2 items-center"
                >
                  <div className="leading-4 py-1">Set up 2FA</div>
                  <ArrowUpperRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            {!!organizations?.length && organizations?.length > 1 && (
              <div className="mb-4 text-blue-1 align-middle">
                <button onClick={handleOrgSwitch}>Switch Organization</button>
              </div>
            )}
            <div className="flex space-x-4">
              <button
                className="w-full bg-gray-6 rounded-lg py-4 font-medium"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          </div>
        </ClickAwayListener>
      )}
      <SwitchOrgModal
        showModal={showOrgModal}
        onCloseModal={() => setShowOrgModal(false)}
        organizations={organizations}
        currentOrganizationId={organizationData?.organization.stytchId}
      />
    </div>
  )
}
