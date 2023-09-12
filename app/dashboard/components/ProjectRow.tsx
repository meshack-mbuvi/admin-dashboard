"use client"

import { MouseEvent, useMemo } from "react"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { Chain } from "viem"

import ArrowRight from "@/components/icons/ArrowRight"
import { Project } from "@/hooks/useGetProjects"
import useGetProjectWallets from "@/hooks/useGetProjectWallets"
import { getNetworkIcon } from "@/utils/getNetworkIcon"
import { getNetwork } from "@/utils/network"
import useGetProjectTransactionStats from "@/hooks/useGetProjectTransactionStats"
import ResourceID from "@/components/Shared/ResourceID"

interface ProjectRowProps {
  project: Project
}

const formatEnvironment = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const formatNetworks = (networks: Chain[]) => {
  switch (networks.length) {
    case 0:
      return ""
    case 1:
      return networks[0].name
    case 2:
      return `${networks[0].name}, ${networks[1].name}`
    default:
      return `${networks[0].name}, ${networks[1].name} +${
        networks.length - 2
      } more`
  }
}

export default function ProjectRow(props: ProjectRowProps) {
  const {
    project: { id: projectId, name, environment },
  } = props
  const router = useRouter()

  const { data: wallets } = useGetProjectWallets({
    projectId,
  })
  const { data: stats } = useGetProjectTransactionStats({ projectId })

  const networks = useMemo(() => {
    const networks = new Set<number>()
    wallets?.forEach((contract) => {
      networks.add(contract.chainId)
    })

    const networksArray = Array.from(networks)
      .map((n) => getNetwork(n))
      .filter((n) => n !== null) as Chain[]

    return networksArray.sort(function (a, b) {
      return a.id - b.id
    })
  }, [wallets])

  const handleProjectClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    router.push(`/dashboard/${projectId}/transactions`)
  }

  return (
    <div
      onClick={handleProjectClick}
      rel="noopener noreferrer"
      className="project-item group cursor-pointer px-8 transform rounded-lg transition ease-in-out hover:bg-gray-8 hover:-translate-y-1 drop-shadow-2xl"
    >
      <div className="flex w-full py-7 border-b border-gray-7 group-hover:border-transparent">
        <div className="flex justify-between w-1/3 text-left text-xl text-gray-1 pr-10 lg:pr-32 space-x-3">
          <span>{name}</span>
          <ResourceID id={projectId} />
        </div>
        <div
          className={clsx(
            environment === "production" ? "text-blue-1" : "text-gray-1",
            "w-1/6 text-left text-base"
          )}
        >
          {formatEnvironment(environment)}
        </div>
        <div className="w-1/6 text-left text-base text-gray-1 font-mono">
          {stats?.numberOfTransactions ?? 0}
        </div>
        <div className="w-1/6 text-left text-base text-gray-1 font-mono">
          {stats?.numberOfFailedTransactions ?? 0}
        </div>
        <div className="flex w-1/6 gap-2 text-left text-base text-gray-1 leading-5">
          {networks?.length > 0 && (
            <>
              {getNetworkIcon(networks[0].id, "w-5 h-5")}
              {formatNetworks(networks)}
            </>
          )}
        </div>

        <div className="flex flex-1 justify-between text-gray-2 space-x-4">
          <div className="flex text-gray-2 italic space-x-4 items-center opacity-0 group-hover:opacity-100 transition ease-in-out ml-auto">
            <ArrowRight className="w-5" />
          </div>
        </div>
      </div>
    </div>
  )
}
