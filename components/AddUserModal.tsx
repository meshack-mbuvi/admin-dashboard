import useAuthToken from "@/hooks/useAuthToken"
import useCreateUser from "@/hooks/useCreateUser"
import useGetOrganization from "@/hooks/useGetOrganization"
import { ResponseError } from "@/utils/gatewayFetch"
import React, { useEffect, useMemo, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import Input from "./inputs/Input"
import Modal from "./Modal"
import { Spinner } from "./Spinner"
import SuccessCheckMark from "./icons/successCheckMark"

type AddUserModalProps = {
  show: boolean
  onClose: () => void
}

const PendingStatusText = "Inviting user"
const SuccessStatusText = "User invitation sent"

const AddUserModal: React.FC<AddUserModalProps> = ({ show, onClose }) => {
  const sessionToken = useAuthToken()
  const { isError, isSuccess, mutate, error, reset } = useCreateUser()
  const { data: organizationData } = useGetOrganization()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [nameErrorMessage, setNameErrorMessage] = useState<string>("")
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("")

  const allowedDomains = useMemo(() => {
    if (!organizationData) return []
    return organizationData.stytchInformation.email_allowed_domains
  }, [organizationData])

  useEffect(() => {
    let _statusText = ""
    if (isError && error.status === 409) {
      _statusText = "User already exists"
    }
    setEmailErrorMessage(_statusText)
    setIsSubmitting(false)
  }, [isError, error, isSuccess, email, name])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    reset()
    setEmailErrorMessage("")
    const { value } = e.target
    setName(value)
    debouncedHandleValidation()
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    reset()
    const { value } = e.target
    setEmail(value)
    debouncedHandleValidation()
  }

  const handleValidation = () => {
    setNameErrorMessage("")
    setEmailErrorMessage("")

    if (!email) return

    const [_, domain] = email.split("@")
    let _nameErrorMessage = ""
    let _emailErrorMessage = ""

    if (!organizationData) {
      _emailErrorMessage = "Organization domains not loaded"
    } else if (!name) {
      _nameErrorMessage = "Please enter a name"
    } else if (!domain) {
      _emailErrorMessage = "Please enter a valid email"
    } else {
      const isValidDomain = allowedDomains.indexOf(domain.toLowerCase()) > -1

      if (isValidDomain) {
        _emailErrorMessage = ""
      } else {
        _emailErrorMessage = `Please enter a valid email address from the following domain(s): ${allowedDomains.join(
          ", "
        )}`
      }
    }

    setNameErrorMessage(_nameErrorMessage)
    setEmailErrorMessage(_emailErrorMessage)
  }

  const debouncedHandleValidation = useDebouncedCallback(
    () => handleValidation(),
    300
  )

  const handleRequest = () => {
    if (sessionToken) {
      setIsSubmitting(true)
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
    }
  }

  return (
    <>
      <Modal
        show={show}
        outsideOnClick={true}
        closeModal={() => {
          setName("")
          setEmail("")
          onClose()
        }}
      >
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
              onChange={(e) => handleNameChange(e)}
            />
            {nameErrorMessage && (
              <p className="font-sans font-medium text-red text-sm mt-2 mb-7">
                {nameErrorMessage}
              </p>
            )}
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
              disabled={
                !!nameErrorMessage || !!emailErrorMessage || !name || !email
              }
              onClick={() => {
                handleRequest()
              }}
              className="text-black font-sans disabled:bg-opacity-60 disabled:cursor-not-allowed font-medium bg-white rounded-lg px-8 py-3.5"
              value="Invite to organization"
            />
          )}
        </div>
      </Modal>
    </>
  )
}

export default AddUserModal
