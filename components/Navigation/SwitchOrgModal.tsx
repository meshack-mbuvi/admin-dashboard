import React, { useState } from "react"
import { DiscoveredOrganization } from "@stytch/vanilla-js"
import { useStytchB2BClient } from "@stytch/nextjs/b2b"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"

import Spinner from "@/components/icons/Spinner"
import Modal from "@/components/Modal"

interface SwitchOrgModalProps {
  organizations?: DiscoveredOrganization[]
  onCloseModal: () => void
  showModal: boolean
  currentOrganizationId: string | undefined
}

const SwitchOrgModal: React.FC<SwitchOrgModalProps> = ({
  organizations,
  onCloseModal,
  showModal,
  currentOrganizationId,
}) => {
  const stytch = useStytchB2BClient()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [loading, setLoading] = useState(false)
  const exchange = async (organizationId: string) => {
    setLoading(true)
    await stytch.session.exchange({
      organization_id: organizationId,
      session_duration_minutes: 720,
    })

    queryClient.removeQueries()
    router.push("/")
  }

  return (
    <Modal
      show={showModal}
      closeModal={onCloseModal}
      outsideOnClick={true}
      overflowYScroll
    >
      <div className="relative">
        {loading && (
          <div className="absolute h-full w-full flex items-center justify-center  text-blue-neptune">
            <Spinner className="w-24 animate-spin" />
          </div>
        )}
        <div className="text-2xl font-medium mb-5 text-center">
          Select Organization
        </div>
        <div className="flex flex-col items-center my-5 pt-5">
          {organizations?.map((org, index) => {
            return currentOrganizationId !==
              org.organization.organization_id ? (
              <button
                className="font-normal text-lg border border-gray-6 w-80 rounded-md px-4 py-2 hover:bg-gray-6 mb-4"
                key={index}
                onClick={() => exchange(org.organization.organization_id)}
              >
                {org.organization.organization_name}
              </button>
            ) : (
              <button
                className="font-normal text-lg border border-gray-6 w-80 rounded-md px-4 py-2 bg-gray-6 mb-4"
                key={index}
                disabled
              >
                {org.organization.organization_name}
              </button>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}

export default SwitchOrgModal
