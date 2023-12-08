import { cn } from "@/utils/cn"
import React, { useState } from "react"

import Form, { useFormContextSafe } from "@/components/Form"
import FailureIcon from "@/components/icons/failureIcon"
import SuccessCheckMark from "@/components/icons/successCheckMark"
import { LightButtonStyles } from "@/components/Buttons"
import Submit from "@/components/Form/Submit"
import TextInput from "@/components/Form/TextInput"
import Modal from "@/components/Modal"
import AppreciationContent from "@/components/Shared/AppreciationContent"
import ContactUsToUpgrade from "@/components/Shared/ContactUsToUpgrade"
import { Spinner } from "@/components/Spinner"
import { InsufficientPermissionsText } from "@/components/Shared/constants"

import useAuthToken from "@/hooks/useAuthToken"
import useCreateUser, { CreateUserParams } from "@/hooks/useCreateUser"
import useFreePlan from "@/hooks/useFreePlan"
import useGetUsers from "@/hooks/useGetUsers"

type AddUserModalProps = {
  show: boolean
  onClose: () => void
}

type NewUserInfo = Pick<CreateUserParams, 'name' | 'email'>

const PendingStatusText = "Inviting user"
const SuccessStatusText = "User invitation sent"
const FailedStatusText = "User invitation failed"
const DuplicationStatusText = "User already added"
const AddUserModal: React.FC<AddUserModalProps> = ({ show, onClose }) => {
  const sessionToken = useAuthToken()
  const { isError, isLoading, isSuccess, mutate, error, reset } =
    useCreateUser()
  const { data: usersData } = useGetUsers()

  const isFreePlan = useFreePlan()

  const [hasSubmitted, setHasSubmitted] = useState(false)

  const validateUserExists = (value: string) => {
    if (!usersData) return

    const userExists = usersData.some((user) => user.emailAddress === value)

    if (userExists) return "User already exists"
  }

  const onSubmit = (values: NewUserInfo) => {
    if (sessionToken) {
      mutate({ sessionToken, ...values })
    }
  }

  const onSuccess = () => {
    setHasSubmitted(true)
  }

  const handleCloseClick = () => {
    onClose()
    setHasSubmitted(false)
    reset()
  }

  return (
    <Modal
      show={show}
      outsideOnClick={true}
      overflowYScroll={true}
      closeModal={handleCloseClick}
    >
      {hasSubmitted ? (
        <AppreciationContent handleCloseClick={handleCloseClick} />
      ) : (
        <Form onSubmit={onSubmit}>
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
                validate: { validateUserExists },
              }}
            />

            {isLoading ? (
              <div className="flex w-full align-middle justify-center">
                <Spinner className="h-6 w-6 text-blue-neptune" />
                <span className="ml-4">{PendingStatusText}</span>
              </div>
            ) : isSuccess ? (
              <div className="flex flex-col">
                <div className="flex align-middle justify-center mb-4">
                  <SuccessCheckMark className="h-6 w-6 text-green" />
                  <span className="ml-4 text-green">{SuccessStatusText}</span>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="appearance-none outline-none focus:outline-none text-white rounded-none"
                    onClick={handleCloseClick}
                  >
                    close
                  </button>
                </div>
              </div>
            ) : isError ? (
              <div className="flex flex-col">
                <div className="flex align-middle justify-center mb-4">
                  <FailureIcon className="h-6 w-6 text-red" />
                  <span className="ml-4 text-red">
                    {error?.status === 403
                      ? InsufficientPermissionsText
                      : error?.status === 409
                      ? DuplicationStatusText
                      : FailedStatusText}
                  </span>
                </div>
                <TryAgainButton reset={reset} />
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

interface TryAgainButtonProps {
  reset: () => void
}

function TryAgainButton(props: TryAgainButtonProps) {
  const { reset } = props
  const methods = useFormContextSafe()
  const handleFormReset = () => {
    reset()
    methods.reset()
  }

  return (
    <button
      type="button"
      className={cn(LightButtonStyles, "mx-auto")}
      onClick={handleFormReset}
    >
      Try again
    </button>
  )
}

export default AddUserModal
