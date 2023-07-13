import useGetOrganization from "@/hooks/useGetOrganization"
import React, { useMemo, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import Input from "./Input"
import Modal from "./Modal"
import useAuthToken from "@/hooks/useAuthToken"
import useCreateUser from "@/hooks/useCreateUser"

type AddUserModalProps = {
  show: boolean
  onClose: () => void
}

const AddUserModal: React.FC<AddUserModalProps> = ({ show, onClose }) => {

    const sessionToken = useAuthToken()
    const createMutation = useCreateUser()

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleRequest = () => {
        if (sessionToken) {
            createMutation.mutate({
                method: "POST",
                sessionToken,
                endpointPath: `/admin/user`,
                // Set Role to "admin" for now
                body: JSON.stringify({ 
                    email: email, 
                    name: name, 
                    roleTitle: "admin" 
                })
            })
            setName("");
            setEmail("");
        }
    }
  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const { data: organizationData, isLoading: isOrganizationDataLoading } =
    useGetOrganization()


  const debounced = useDebouncedCallback((e) => {
    const { value } = e.target
    setEmail(value)
    handleValidation()
  }, 300)

  const allowedDomains = useMemo(() => {
    if (!organizationData) return []
    return organizationData.stytchInformation.email_allowed_domains
  }, [organizationData])

  const handleValidation = () => {
    setEmailErrorMessage("")
    if (!email) return

    const [_, domain] = email.split("@")
    let _errorMessage = ""

    if (allowedDomains.length === 0) {
      _errorMessage = "Organization domains not loaded"
    } else if (!domain) {
      _errorMessage = "Please enter a valid email"
    } else {
      const isValidDomain = allowedDomains.find(
        (_domain: string) => _domain === domain.toLowerCase()
      )
      if (!isValidDomain) {
        _errorMessage = `Please enter a valid email address from the following domain(s): ${allowedDomains.join(
          ", "
        )}`
      }
    }
    setEmailErrorMessage(_errorMessage)
  }

  return (
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
            onChange={(e) => debounced(e)}
          />
          <p className="font-sans font-medium text-red text-sm mt-2 mb-7">
            {emailErrorMessage}
          </p>
        </div>
        <input
          type="button"
          disabled={!!emailErrorMessage || !name || !email}
          onClick={() => {
            handleRequest();
            onClose();
            }}
          className="text-black font-sans disabled:bg-opacity-60 disabled:cursor-not-allowed font-medium bg-white rounded-lg px-8 py-3.5"
          value="Invite to project"
        />
      </div>
    </Modal>
  )
}

export default AddUserModal
