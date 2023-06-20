import { redirect } from "next/navigation"

import getAuthToken from "@/utils/getAuthToken"
import gatewayFetch from "@/utils/gatewayFetch"
import Sidebar from "@/components/Navigation/Sidebar"

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

export interface ProjectInterface {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  name: string
  organizationId: string
  tokens: any[]
}

async function getProjectById(args: GetProjectByIdProps) {
  const { projectId, sessionToken } = args

  if (!sessionToken) return

  const data = await gatewayFetch<ProjectInterface>({
    endpointPath: `/admin/project/${projectId}`,
    sessionToken,
  })

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
    <>
      <Sidebar />
      {children}
    </>
  )
}
