import ProjectRow from "@/app/dashboard/components/ProjectRow"
import Loading from "@/components/Loading"
import QuickStartOptions from "@/components/Projects/quickStartOptions"

import useGetProjects from "@/hooks/useGetProjects"

interface ProjectsProps {
  onCreateProject: (arg0: boolean) => void
}

export default function Projects({ onCreateProject }: ProjectsProps) {
  const { data, isLoading } = useGetProjects()

  return (
    <>
      <div className="flex flex-col space-y-5">
        {isLoading && (
          <div>
            <Loading className="h-6 w-48" />
            <div className="border-b border-gray-7 my-6" />
            <Loading className="h-6 w-52" />
            <div className="border-b border-gray-7 my-6" />
            <Loading className="h-6 w-60" />
            <div className="border-b border-gray-7 my-6" />
            <Loading className="h-6 w-48" />
            <div className="border-b border-gray-7 my-6" />
          </div>
        )}

        {data && data.length < 0 ? (
          <>
            {/* Header */}
            <div className="flex">
              <div className="w-1/3 text-left text-sm text-gray-3">Name</div>
              <div className="w-1/6 text-left text-sm text-gray-3">
                Environment
              </div>
              <div className="w-1/6 text-left text-sm text-gray-3">
                Transactions (24hrs)
              </div>
              <div className="w-1/6 text-left text-sm text-gray-3">
                Failed Requests (24hrs)
              </div>
              <div className="w-1/6 text-left text-sm text-gray-3">
                Network(s)
              </div>
              <div className="flex w-5"></div>
            </div>
            {/* Project list */}
            <div className="-ml-7 -mr-7 flex flex-col">
              {data.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </div>
          </>
        ) : (
          !isLoading && <QuickStartOptions onCreateProject={onCreateProject} />
        )}
      </div>
    </>
  )
}
