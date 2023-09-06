import QuickStart from "@/components/Projects/quickStart"
import Demo from "@/components/icons/Demo"
import Guides from "@/components/icons/Guides"
import Project from "@/components/icons/NewProject"
import useAuthToken from "@/hooks/useAuthToken"
import useCreateProject from "@/hooks/useCreateProject"
import useGetOrganization from "@/hooks/useGetOrganization"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import StepsModal from "../Shared/StepsModal"
interface QuickStartOptions {
  onCreateProject: (arg0: boolean) => void
}

const demoProjectSteps = [
  { text: "Creating API keys" },
  { text: "Creating demo project smart contracts" },
  { text: "Creating secure HSM wallets" },
  { text: "Adding gas to HSM wallets" },
  { text: "Connecting demo project to blockchain network" },
]

export default function QuickStartOptions({
  onCreateProject,
}: QuickStartOptions) {
  const router = useRouter()

  const sessionToken = useAuthToken()
  const { mutate, isSuccess } = useCreateProject({
    onSuccess: (data) => {
      data?.json().then((data) => {
        router.push(`/dashboard/${data.id}/transactions`)
      })
    },
  })
  const { data: organizationData } = useGetOrganization()
  const [showStepsModal, setShowStepsModal] = useState(false)

  const handleCreateDemoProject = () => {
    if (sessionToken) {
      setShowStepsModal(true)
      return mutate({
        method: "POST",
        sessionToken,
        endpointPath: "/admin/project/demo",
        body: JSON.stringify({
          organizationId: organizationData?.organization.id,
        }),
      })
    }
  }

  const handleOnComplete = () => {
    setShowStepsModal(false)
  }
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
          onClick={() => handleCreateDemoProject()}
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
      <StepsModal
        steps={demoProjectSteps}
        show={showStepsModal}
        onComplete={handleOnComplete}
        canComplete={isSuccess}
        title={"Creating demo project..."}
        handleClose={() => setShowStepsModal(false)}
      />
    </div>
  )
}
