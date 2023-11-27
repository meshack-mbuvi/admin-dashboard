"use client"

import useGetOrganization from "@/hooks/useGetOrganization"
import useGetProjectById from "@/hooks/useGetProjectById"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import Loading from "../Loading"
import getFirstOrString from "@/utils/getFirstOrString"
import { formatAddress } from "@/utils/formatAddress"
import CopyToClipboard from "../CopyToClipboard"

export default function Breadcrumbs() {
  const { projectId } = useParams()
  const projectIdString = getFirstOrString(projectId)
  const { data: organizationData, isLoading: isOrganizationDataLoading } =
    useGetOrganization()
  const { data: projectData, isLoading: isProjectDataLoading } =
    useGetProjectById({
      projectId: projectIdString,
    })

  return (
    <>
      <ul className="breadcrumb flex">
        <li className="cursor-pointer flex space-x-3 py-2 text-sm active pl-3 bg-gray-8 rounded-l-full">
          <Link href={{ pathname: "/projects" }} className="flex relative">
            {isOrganizationDataLoading ? (
              <Loading className="h-6 w-24" />
            ) : (
              <>
                {organizationData?.stytchInformation.organization_logo_url && (
                  <span className="relative h-6 w-6 my-auto hidden md:block">
                    <Image
                      src={
                        organizationData?.stytchInformation
                          .organization_logo_url
                      }
                      alt="Organization Logo"
                      width={24}
                      height={24}
                    />
                  </span>
                )}

                <span className="flex text-center uppercase items-center font-sans font-bold text-gray-2 text-xs md:text-sm pl-2">
                  {organizationData?.organization.name}
                </span>
              </>
            )}
          </Link>
        </li>

        {projectId && (
          <li className="flex items-center pl-10 py-2.5 active text-xs md:text-base bg-gray-8 text-gray-2">
            <Link
              href={{ pathname: `/projects/${projectId}/transactions` }}
              className="whitespace-nowrap"
            >
              {isProjectDataLoading ? (
                <Loading className="h-6 w-24" />
              ) : (
                projectData?.name
              )}
            </Link>
          </li>
        )}
      </ul>
      <div className="bg-gray-8 rounded-r-full flex h-full min-w-[24px]">
        {projectData?.id && (
          <CopyToClipboard
            text={projectData?.id}
            copyId={"t-project-id"}
            tooltipCopyText="Copy project ID"
            tooltipCopiedText="Copied"
            tooltipPosition="right"
            className="self-stretch hidden sm:flex items-center px-4"
          >
            <div className="text-gray-3 text-xs md:text-sm font-mono whitespace-nowrap">
              {formatAddress(projectData?.id, 4, 4)}
            </div>
          </CopyToClipboard>
        )}
      </div>
    </>
  )
}
