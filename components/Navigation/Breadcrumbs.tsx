"use client"

import Link from "next/link"
import NikeBrand from "@/components/icons/NikeBrand"
import useGetOrganization from "@/hooks/useGetOrganization"

export default /* async */ function Breadcrumbs() {
  const { data, isLoading } = useGetOrganization()

  console.log("useGetOrganization data", data)

  return (
    <ul className="breadcrumb flex">
      <li className="cursor-pointer flex space-x-3 py-2 text-sm active pl-3 bg-gray-8 rounded-l-full">
        <Link href="/projects" className="flex">
          <NikeBrand className="w-7" />
          <span className="flex text-center items-center text-gray-2">
            Nike
          </span>
        </Link>
      </li>

      {/* {projectId && (
        <li className="flex items-center space-x-3 pl-10 py-2.5 active text-sm bg-gray-8 text-gray-2">
          .Swoosh
        </li>
      )} */}
    </ul>
  )
}
