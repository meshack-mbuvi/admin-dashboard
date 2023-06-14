"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

import ProjectRow from "./components/ProjectRow"

import useGetProjects from "@/hooks/useGetProjects"
import { NetworkId } from "@/utils/getNetwork"

interface Project {
  name: string
  coreContract: string
  networkId: NetworkId
}

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  // Projects data accessed here
  const { data } = useGetProjects()

  const projects: Project[] = [
    {
      name: ".Swoosh",
      coreContract: "0x388C818CA8B9251b393131C08a736A67ccB19297",
      networkId: 1,
    },
    {
      name: "Nike",
      coreContract: "0x388C818CA8B9251b393131C08a736A67ccB19297",
      networkId: 137,
    },
    {
      name: "Project 3",
      coreContract: "0x388C818CA8B9251b393131C08a736A67ccB19297",
      networkId: 137,
    },
  ]

  return (
    <div className="flex flex-col space-y-8">
      <div className="text-2xl text-gray-1 ml-28 pl-1">Projects</div>
      <div className="flex flex-col space-y-7 ml-28">
        {/* Header */}
        <div className="w-full flex -ml-7 px-8">
          <div className="w-1/4 text-left italic text-sm text-gray-4">Name</div>
          <div className="w-1/2 text-left italic text-sm text-gray-4">
            Core contract
          </div>
          <div className="text-left italic text-sm text-gray-4">Network</div>
        </div>

        {/* Project list */}
        <div className="w-full -ml-7 flex flex-col">
          {projects.map(({ coreContract, name, networkId }, index) => (
            <ProjectRow
              key={index}
              index={index}
              coreContract={coreContract}
              name={name}
              networkId={networkId}
              onHover={(index) => setHoveredProject(index)}
              isHovered={hoveredProject === index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
