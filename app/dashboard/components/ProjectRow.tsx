"use client"

import { MouseEvent, useMemo } from "react"
import { useRouter } from "next/navigation"
import clsx from "clsx"

import ArrowRight from "@/components/icons/ArrowRight"
import { Project } from "@/hooks/useGetProjects"
import useGetProjectWallets from "@/hooks/useGetProjectWallets"
import { getNetworkIcon } from "@/utils/getNetworkIcon"
import { NetworkId, getNetwork } from "@/utils/getNetwork"
import useGetProjectTransactionStats from "@/hooks/useGetProjectTransactionStats"

interface ProjectRowProps {
  project: Project
}

const formatEnvironment = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const formatNetworks = (networks: number[]) => {
  switch (networks.length) {
    case 0:
      return ""
    case 1:
      return getNetwork(networks[0] as NetworkId).name
    case 2:
      return `${getNetwork(networks[0] as NetworkId).name}, ${
        getNetwork(networks[1] as NetworkId).name
      }`
    default:
      return `${getNetwork(networks[0] as NetworkId).name}, ${
        getNetwork(networks[1] as NetworkId).name
      } +${networks.length - 2} more`
  }
}

const formatStat = (stat: number | undefined): string => {
  return !!stat ? stat.toLocaleString() : "None"
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
    return Array.from(networks).sort(function (a, b) {
      return a - b
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
        <div className="w-1/5 text-left text-xl text-gray-1">{name}</div>
        <div
          className={clsx(
            environment === "production" ? "text-blue-1" : "text-gray-1",
            "w-1/5 text-left text-base"
          )}
        >
          {formatEnvironment(environment)}
        </div>
        <div className="w-1/5 text-left text-base text-gray-1">
          {formatStat(stats?.numberOfTransactions)}
        </div>
        <div className="w-1/5 text-left text-base text-gray-1">
          {formatStat(stats?.numberOfFailedTransactions)}
        </div>
        <div className="flex gap-2 w-1/5 text-left text-base text-gray-1 leading-5">
          {getNetworkIcon(networks[0], "w-5 h-5")}
          {formatNetworks(networks)}
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
