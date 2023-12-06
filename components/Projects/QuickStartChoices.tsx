import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/utils/cn"

import QuickStartChoice from "@/components/Projects/QuickStartChoice"
import Demo from "@/components/icons/Demo"
import Guides from "@/components/icons/Guides"
import Project from "@/components/icons/NewProject"
import StepsModal from "@/components/Shared/StepsModal"
import { DarkButtonStyles } from "@/components/Buttons"
import ExternalLink from "@/components/Shared/ExternalLink"

import useAuthToken from "@/hooks/useAuthToken"
import useCreateProject from "@/hooks/useCreateProject"
import useGetOrganization from "@/hooks/useGetOrganization"
import useFreePlan from "@/hooks/useFreePlan"
import { useUpgradeModalStore } from "@/store/useUpgradeModalStore"

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
  const isFreePlan = useFreePlan()
  const { toggle } = useUpgradeModalStore()

  const sessionToken = useAuthToken()
  const { mutate, isSuccess } = useCreateProject({
    onSuccess: (data) => {
      data?.json().then((data) => {
        router.push(`/projects/${data.id}/transactions`)
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
          icon={<Project className="h-40" />}
          title="Create your own project"
          description="Start your own project, and use Syndicate’s full range of APIs and infrastructure services"
          onClick={() => (isFreePlan ? toggle(true) : onCreateProject(true))}
          showPremium={isFreePlan}
        />
      </div>
      <div className="flex justify-center space-x-5 items-center">
        <Guides className="h-12 text-gray-4" />
        <div className="max-w-[18rem] text-sm text-gray-4">
          Learn how to submit transactions, add smart contracts, create wallets,
          and more
        </div>
        <ExternalLink
          href="https://docs.syndicate.io/get-started/quickstart"
          className={cn(
            DarkButtonStyles,
            "border-2 border-warning text-white flex space-x-2 py-4 "
          )}
          linkText="View Quickstart Guides"
        />
      </div>
      <StepsModal
        steps={steps}
        show={showStepsModal}
        onComplete={handleOnComplete}
        canComplete={isSuccess}
        title={"Creating demo project…"}
        handleClose={() => setShowStepsModal(false)}
      />
    </div>
  )
}
