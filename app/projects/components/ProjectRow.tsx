"use client"

import { MouseEvent } from "react"
import { useRouter } from "next/navigation"

import CopyComponent from "@/components/CopyToClipboard"
import ArrowRight from "@/components/icons/ArrowRight"

import { NetworkId, getNetwork } from "@/utils/getNetwork"
import { getNetworkIcon } from "@/utils/getNetworkIcon"

interface ProjectRowProps {
  networkId: NetworkId
  coreContract: string
  name: string
  index: number
  onHover: (index: number | null) => void
  isHovered: boolean
}

export default function ProjectRow(props: ProjectRowProps) {
  const { networkId, coreContract, name, index, onHover, isHovered } = props
  const router = useRouter()

  const handleProjectClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    router.push(`/projects/${coreContract}`)
  }

  const handleBlockExplorerClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    window.open(
      `${
        getNetwork(networkId).blockExplorers?.default.url
      }/address/${coreContract}`,
      "_blank"
    )
  }

  return (
    <div
      onClick={handleProjectClick}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      rel="noopener noreferrer"
      className="project-item cursor-pointer px-8"
    >
      <div className="flex w-full border-gray-7">
        <div className="w-1/4 text-left text-xl text-gray-1">{name}</div>
        <div className="flex w-1/2 text-left slashed-zero items-center">
          <span className="text-gray-4">0x</span>
          <span className="text-gray-2">{coreContract.slice(2)}</span>
          <div className="flex space-x-4 justify-between ml-6 items-center">
            {isHovered && (
              <>
                <CopyComponent text={coreContract} />
                <button onClick={handleBlockExplorerClick}>
                  <div>{getNetworkIcon(networkId, "w-5 h-5")}</div>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-1 justify-between text-gray-2 space-x-4">
          <div className="flex items-center">
            <span className="flex mr-2">
              <div>{getNetworkIcon(networkId, "w-5")}</div>
            </span>
            <span className="italic">{getNetwork(networkId).name}</span>
          </div>
          {isHovered && (
            <div className="flex text-right text-gray-2 italic space-x-4 items-center">
              <span className="flex">
                <ArrowRight className="w-5" />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
