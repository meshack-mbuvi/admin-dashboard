import Form from "@/components/Form"
import ArrowRight from "@/components/icons/ArrowRight"
import useAuthToken from "@/hooks/useAuthToken"
import useCreateUser from "@/hooks/useCreateUser"
import useGetOrganization from "@/hooks/useGetOrganization"
import useTestUser from "@/hooks/useTestUser"
import React, { useMemo } from "react"
import { useDebouncedCallback } from "use-debounce"
import Submit from "./Form/Submit"
import TextInput from "./Form/TextInput"
import Modal from "./Modal"
import { Spinner } from "./Spinner"
import FailureIcon from "./icons/failureIcon"
import SuccessCheckMark from "./icons/successCheckMark"

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
  const { isError, isLoading, isSuccess, mutate, error } = useCreateUser()
  const { data: organizationData } = useGetOrganization()

  const isTestUser = useTestUser()

  const allowedDomains = useMemo(() => {
    if (!organizationData) return []
    return organizationData.stytchInformation.email_allowed_domains
  }, [organizationData])

  const handleValidation = (value: string) => {
    const [_, domain] = value.split("@")

    if (!domain) return "Please enter a valid email address"

    const isValidDomain = allowedDomains.indexOf(domain.toLowerCase()) > -1

    if (isValidDomain) return

    return `Please enter a valid email address from the following domain(s): ${allowedDomains.join(
      ", "
    )}`
  }

  const debouncedHandleValidation = useDebouncedCallback(
    (value) => handleValidation(value),
    300
  )

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

  return (
    <>
      <Modal
        show={show}
        outsideOnClick={true}
        closeModal={() => {
          onClose()
        }}
      >
        <Form onSubmit={onSubmit}>
          <div className="flex flex-col space-y-8 justify-center items-left bg-gray-8 my-4">
            {isTestUser && (
              <p className="flex text-blue-secondary items-center">
                Contact us to upgrade your account and access this feature{" "}
                <ArrowRight className="h-4 ml-[6px]" />
              </p>
            )}
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
              disabled={isTestUser}
            />

            <TextInput
              label="Email Address"
              type="email"
              name="email"
              disabled={isTestUser}
              placeholder="example@example.com"
              validate={{
                required: "Email address is required",
                validate: { debouncedHandleValidation },
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
              <Submit disabled={isTestUser}>Invite to organization</Submit>
            )}
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default AddUserModal
