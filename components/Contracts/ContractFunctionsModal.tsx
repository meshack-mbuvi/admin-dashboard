import Modal from "@/components/Modal"
import { formatAddress } from "@/utils/formatAddress"
import { IFunctionSignature } from "@/hooks/useGetProjectById"

interface ContractFunctionsModalProps {
  show: boolean
  closeModal: () => void
  contractAddress: string
  contractName: string
  allowedFunctions: IFunctionSignature[]
}
export default function ContractFunctionsModal(
  props: ContractFunctionsModalProps
) {
  const { show, closeModal, contractAddress, contractName, allowedFunctions } =
    props
  return (
    <Modal show={show} closeModal={closeModal} outsideOnClick={true}>
      <div>
        <div className={"text-2xl font-medium mb-5"}>
          {contractName || formatAddress(contractAddress, 6, 4)}
        </div>
        <div className="text-lg font-semibold">Allowed functions</div>
        <div className="font-mono text-sm  divide-y divide-gray-6">
          {allowedFunctions.map((func, i) => (
            <>
              <div key={i} className="py-5">
                {func.signature}
              </div>
            </>
          ))}
        </div>
      </div>
    </Modal>
  )
}
