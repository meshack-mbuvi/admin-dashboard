import useAuthToken from "@/hooks/useAuthToken"
import useCreateUser from "@/hooks/useCreateUser"
import { ResponseError } from "@/utils/gatewayFetch"
import React, { useEffect, useMemo, useState } from "react"
import Input from "./Input"
import Select from "./Select"
import Modal from "./Modal"
import { Spinner } from "./Spinner"
import SuccessCheckMark from "./icons/successCheckMark"
import NetworkDropdown from "./NetworkDropdown"

type CreateProjectModalProps = {
  show: boolean
  onClose: () => void
}

const PendingStatusText = "Creating project"
const SuccessStatusText = "Project created"

const enviromentOptions = [
  { id: 0, label: "Staging" },
  { id: 1, label: "Production" },
]

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  show,
  onClose,
}) => {
  const sessionToken = useAuthToken()
  const { isError, isSuccess, mutate, error, reset } = useCreateUser()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [name, setName] = useState<string>("")
  const [enviroment, setEnviroment] = useState<{
    id: number
    label: string
  }>()
  const [network, setNetwork] = useState<number>(0)

  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    let _statusText = ""
    if (isError && error.status === 409) {
      _statusText = "Project already exists"
    }
    setErrorMessage(_statusText)
    setIsSubmitting(false)
  }, [isError, error, isSuccess, name])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    reset()
    const { value } = e.target
    setName(value)
  }

  const handleRequest = () => {
    if (sessionToken) {
      setIsSubmitting(true)
      //   mutate({
      //     method: "POST",
      //     sessionToken,
      //     endpointPath: "/admin/project",
      //     body: JSON.stringify({
      //       name: name,
      //       enviroment: name,
      //       chainId: "admin",
      //       numWallets: 3,
      //     }),
      //   })
      console.log("TODO: Create project API call")
      console.log({ name, enviroment, network })
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
          onClose()
        }}
      >
        <div className="flex flex-col justify-center items-left bg-gray-8 my-4">
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
            {errorMessage && (
              <p className="font-sans font-medium text-red text-sm mt-2 mb-7">
                {errorMessage}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-center items-left">
            <p className="font-sans font-medium text-white text-sm mb-2">
              Enviroment
            </p>
            <Select
              options={enviromentOptions}
              placeholder="Select enviroment type"
              selected={enviroment}
              setSelected={setEnviroment}
            />
            <br></br>
          </div>
          <div className="flex flex-col justify-center items-left">
            <NetworkDropdown
              currentNetwork={network}
              setCurrentNetwork={setNetwork}
              placeholder="Select preliminary network"
              above={true}
            />
            <br></br>
          </div>
          {isSubmitting ? (
            <div className="flex w-full align-middle justify-center">
              <span className="mr-4">{PendingStatusText}</span>
              <Spinner className="h-6 w-6 text-blue-neptune" />
            </div>
          ) : isSuccess ? (
            <div className="flex align-middle justify-center">
              <span className="mr-4 text-green">{SuccessStatusText}</span>
              <SuccessCheckMark className="h-6 w-6 text-green" />
            </div>
          ) : (
            <input
              type="button"
              disabled={!!errorMessage || !name || !enviroment || !network}
              onClick={() => {
                handleRequest()
              }}
              className="text-black font-sans disabled:bg-opacity-60 disabled:cursor-not-allowed font-medium bg-white rounded-lg px-8 py-3.5"
              value="Create project"
            />
          )}
        </div>
      </Modal>
    </>
  )
}

export default CreateProjectModal
