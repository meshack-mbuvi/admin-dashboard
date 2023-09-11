import { useState } from "react"
import { useRouter } from "next/navigation"

import QuickStartChoice from "@/components/Projects/QuickStartChoice"
import Demo from "@/components/icons/Demo"
import Guides from "@/components/icons/Guides"
import Project from "@/components/icons/NewProject"
import StepsModal from "@/components/Shared/StepsModal"

import useAuthToken from "@/hooks/useAuthToken"
import useCreateProject from "@/hooks/useCreateProject"
import useGetOrganization from "@/hooks/useGetOrganization"

interface QuickStartChoicesProps {
  onCreateProject: (arg0: boolean) => void
}

const steps = [
  "Creating API keys",
  "Creating demo project smart contracts",
  "Creating secure HSM wallets",
  "Connecting demo project to blockchain network",
]

export default function QuickStartChoices({
  onCreateProject,
}: QuickStartChoicesProps) {
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
        <QuickStartChoice
          icon={<Demo className="h-40" />}
          title="Kickoff a demo project"
          description="Try Syndicate's API in less than 3 minutes with a demo project and smart contracts"
          onClick={() => handleCreateDemoProject()}
        />

        <QuickStartChoice
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
        <QuickStartChoice
          icon={<Project className="h-40" />}
          title="Create your own project"
          description="Start your own project, and use Syndicate’s full range of APIs and infrastructure services"
          onClick={() => onCreateProject(true)}
        />
      </div>
      <StepsModal
        steps={steps}
        show={showStepsModal}
        onComplete={handleOnComplete}
        canComplete={isSuccess}
        title={"Creating demo project..."}
        handleClose={() => setShowStepsModal(false)}
      />
    </div>
  )
}
