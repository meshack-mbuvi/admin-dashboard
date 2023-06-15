"use client"

import { MouseEvent } from "react"
import { useRouter } from "next/navigation"

import ArrowRight from "@/components/icons/ArrowRight"

interface ProjectRowProps {
  name: string
  projectId: string
}

export default function ProjectRow(props: ProjectRowProps) {
  const { name, projectId } = props
  const router = useRouter()

  const handleProjectClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    router.push(`/projects/${projectId}`)
  }

  return (
    <div
      onClick={handleProjectClick}
      rel="noopener noreferrer"
      className="project-item group cursor-pointer px-8 transform rounded-lg transition ease-in-out hover:bg-gray-8 hover:-translate-y-1 drop-shadow-2xl"
    >
      <div className="flex w-full py-7 border-b border-gray-7 group-hover:border-transparent">
        <div className="w-1/4 text-left text-xl text-gray-1">{name}</div>

        <div className="flex flex-1 justify-between text-gray-2 space-x-4">
          <div className="flex text-gray-2 italic space-x-4 items-center opacity-0 group-hover:opacity-100 transition ease-in-out ml-auto">
            <ArrowRight className="w-5" />
          </div>
        </div>
      </div>
    </div>
  )
}
