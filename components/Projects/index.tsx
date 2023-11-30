import ProjectCard from "@/app/projects/components/ProjectCard"
import Loading from "@/components/Loading"
import QuickStartChoices from "@/components/Projects/QuickStartChoices"

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Loading className="h-24 w-full" />
            <Loading className="h-24 w-full" />
            <Loading className="h-24 w-full" />
            <Loading className="h-24 w-full" />
            <Loading className="h-24 w-full" />
            <Loading className="h-24 w-full" />
            <Loading className="h-24 w-full" />
            <Loading className="h-24 w-full" />
            <Loading className="h-24 w-full" />
          </div>
        )}
        {data && data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {data.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        ) : (
          !isLoading && <QuickStartChoices onCreateProject={onCreateProject} />
        )}
      </div>
    </>
  )
}
