import ProjectRow from "@/app/dashboard/components/ProjectRow"
import useGetProjects from "@/hooks/useGetProjects"
import Loading from "../Loading"

export default function Projects() {
  const { data, isLoading } = useGetProjects()

  return (
    <>
      <div className="flex flex-col space-y-5">
        {/* Header */}
        <div className="flex">
          <div className="w-1/4 text-left text-sm text-gray-3">Name</div>
        </div>

        {/* Project list */}
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

        {data && (
          <div className="-ml-7 -mr-7 flex flex-col">
            {data.map(({ name, id }) => (
              <ProjectRow key={id} name={name} projectId={id} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
