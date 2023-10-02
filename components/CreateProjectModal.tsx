import { useRouter } from "next/navigation"
import React, { useState } from "react"

import Modal from "./Modal"
import ExternalLink from "./Shared/ExternalLink"
import StepsModal from "./Shared/StepsModal"
import { Spinner } from "./Spinner"
import Input from "./inputs/Input"
import NetworkDropdown from "./inputs/NetworkDropdown"
import Select, { SelectOption } from "./inputs/Select"

import ArrowRight from "@/components/icons/ArrowRight"
import useAuthToken from "@/hooks/useAuthToken"
import useCreateProject from "@/hooks/useCreateProject"
import useGetOrganization from "@/hooks/useGetOrganization"
import useTestUser from "@/hooks/useTestUser"

type CreateProjectModalProps = {
  show: boolean
  onClose: () => void
}

const PendingStatusText = "Creating project"
const ErrorStatusText = "Error creating project"

const environmentOptions = [
  { id: 0, label: "Staging" },
  { id: 1, label: "Production" },
]

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  show,
  onClose,
}) => {
  const router = useRouter()
  const sessionToken = useAuthToken()
  const { data: organizationData, isLoading: isOrganizationDataLoading } =
    useGetOrganization()

  const isTestUser = useTestUser()

  const { isError, mutate, isSuccess, isLoading, reset } = useCreateProject({
    onSuccess: (data) => {
      data?.json().then((data) => {
        router.push(`/dashboard/${data.id}/transactions`)
      })
    },
  })

  const [name, setName] = useState<string>("")
  const [environment, setEnvironment] = useState<SelectOption | undefined>()
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
        method: "POST",
        sessionToken,
        endpointPath: "/admin/project",
        body: JSON.stringify({
          organizationId: organizationData?.organization.id,
          name: name,
          enviroment: environment?.label,
          chainId: network,
          numWallets: 1,
        }),
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
        closeModal={() => {
          setName("")
          setNetwork(0)
          reset()
          onClose()
        }}
      >
        <div className="flex flex-col justify-center items-left bg-gray-8 my-4">
          {isTestUser && (
            <p className="flex text-blue-secondary items-center mb-7">
              Contact us to upgrade your account and access this feature{" "}
              <ArrowRight className="h-4 ml-[6px]" />
            </p>
          )}

          {isLoading ? (
            <div className="flex w-full align-middle justify-center">
              <span className="mr-4">{PendingStatusText}</span>
              <Spinner className="h-6 w-6 text-blue-neptune" />
            </div>
          ) : isError ? (
            <div className="flex w-full align-middle justify-center">
              <span className="mr-4 text-red">{ErrorStatusText}</span>
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
                  disabled={isTestUser}
                  className="disabled:cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col justify-center items-left mb-7">
                <p className="font-sans font-medium text-white text-sm mb-2">
                  Environment
                </p>
                <Select
                  options={environmentOptions}
                  placeholder="Select environment type"
                  selected={environment}
                  setSelected={setEnvironment}
                  disabled={isTestUser}
                />
              </div>
              <div className="flex flex-col justify-center items-left mb-7">
                <NetworkDropdown
                  currentNetwork={network}
                  setCurrentNetwork={setNetwork}
                  placeholder="Select preliminary network"
                  above={true}
                  disabled={isTestUser}
                />
                <p className="text-gray-3 mt-2">
                  You can add more networks anytime
                </p>
              </div>
              <input
                type="button"
                disabled={
                  !name ||
                  !environment ||
                  !network ||
                  isOrganizationDataLoading ||
                  isTestUser
                }
                onClick={() => {
                  handleRequest()
                }}
                className="text-black font-sans disabled:bg-opacity-60 cursor-pointer disabled:cursor-not-allowed font-medium bg-white rounded-lg px-8 py-3.5"
                value="Create project"
              />

              <ExternalLink
                href="https://docs.syndicate.io"
                linkText="View Guide"
                className="mx-auto mt-6 text-yellow-secondary"
              />
            </>
          )}
        </div>
      </Modal>
    </>
  )
}

export default CreateProjectModal
