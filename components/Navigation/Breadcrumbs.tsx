"use client"

import Link from "next/link"
import useGetOrganization from "@/hooks/useGetOrganization"
import Loading from "../Loading"
import { useParams } from "next/navigation"
import useGetProjectById from "@/hooks/useGetProjectById"

export default function Breadcrumbs() {
  const { projectId } = useParams();
  const { data: organizationData, isLoading: isOrganizationDataLoading } = useGetOrganization()
  const { data: projectData, isLoading: isProjectDataLoading } = useGetProjectById({
    projectId
  })

  return (
    <ul className="breadcrumb flex">
      <li className="cursor-pointer flex space-x-3 py-2 text-sm active pl-3 bg-gray-8 rounded-l-full">
        <Link href="/projects" className="flex">
          <span className="flex text-center items-center text-gray-2">
            {isOrganizationDataLoading ? (
              <Loading className="h-6 w-24" />
            ) : (
              organizationData?.name
            )}
          </span>
        </Link>
      </li>

      {projectId && (
        <li className="flex items-center space-x-3 pl-10 py-2.5 active text-sm bg-gray-8 text-gray-2">
          {isProjectDataLoading ? (
              <Loading className="h-6 w-30" />
            ) : (
              projectData?.name
            )}
        </li>
      )}
    </ul>
  )
}
