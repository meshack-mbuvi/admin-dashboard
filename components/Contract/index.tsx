import { useAddContractContext } from "@/context/addContract"
import Button, { ButtonStyle } from "../Buttons"
import Card from "../Card"
import { InputField } from "../InpuField"
import Modal from "../Modal"

export const ListContracts = () => {
  const {
    contractAddress,
    contractName,
    addressErrorText,
    showContactSupportModal = false,
    showAddContractModal = false,
    handleContractNameChange,
    handleContractAddressChange,
    handleShowAddContractModal,
    handleResetState,
    handleContinueButton,
    handleShowContactSupportModal,
  } = useAddContractContext()

  const handleContinue = () => {
    handleContinueButton?.()
  }

  const isDisabled = !contractAddress || !contractName || !!addressErrorText

  return (
    <div className="">
      <Card />
      <Card />
      {/* Add contract */}
      <Modal
        title="Add a contract"
        show={showAddContractModal}
        closeModal={() => {
          handleShowAddContractModal?.(false)
          handleResetState?.()
        }}
      >
        <div className="flex flex-col">
          <div className="text-gray-3 text-sm mb-6">
            Add existing smart contracts to use them with Syndicate. You’ll get
            wallet addresses in the next step.
          </div>
          <div className="flex flex-col space-y-5">
            <InputField
              label="Contract address"
              placeholderLabel="0x..."
              value={contractAddress}
              onChange={handleContractAddressChange}
              errorText={addressErrorText}
            />{" "}
            <InputField
              label="Contract name"
              placeholderLabel="Write a name you'll easily recognize"
              value={contractName}
              onChange={handleContractNameChange}
            />
          </div>
          <div className="flex w-full mt-10">
            <Button
              onClick={handleContinue}
              customClasses="w-full rounded-lg"
              style={ButtonStyle.LIGHT}
              disabled={isDisabled}
              buttonLabel="Continue"
            />
          </div>
        </div>
      </Modal>

      {/* Contact support */}
      <Modal
        title="Next, contact us to generate wallets"
        show={showContactSupportModal}
        closeModal={() => {
          handleShowContactSupportModal?.(false)
        }}
      >
        <div className="flex flex-col">
          <div className="text-gray-3 text-sm mb-6">
            Next, you’ll need to add wallet addresses to your smart contract to
            complete setup. To get started, contact the Syndicate team. We’ll
            help you do so.
          </div>
          <div className="flex w-full mt-[30px]">
            <Button
              onClick={handleContinue}
              customClasses="w-full rounded-lg"
              style={ButtonStyle.LIGHT}
              buttonLabel="Contact Syndicate team"
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
