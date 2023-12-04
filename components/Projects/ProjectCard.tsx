import { MouseEvent, useMemo } from "react"
import { cn } from "@/utils/cn"
import { Chain } from "viem"
import { useRouter } from "next/navigation"

import Section from "@/components/Section"
import ResourceID from "@/components/Shared/ResourceID"

import { Project } from "@/hooks/useGetProjects"
import useGetProjectTransactionStats from "@/hooks/useGetProjectTransactionStats"
import useGetProjectWallets from "@/hooks/useGetProjectWallets"

import { getNetwork } from "@/utils/network"
import NetworkIcon from "@/components/NetworkIcon"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard(props: ProjectCardProps) {
  const { project } = props

  const router = useRouter()

  const { data: stats } = useGetProjectTransactionStats({
    projectId: project.id,
  })

  const { data: wallets } = useGetProjectWallets({
    projectId: project.id,
  })

  const totalTransactions =
    (stats?.numberOfConfirmedTransactions ?? 0) +
    (stats?.numberOfSubmittedTransactions ?? 0) +
    (stats?.numberOfPendingTransactions ?? 0)

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
    router.push(`/projects/${project.id}/transactions`)
  }

  return (
    <Section
      className="flex flex-col p-4 cursor-pointer justify-between hover:bg-gray-8 hover:-translate-y-0.5 hover:border-gray-7 transition-all duration-200"
      onClick={handleProjectClick}
    >
      <div className="flex items-start mb-4">
        <ResourceID
          id={project.id}
          context="project"
          className="mr-2 self-center"
        />
        <p className="text-gray-1 mr-4">{project.name}</p>

        <span
          className={cn(
            "ml-auto text-xs border rounded-full px-1.5 py-0.5 ",
            project.environment === "production"
              ? "text-blue-1 border-blue-1"
              : "border-gray-4 text-gray-4"
          )}
        >
          {project.environment}
        </span>
      </div>

      <div className="flex justify-between gap-2">
        <div>
          <p className="text-xs text-gray-4 mb-1">TXs (24hrs)</p>
          <p className="text-gray-1">{totalTransactions}</p>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1"> Failed Reqs (24hrs)</p>
          <p className="text-gray-1">
            {stats?.numberOfFailedTransactions ?? 0}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-4 mb-1">Networks</p>
          <div className="flex gap-2">
            {networks?.map((network, i) => (
              <NetworkIcon key={i} networkId={network.id} className="w-5 " />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
