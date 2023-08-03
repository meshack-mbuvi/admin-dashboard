import useAuthToken from "@/hooks/useAuthToken"
import useCreateUser from "@/hooks/useCreateUser"
import React, { useEffect, useMemo, useState } from "react"
import Input from "./Input"
import Select from "./Select"
import Modal from "./Modal"
import { Spinner } from "./Spinner"
import SuccessCheckMark from "./icons/successCheckMark"
import NetworkDropdown from "./NetworkDropdown"
import useGetOrganization from "@/hooks/useGetOrganization"
import { useRouter } from "next/navigation"

type CreateProjectModalProps = {
  show: boolean
  onClose: () => void
}

const PendingStatusText = "Creating project"
const SuccessStatusText = "Project created"
const ErrorStatusText = "Error creating project"

const enviromentOptions = [
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

  const { data, isError, isSuccess, mutate, isLoading, reset } = useCreateUser()
  const [newProjectId, setNewProjectId] = useState<string>("")

  const [name, setName] = useState<string>("")
  const [enviroment, setEnviroment] = useState<{
    id: number
    label: string
  }>()
  const [network, setNetwork] = useState<number>(0)

  useEffect(() => {
    if (!data) return
    data?.json().then((data) => {
      setNewProjectId(data.id)
    })
  }, [data])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setName(value)
  }

  const handleRequest = () => {
    if (sessionToken) {
      mutate({
        method: "POST",
        sessionToken,
        endpointPath: "/admin/project",
        body: JSON.stringify({
          organizationId: organizationData?.organization.id,
          name: name,
          enviroment: enviroment?.label,
          chainId: network,
          numWallets: 1,
        }),
      })
    }
  }

  return (
    <>
      <Modal
        show={show}
        outsideOnClick={true}
        closeModal={() => {
          setName("")
          setEnviroment(undefined)
          setNetwork(0)
          setNewProjectId("")
          reset()
          onClose()
        }}
      >
        <div className="flex flex-col justify-center items-left bg-gray-8 my-4">
          {isLoading ? (
            <div className="flex w-full align-middle justify-center">
              <span className="mr-4">{PendingStatusText}</span>
              <Spinner className="h-6 w-6 text-blue-neptune" />
            </div>
          ) : isError ? (
            <div className="flex w-full align-middle justify-center">
              <span className="mr-4 text-red">{ErrorStatusText}</span>
            </div>
          ) : isSuccess ? (
            <>
              <div className="flex align-middle justify-center mb-7">
                <span className="mr-4 text-green">{SuccessStatusText}</span>
                <SuccessCheckMark className="h-6 w-6 text-green" />
              </div>
              {newProjectId && (
                <input
                  type="button"
                  onClick={() => {
                    router.push(`/dashboard/${newProjectId}/transactions`)
                  }}
                  className="text-black font-sans disabled:bg-opacity-60 cursor-pointer disabled:cursor-not-allowed font-medium bg-white rounded-lg px-8 py-3.5"
                  value="Go to project"
                />
              )}
            </>
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
                />
              </div>
              <div className="flex flex-col justify-center items-left mb-7">
                <p className="font-sans font-medium text-white text-sm mb-2">
                  Enviroment
                </p>
                <Select
                  options={enviromentOptions}
                  placeholder="Select enviroment type"
                  selected={enviroment}
                  setSelected={setEnviroment}
                />
              </div>
              <div className="flex flex-col justify-center items-left mb-7">
                <NetworkDropdown
                  currentNetwork={network}
                  setCurrentNetwork={setNetwork}
                  placeholder="Select preliminary network"
                  above={true}
                />
              </div>
              <input
                type="button"
                disabled={
                  !name || !enviroment || !network || isOrganizationDataLoading
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
      </Modal>
    </>
  )
}

export default CreateProjectModal
