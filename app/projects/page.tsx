import ProjectRow from "./components/ProjectRow"

import gatewayFetch from "@/utils/gatewayFetch"
import getAuthToken from "@/utils/getAuthToken"
import { GetProjectsResponse } from "@/hooks/useGetProjects"

async function getProjects() {
  const sessionToken = getAuthToken()
  const data = await gatewayFetch<GetProjectsResponse>({
    endpointPath: "/admin/organization/projects",
    sessionToken,
  })

  return data
}

export default async function Projects() {
  const projects = await getProjects()

  return (
    <div className="flex flex-col space-y-8">
      <div className="text-2xl text-gray-1 ml-28 pl-1">Projects</div>
      <div className="flex flex-col space-y-7 ml-28">
        {/* Header */}
        <div className="w-full flex">
          <div className="w-1/4 text-left italic text-sm text-gray-4">Name</div>
        </div>

        {/* Project list */}
        <div className="w-full -ml-7 flex flex-col">
          {projects.map(({ name, id }, index) => (
            <ProjectRow key={index} name={name} projectId={id} />
          ))}
        </div>
      </div>
    </div>
  )
}
