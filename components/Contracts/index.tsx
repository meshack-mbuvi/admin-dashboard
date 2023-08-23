"use client"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import AddContractModal from "@/components/Contracts/AddContractModal"
import ProjectContracts from "@/components/Contracts/ProjectContracts"

import useGetProjectById from "@/hooks/useGetProjectById"
import { QueryParams } from "@/types/queryParams"
import { NetworkId } from "@/utils/getNetwork"
import CreateContractButton from "../Buttons/CreateContractButton"
import Section from "../Section"
import EmptyState from "../Shared/Empty"

export default function Contracts() {
  const [showAddContractModal, setShowAddContractModal] =
    useState<boolean>(false)
  const search = useSearchParams()
  const showAddContractModalInitial = search.get(
    QueryParams.ShowNewContractModal
  )

  // HACK: show animation on intial load
  // issue below for a better fix using `appear` on the modal Transition
  // https://github.com/tailwindlabs/headlessui/issues/2526
  useEffect(() => {
    if (showAddContractModalInitial === "true") {
      setShowAddContractModal(true)
    }
  }, [])
  const { projectId } = useParams()
  const { data: projectData } = useGetProjectById({
    projectId,
  })

  const NetworkContracts = useMemo(() => {
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
    <Section className="flex flex-col font-sans p-7 rounded-lg mr-10">
      <div className="flex justify-between items-center">
        <div className="text-2xl pl-7">Contracts</div>
        <CreateContractButton onClick={() => setShowAddContractModal(true)} />
      </div>
      <div className="text-sm text-gray-3 pl-7">
        {!Object.keys(NetworkContracts).length ? (
          "No contracts have been added to your project yet."
        ) : (
          <span>
            These contracts have been added to your project. Please add your
            wallets to them as an allowed operator.
          </span>
        )}
      </div>
      {!Object.keys(NetworkContracts).length ? (
        <EmptyState
          heading={"No contracts yet"}
          description={
            <span>
              {"When contracts are added to your project, they'll appear here"}
            </span>
          }
        />
      ) : (
        <div className="mt-5">
          {Object.keys(NetworkContracts).map((key, index) => {
            return (
              <ProjectContracts
                key={index}
                networkId={+key as NetworkId}
                contracts={NetworkContracts[key]}
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
