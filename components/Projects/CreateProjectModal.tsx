import { useRouter } from "next/navigation"
import React, { useState } from "react"

import Modal from "@/components/Modal"
import StepsModal from "@/components/Shared/StepsModal"
import { Spinner } from "@/components/Spinner"
import Input from "@/components/inputs/Input"
import NetworkDropdown from "@/components/inputs/NetworkDropdown"
import Select, { SelectOption } from "@/components/inputs/Select"
import AppreciationContent from "@/components/Shared/AppreciationContent"
import ContactUsToUpgrade from "@/components/Shared/ContactUsToUpgrade"
import { InsufficientPermissionsText } from "@/components/Shared/constants"

import useAuthToken from "@/hooks/useAuthToken"
import useCreateProject, { Environment } from "@/hooks/useCreateProject"
import useFreePlan from "@/hooks/useFreePlan"
import useGetOrganization from "@/hooks/useGetOrganization"

type CreateProjectModalProps = {
  show: boolean
  onClose: () => void
}

const PendingStatusText = "Creating project"
const ErrorStatusText = "Error creating project"

const environmentOptions: {id: Environment, label: string}[] = [
  { id: "staging", label: "Staging" },
  { id: "production", label: "Production" },
]

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  show,
  onClose,
}) => {
  const router = useRouter()
  const sessionToken = useAuthToken()
  const { data: organizationData, isLoading: isOrganizationDataLoading } =
    useGetOrganization()

  const isFreePlan = useFreePlan()

  const [hasSubmitted, setHasSubmitted] = useState(false)

  const { isError, mutate, isSuccess, isLoading, reset, error } =
    useCreateProject({
      onSuccess: (data) => {
        data?.json().then((data) => {
          router.push(`/projects/${data.id}/transactions`)
        })
      },
    })

  const [name, setName] = useState<string>("")
  const [environment, setEnvironment] = useState<SelectOption<Environment> | null>(null)
  const [network, setNetwork] = useState<number>(0)
  const [showStepsModal, setShowStepsModal] = useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setName(value)
  }

  const handleRequest = () => {
    if (sessionToken) {
      onClose()
      setShowStepsModal(true)
      return mutate({
          sessionToken,
          organizationId: organizationData!.organization.id,
          name: name,
          environment: environment!.id,
          chainId: network,
          numWallets: 1,
      })
    }
  }

  const steps = [
    "Creating API keys",
    "Creating secure HSM wallets",
    "Provisioning project",
  ]

  const onComplete = () => {
    setShowStepsModal(false)
    onClose()
  }

  const onSuccess = () => {
    setHasSubmitted(true)
  }

  const handleCloseClick = () => {
    onClose()
    setHasSubmitted(false)
  }

  return (
    <>
      <StepsModal
        title="Creating new project..."
        steps={steps}
        show={showStepsModal}
        onComplete={onComplete}
        canComplete={isSuccess}
        handleClose={() => {
          setShowStepsModal(false)
          onClose()
        }}
      />

      <Modal
        show={show}
        outsideOnClick={true}
        overflowYScroll={true}
        closeModal={() => {
          setName("")
          setNetwork(0)
          reset()
          onClose()
          setHasSubmitted(false)
        }}
      >
        {hasSubmitted ? (
          <AppreciationContent handleCloseClick={handleCloseClick} />
        ) : (
          <div className="flex flex-col justify-center items-left bg-gray-8 my-4">
            {isFreePlan && <ContactUsToUpgrade onSuccess={onSuccess} />}

            {isLoading ? (
              <div className="flex w-full align-middle justify-center">
                <span className="mr-4">{PendingStatusText}</span>
                <Spinner className="h-6 w-6 text-blue-neptune" />
              </div>
            ) : isError ? (
              <div className="flex w-full align-middle justify-center">
                <span className="mr-4 text-red">
                  {error?.status === 403
                    ? InsufficientPermissionsText
                    : ErrorStatusText}
                </span>
              </div>
            ) : (
              <>
                <p className="font-sans font-medium text-2xl text-gray-1 mb-7">
                  New Project
                </p>
                <div className="flex flex-col justify-center items-left mb-7">
                  <p className="font-sans font-medium text-white text-sm mb-2 bg-dark">
                    Name
                  </p>
                  <Input
                    placeholder="My Project XYZ"
                    value={name}
                    onChange={(e) => handleNameChange(e)}
                    disabled={isFreePlan}
                    className="disabled:cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col justify-center items-left mb-7">
                  <p className="font-sans font-medium text-white text-sm mb-2">
                    Environment
                  </p>
                  <Select<Environment>
                    options={environmentOptions}
                    placeholder="Select environment type"
                    selected={environment}
                    setSelected={setEnvironment}
                    disabled={isFreePlan}
                  />
                </div>
                <div className="flex flex-col justify-center items-left mb-7">
                  <NetworkDropdown
                    currentNetwork={network}
                    setCurrentNetwork={setNetwork}
                    placeholder="Select preliminary network"
                    above={true}
                    disabled={isFreePlan}
                  />
                  <p className="text-gray-3 mt-2">
                    You can add more networks at any time
                  </p>
                </div>
                <input
                  type="button"
                  disabled={
                    !name ||
                    !environment ||
                    !network ||
                    isOrganizationDataLoading ||
                    isFreePlan
                  }
                  onClick={() => {
                    handleRequest()
                  }}
                  className="text-black font-sans disabled:bg-opacity-60 cursor-pointer disabled:cursor-not-allowed font-medium bg-white rounded-lg px-8 py-3.5"
                  value="Create project"
                />
              </>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}

export default CreateProjectModal
