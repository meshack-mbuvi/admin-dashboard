import QuickStart from "@/components/Projects/quickStart"
import Demo from "@/components/icons/Demo"
import Guides from "@/components/icons/Guides"
import Project from "@/components/icons/NewProject"

interface QuickStartOptions {
  onCreateProject: (arg0: boolean) => void
}

export default function QuickStartOptions({
  onCreateProject,
}: QuickStartOptions) {
  return (
    <div className="flex flex-col mt-16 space-y-16">
      <div className="text-center text-xl font-medium">
        What would you like to do?
      </div>
      <div className="flex space-x-4 justify-evenly flex-col md:flex-row">
        <QuickStart
          icon={<Demo className="h-40" />}
          title="Kickoff a demo project"
          description="Try Syndicate's API in less than 3 minutes with a demo project and smart contracts"
          onClick={() => {}}
        />

        <QuickStart
          icon={<Guides className="h-40" />}
          title="View quickstart guides"
          description="Learn how to submit transactions, add smart contracts, create wallets, and more"
          onClick={() => {
            window.open(
              "https://docs.syndicate.io/get-started/quickstart",
              "_blank"
            )
          }}
        />
        <QuickStart
          icon={<Project className="h-40" />}
          title="Create your own project"
          description="Start your own project, and use Syndicate’s full range of APIs and infrastructure services"
          onClick={() => onCreateProject(true)}
        />
      </div>
    </div>
  )
}
