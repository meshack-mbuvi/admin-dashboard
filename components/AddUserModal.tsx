import useAuthToken from "@/hooks/useAuthToken"
import useCreateUser from "@/hooks/useCreateUser"
import useGetOrganization from "@/hooks/useGetOrganization"
import React, { useEffect, useMemo, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import Input from "./Input"
import Modal from "./Modal"
import StatusModal, { RequestStatus } from "./StatusModal"

type AddUserModalProps = {
  show: boolean
  onClose: () => void
}

const PendingStatusText = "Adding user"
const SuccessStatusText = "User added successfully"
const FailureStatusText = "User addition failed"

const AddUserModal: React.FC<AddUserModalProps> = ({ show, onClose }) => {
  const sessionToken = useAuthToken()
  const { isError, isSuccess, isLoading, mutate } = useCreateUser()
  const { data: organizationData, isLoading: isOrganizationDataLoading } =
    useGetOrganization()

  const [showStatusModal, setShowStatusModal] = useState(false)
  const [statusText, setStatusText] = useState(PendingStatusText)
  const [requestStatus, setRequestStatus] = useState(RequestStatus.FAILURE)
  const [name, setName] = useState("")
  const [email, setEmail] = useState<string>("")
  const [emailErrorMessage, setEmailErrorMessage] = useState("")

  const allowedDomains = useMemo(() => {
    if (!organizationData) return []
    return organizationData.stytchInformation.email_allowed_domains
  }, [organizationData])

  const handleStatusUpdate = () => {
    let _status = RequestStatus.PENDING
    let _statusText = PendingStatusText

    if (isLoading) {
      _status = RequestStatus.PENDING
      _statusText = PendingStatusText
    } else if (isSuccess) {
      _status = RequestStatus.SUCCESS
      _statusText = SuccessStatusText
    } else if (isError) {
      _status = RequestStatus.FAILURE
      _statusText = FailureStatusText
    }

    setRequestStatus(_status)
    setStatusText(_statusText)

    setTimeout(() => {
      setShowStatusModal(false)
    }, 3000)
  }

  useEffect(() => {
    handleStatusUpdate()
  }, [isSuccess, isError, isLoading])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
    debouncedHandleValidation(value)
  }

  const handleValidation = (value: string) => {
    setEmailErrorMessage("")

    if (!email) return

    const [_, domain] = value.split("@")
    let _errorMessage = ""

    if (!organizationData) {
      _errorMessage = "Organization domains not loaded"
    } else if (!domain) {
      _errorMessage = "Please enter a valid email"
    } else {
      const isValidDomain = allowedDomains.indexOf(domain.toLowerCase()) > -1

      if (isValidDomain) {
        _errorMessage = ""
      } else {
        _errorMessage = `Please enter a valid email address from the following domain(s): ${allowedDomains.join(
          ", "
        )}`
      }
    }

    setEmailErrorMessage(_errorMessage)
  }

  const debouncedHandleValidation = useDebouncedCallback(handleValidation, 300)

  const handleRequest = () => {
    if (sessionToken) {
      setStatusText(PendingStatusText)
      setShowStatusModal(true)

      mutate({
        method: "POST",
        sessionToken,
        endpointPath: "/admin/user",
        // Set Role to "admin" for now
        body: JSON.stringify({
          email: email,
          name: name,
          roleTitle: "admin",
        }),
      })

      setName("")
      setEmail("")
    }
  }

  return (
    <>
      <Modal show={show} outsideOnClick={true} closeModal={onClose}>
        <div className="flex flex-col justify-center items-left bg-gray-8 my-4">
          <p className="font-sans font-medium text-2xl text-gray-1 mb-7">
            Invite User
          </p>
          <div className="flex flex-col justify-center items-left mb-7">
            <p className="font-sans font-medium text-white text-sm mb-2 bg-dark">
              Name
            </p>
            <Input
              placeholder="Example Person"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center items-left">
            <p className="font-sans font-medium  text-white text-sm mb-2">
              Email Address
            </p>
            <Input
              placeholder="example@example.com"
              onChange={(e) => handleEmailChange(e)}
            />
            <p className="font-sans font-medium text-red text-sm mt-2 mb-7">
              {emailErrorMessage}
            </p>
          </div>
          <input
            type="button"
            disabled={!!emailErrorMessage || !name || !email}
            onClick={() => {
              handleRequest()
              onClose()
            }}
            className="text-black font-sans disabled:bg-opacity-60 disabled:cursor-not-allowed font-medium bg-white rounded-lg px-8 py-3.5"
            value="Invite to project"
          />
        </div>
      </Modal>

      {/* User addition transaction status */}
      <StatusModal show={showStatusModal} status={requestStatus}>
        {statusText}
      </StatusModal>
    </>
  )
}

export default AddUserModal
