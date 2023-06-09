"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import CopyComponent from "@/components/CopyToClipboard"
import ArrowRight from "@/components/icons/ArrowRight"
import { getNetworkIcon } from "@/utils/getNetworkIcon"
import { getNetwork } from "@/utils/getNetwork"
import useGetProjects from "@/hooks/useGetProjects"
import { useStytchB2BClient } from "@stytch/nextjs/b2b"

interface Project {
  name: string
  coreContract: string
  chainId: 1 | 137 | 5
}

export default function Projects() {
  const pathname = usePathname()
  const stytch = useStytchB2BClient()
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  
  const sessionTokens = useMemo(() => {
    return stytch.session.getTokens();
  }, [stytch.session]);

  // Projects data accessed here
  const { data } = useGetProjects({ sessionToken: sessionTokens?.session_token })

  const projects: Project[] = [
    {
      name: ".Swoosh",
      coreContract: "0x388C818CA8B9251b393131C08a736A67ccB19297",
      chainId: 1,
    },
    {
      name: "Nike",
      coreContract: "0x388C818CA8B9251b393131C08a736A67ccB19297",
      chainId: 137,
    },
    {
      name: "Project 3",
      coreContract: "0x388C818CA8B9251b393131C08a736A67ccB19297",
      chainId: 137,
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
          {projects.map(({ coreContract, name, chainId }, index) => (
            <a
              href={`${pathname}/${coreContract}`}
              key={index}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              rel="noopener noreferrer"
              className="project-item cursor-pointer px-8"
            >
              <div className="flex w-full border-gray-7">
                <div className="w-1/4 text-left text-xl text-gray-1">
                  {name}
                </div>
                <div className="flex w-1/2 text-left slashed-zero items-center">
                  <span className="text-gray-4">0x</span>
                  <span className="text-gray-2">{coreContract.slice(2)}</span>
                  <div className="flex space-x-4 justify-between ml-6 items-center">
                    {hoveredProject === index && (
                      <>
                        <CopyComponent text={coreContract} />
                        <Link
                          href={{
                            pathname: `${
                              getNetwork(chainId).blockExplorers?.default.url
                            }/address/${coreContract}`,
                          }}
                          target="_blank"
                        >
                          <div>{getNetworkIcon(chainId, "w-5 h-5")}</div>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-1 justify-between text-gray-2 space-x-4">
                  <div className="flex items-center">
                    <span className="flex mr-2">
                      <div>{getNetworkIcon(chainId, "w-5")}</div>
                    </span>
                    <span className="italic">{getNetwork(chainId).name}</span>
                  </div>
                  {hoveredProject === index && (
                    <div className="flex text-right text-gray-2 italic space-x-4 items-center">
                      <span className="flex">
                        <Link
                          href={{
                            pathname: `${pathname}/${coreContract}`,
                          }}
                        >
                          <ArrowRight className="w-5" />
                        </Link>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
