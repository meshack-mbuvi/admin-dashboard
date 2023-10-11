"use client"

import useGetOrganization from "@/hooks/useGetOrganization"
import useGetProjectById from "@/hooks/useGetProjectById"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import Loading from "../Loading"
import getFirstOrString from "@/utils/getFirstOrString"

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
    <ul className="breadcrumb flex">
      <li className="cursor-pointer flex space-x-3 py-2 text-sm active pl-3 bg-gray-8 rounded-l-full">
        <Link href={{ pathname: "/projects" }} className="flex relative">
          {isOrganizationDataLoading ? (
            <Loading className="h-6 w-24" />
          ) : (
            <>
              {organizationData?.stytchInformation.organization_logo_url && (
                <span className="relative h-6 w-6 my-auto">
                  <Image
                    src={
                      organizationData?.stytchInformation.organization_logo_url
                    }
                    alt=""
                    object-fit="contain"
                    fill={true}
                  />
                </span>
              )}

              <span className="flex text-center uppercase items-center font-sans font-bold text-gray-2 text-sm pl-2">
                {organizationData?.organization.name}
              </span>
            </>
          )}
        </Link>
      </li>

      {projectId && (
        <li className="flex items-center space-x-3 pl-10 py-2.5 active text-base bg-gray-8 text-gray-2">
          <Link href={{ pathname: `/projects/${projectId}/transactions` }}>
            {isProjectDataLoading ? (
              <Loading className="h-6 w-24" />
            ) : (
              projectData?.name
            )}
          </Link>
        </li>
      )}
    </ul>
  )
}
