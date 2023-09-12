"use client"
import clsx from "clsx"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import AddContractModal from "@/components/Contracts/AddContractModal"
import ProjectContracts from "@/components/Contracts/ProjectContracts"
import { DarkButtonStyles } from "@/components/Buttons"
import ArrowUpperRight from "@/components/icons/ArrowUpperRight"
import CreateContractButton from "@/components/Buttons/CreateContractButton"
import Section from "@/components/Section"
import EmptyState from "@/components/Shared/Empty"

import useGetProjectById from "@/hooks/useGetProjectById"
import { QueryParams } from "@/types/queryParams"
import { NetworkId } from "@/utils/network"
import getFirstOrString from "@/utils/getFirstOrString"
import Loading from "../Loading"

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
    <Section className="flex flex-col font-sans p-7 rounded-lg mr-10">
      <div className="flex justify-between items-center">
        <div className="text-2xl pl-7">Contracts</div>
        <CreateContractButton onClick={() => setShowAddContractModal(true)} />
      </div>
      <div className="text-sm text-gray-3 pl-7">
        {!isLoading && !Object.keys(networkContracts).length ? (
          "No contracts have been added to your project yet."
        ) : (
          <span>
            These contracts have been added to your project. Please add your
            wallets to them as an allowed operator.
          </span>
        )}
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
            <>
              <span>
                When contracts are added to your project, they&apos;ll appear
                here
              </span>
              <Link
                // TODO: ADD URL here
                href="https://docs.syndicate.io"
                target="_blank"
                className={clsx(
                  DarkButtonStyles,
                  "border-yellow-secondary flex items-baseline text-white mx-auto mt-8"
                )}
              >
                View Guide
                <ArrowUpperRight className="h-4 w-4 ml-2" />
              </Link>
            </>
          }
        />
      ) : (
        <div className="mt-5">
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
