import { redirect } from "next/navigation"

import TopBarNav from "@/components/Navigation/TopBarNav"
import gatewayFetch from "@/utils/gatewayFetch"
import getAuthToken from "@/utils/getAuthToken"
import { Project } from "@/hooks/useGetProjects"

interface ProjectLayoutProps {
  children: React.ReactNode
  params: {
    projectId: string
  }
}

interface GetProjectByIdProps {
  projectId: string
  sessionToken: string | undefined
}

async function getProjectById(args: GetProjectByIdProps) {
  const { projectId, sessionToken } = args

  if (!sessionToken) return

  const res = await gatewayFetch({
    endpointPath: `/admin/project/${projectId}`,
    sessionToken,
  })

  const data = (await res.json()) as Project

  return data
}

export default async function ProjectLayout(props: ProjectLayoutProps) {
  const { children, params } = props
  const authToken = getAuthToken()

  // DEV: Redirect to /projects if project does not exist
  try {
    await getProjectById({
      projectId: params.projectId,
      sessionToken: authToken,
    })
  } catch (error) {
    redirect("/projects")
  }

  return (
    <div className="flex flex-col space-y-10">
      <TopBarNav />
      {children}
    </div>
  )
}
