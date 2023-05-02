import { isAddress } from "ethers"
import {
  ChangeEvent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type AddContractProviderProps = {
  contractAddress: string
  contractName: string
  addressErrorText: string
  showContactSupportModal: boolean
  showAddContractModal: boolean
  handleContinueButton: () => void
  handleContractNameChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleContractAddressChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleShowAddContractModal: (show: boolean) => void
  handleResetState: () => void
  handleShowContactSupportModal: (show: boolean) => void
}
const AddContractContext = createContext<Partial<AddContractProviderProps>>({})

export const useAddContractContext = (): Partial<AddContractProviderProps> =>
  useContext(AddContractContext)

const AddContractProvider: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const [contractAddress, setContractAddress] = useState("")
  const [contractName, setContractName] = useState("")
  const [addressErrorText, setAddressErrorText] = useState("")

  const [showContactSupportModal, setShowContactSupportModal] = useState(false)
  const [showAddContractModal, setShowAddContractModal] = useState(false)

  useEffect(() => {
    if (contractAddress && !isAddress(contractAddress)) {
      setAddressErrorText("Value is not a valid address")
    } else {
      setAddressErrorText("")
    }
  }, [contractAddress])

  const handleContractAddressChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setContractAddress(event.target.value.trim())
  }

  const handleContractNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContractName(event.target.value.trim())
  }

  const handleContinueButton = () => {
    console.log("add address")
    setShowAddContractModal(false)
    setShowContactSupportModal(true)
  }

  const handleShowAddContractModal = (show: boolean) => {
    setShowAddContractModal(show)
  }

  const handleShowContactSupportModal = (show: boolean) => {
    setShowContactSupportModal(show)
  }

  const handleResetState = () => {
    setContractAddress("")
    setContractName("")
    setAddressErrorText("")
    setShowContactSupportModal(false)
    setShowAddContractModal(false)
  }
  return (
    <AddContractContext.Provider
      value={{
        contractAddress,
        contractName,
        addressErrorText,
        showContactSupportModal,
        showAddContractModal,
        handleContractNameChange,
        handleContractAddressChange,
        handleContinueButton,
        handleShowAddContractModal,
        handleResetState,
        handleShowContactSupportModal,
      }}
    >
      {children}
    </AddContractContext.Provider>
  )
}

export default AddContractProvider
