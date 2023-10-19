"use client"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import AddContractModal from "@/components/Contracts/AddContractModal"
import ProjectContracts from "@/components/Contracts/ProjectContracts"
import Section from "@/components/Section"
import EmptyState from "@/components/Shared/Empty"

import Text from "@/components/Text"
import useFreePlan from "@/hooks/useFreePlan"
import useGetProjectById from "@/hooks/useGetProjectById"
import { QueryParams } from "@/types/queryParams"
import getFirstOrString from "@/utils/getFirstOrString"
import { NetworkId } from "@/utils/network"
import CreateContractButton from "../Buttons/CreateContractButton"
import Loading from "../Loading"
import PremiumPill from "../Shared/PremiumPill"

export default function Contracts() {
  const [showAddContractModal, setShowAddContractModal] =
    useState<boolean>(false)
  const search = useSearchParams()
  const showAddContractModalInitial = search.get(
    QueryParams.ShowNewContractModal
  )

  const isFreePlan = useFreePlan()

  // HACK: show animation on intial load
  // issue below for a better fix using `appear` on the modal Transition
  // https://github.com/tailwindlabs/headlessui/issues/2526
  useEffect(() => {
    if (showAddContractModalInitial === "true") {
      setShowAddContractModal(true)
    }
    // Only call on initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { projectId } = useParams()
  const { data: projectData, isLoading } = useGetProjectById({
    projectId: getFirstOrString(projectId),
  })

  const networkContracts = useMemo(() => {
    const networkContracts: any = {}
    projectData?.contracts?.forEach((contract) => {
      if (!networkContracts[contract.chainId]) {
        networkContracts[contract.chainId] = []
      }
      networkContracts[contract.chainId].push(contract)
    })
    return networkContracts
  }, [projectData?.contracts])

  return (
    <Section className="flex flex-col p-10 rounded-lg mr-10">
      <Text className="text-2xl pb-2">Contracts</Text>

      <div className="flex flex-row pb-7 items-baseline justify-between">
        <p className="font-small text-gray-3 text-sm pr-2 max-w-prose">
          {!isLoading && !Object.keys(networkContracts).length
            ? "No contracts have been added to your project yet."
            : "These contracts have been added to your project. Please add your wallets to them as an allowed operator."}
        </p>

        <div className="flex space-x-7 items-center">
          {isFreePlan && <PremiumPill />}

          <CreateContractButton onClick={() => setShowAddContractModal(true)} />
        </div>
      </div>

      {isLoading && (
        <div className="px-7 mt-6">
          <Loading className="h-8 my-4" />
          <Loading className="h-8 my-4" />
          <Loading className="h-8" />
        </div>
      )}
      {!isLoading && !Object.keys(networkContracts).length ? (
        <EmptyState
          heading={"No contracts yet"}
          description={
            <span>
              When contracts are added to your project, they&apos;ll appear here
            </span>
          }
        />
      ) : (
        <div>
          {Object.keys(networkContracts).map((key, index) => {
            return (
              <ProjectContracts
                key={index}
                networkId={Number(key) as NetworkId}
                contracts={networkContracts[key]}
              />
            )
          })}
        </div>
      )}
      <AddContractModal
        show={showAddContractModal}
        closeModal={() => setShowAddContractModal(false)}
      />
    </Section>
  )
}
