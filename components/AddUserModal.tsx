import React, { useMemo, useState } from "react"

import Form from "@/components/Form"
import FailureIcon from "@/components/icons/failureIcon"
import SuccessCheckMark from "@/components/icons/successCheckMark"
import Submit from "./Form/Submit"
import TextInput from "./Form/TextInput"
import Modal from "./Modal"
import AppreciationContent from "./Shared/AppreciationContent"
import ContactUsToUpgrade from "./Shared/ContactUsToUpgrade"
import { Spinner } from "./Spinner"

import useAuthToken from "@/hooks/useAuthToken"
import useCreateUser from "@/hooks/useCreateUser"
import useFreePlan from "@/hooks/useFreePlan"
import useGetOrganization from "@/hooks/useGetOrganization"
import { useTimeout } from "@/hooks/useTimeout"

type AddUserModalProps = {
  show: boolean
  onClose: () => void
}

type NewUserInfo = {
  email: string
  name: string
}

const PendingStatusText = "Inviting user"
const SuccessStatusText = "User invitation sent"
const FailedStatusText = "User invitation failed"
const DuplicationStatusText = "User already added"

const AddUserModal: React.FC<AddUserModalProps> = ({ show, onClose }) => {
  const sessionToken = useAuthToken()
  const { isError, isLoading, isSuccess, mutate, error, reset } =
    useCreateUser()
  const { data: organizationData } = useGetOrganization()

  const isFreePlan = useFreePlan()

  const allowedDomains = useMemo(() => {
    if (!organizationData) return []
    return organizationData.stytchInformation.email_allowed_domains
  }, [organizationData])

  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleValidation = async (value: string) => {
    // Wait for 300ms to prevent spamming the validation
    await new Promise((resolve) => setTimeout(resolve, 300))

    const [_, domain] = value.split("@")

    if (!domain) return "Please enter a valid email address"

    const isValidDomain = allowedDomains.indexOf(domain.toLowerCase()) > -1

    if (isValidDomain) return

    return `Please enter a valid email address from the following domain(s): ${allowedDomains.join(
      ", "
    )}`
  }

  const onSubmit = (values: NewUserInfo) => {
    if (sessionToken) {
      mutate({
        method: "POST",
        sessionToken,
        endpointPath: "/admin/user",
        body: JSON.stringify({
          ...values,
          roleTitle: "admin",
        }),
      })
    }
  }

  const onSuccess = () => {
    setHasSubmitted(true)
  }

  const handleCloseClick = () => {
    onClose()
    setHasSubmitted(false)
  }

  // If form responds with an error or success wait 1s then reset
  useTimeout(reset, isSuccess || isError ? 1000 : null)

  return (
    <Modal
      show={show}
      outsideOnClick={true}
      closeModal={() => {
        onClose()
        setHasSubmitted(false)
      }}
    >
      {hasSubmitted ? (
        <AppreciationContent handleCloseClick={handleCloseClick} />
      ) : (
        <Form onSubmit={onSubmit} mode="onChange">
          <div className="flex flex-col space-y-8 justify-center items-left bg-gray-8 my-4">
            {isFreePlan && <ContactUsToUpgrade onSuccess={onSuccess} />}
            <p className="font-sans font-medium text-2xl text-gray-1 mb-7">
              Invite User
            </p>

            <TextInput
              label="Name"
              name="name"
              placeholder="Example Person"
              validate={{
                required: "Please enter a name",
              }}
              disabled={isFreePlan}
            />

            <TextInput
              label="Email Address"
              type="email"
              name="email"
              disabled={isFreePlan}
              placeholder="example@example.com"
              validate={{
                required: "Email address is required",
                validate: handleValidation,
              }}
            />

            {isLoading ? (
              <div className="flex w-full align-middle justify-center">
                <Spinner className="h-6 w-6 text-blue-neptune" />
                <span className="ml-4">{PendingStatusText}</span>
              </div>
            ) : isSuccess ? (
              <div className="flex align-middle justify-center">
                <SuccessCheckMark className="h-6 w-6 text-green" />
                <span className="ml-4 text-green">{SuccessStatusText}</span>
              </div>
            ) : isError ? (
              <div className="flex align-middle justify-center">
                <FailureIcon className="h-6 w-6 text-red" />
                <span className="ml-4 text-red">
                  {error?.status === 409
                    ? DuplicationStatusText
                    : FailedStatusText}
                </span>
              </div>
            ) : (
              <Submit disabled={isFreePlan}>Invite to organization</Submit>
            )}
          </div>
        </Form>
      )}
    </Modal>
  )
}

export default AddUserModal
