import { Listbox, Transition } from "@headlessui/react"
import { AbiFunction, formatAbiItem } from "abitype"
import { cn } from "@/utils/cn"
import { useParams } from "next/navigation"
import { Fragment, useEffect, useMemo, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { isAddress } from "viem"

import Modal from "@/components/Modal"
import { Spinner } from "@/components/Spinner"
import Check from "@/components/icons/Check"
import SuccessCheckMark from "@/components/icons/successCheckMark"
import Input from "@/components/inputs/Input"
import NetworkDropdown from "@/components/inputs/NetworkDropdown"
import useAuthToken from "@/hooks/useAuthToken"
import useContractABI from "@/hooks/useContractAbi"
import useCreateContract from "@/hooks/useCreateContract"
import useFreePlan from "@/hooks/useFreePlan"
import useGetProjectWallets from "@/hooks/useGetProjectWallets"
import getFirstOrString from "@/utils/getFirstOrString"
import AppreciationContent from "../Shared/AppreciationContent"
import ContactUsToUpgrade from "../Shared/ContactUsToUpgrade"
import { InsufficientPermissionsText } from "../Shared/constants"

interface AddContractModalProps {
  show: boolean
  closeModal: () => void
}

const parseABI = (abi: string): AbiFunction[] | null => {
  try {
    const jsonAbi = JSON.parse(abi)
    return Array.isArray(jsonAbi) ? jsonAbi : null
  } catch (e) {
    return null
  }
}

export default function AddContractModal(props: AddContractModalProps) {
  const { show, closeModal } = props
  const [name, setName] = useState<string>("")
  const [contractAddress, setContractAddress] = useState<string>("")
  const [contractABI, setContractABI] = useState<string>("")
  const [allowedFunctions, setAllowedFunctions] = useState<AbiFunction[]>([])
  const [networkId, setNetworkId] = useState<number | null>(null)
  const [nameErrorMessage, setNameErrorMessage] = useState<string>("")
  const [contractAddressErrorMessage, setContractAddressErrorMessage] =
    useState<string>("")

  const isFreePlan = useFreePlan()
  const { data: preLoadedAbi } = useContractABI(contractAddress, networkId)

  const { isError, isSuccess, mutate, error, reset, isLoading } =
    useCreateContract()
  const sessionToken = useAuthToken()
  const { projectId } = useParams()

  const { data: wallets } = useGetProjectWallets({
    projectId: getFirstOrString(projectId),
  })

  useEffect(() => {
    setNetworkId(wallets?.[0]?.chainId ?? null)
  }, [wallets])

  const parsedABI = useMemo(() => {
    return parseABI(contractABI)
  }, [contractABI])

  useEffect(() => {
    if (preLoadedAbi) {
      setContractABI(JSON.stringify(preLoadedAbi))
    }
  }, [preLoadedAbi])

  const abiFunctions = useMemo(() => {
    return parsedABI?.filter(
      (a) => a.type === "function" && a.stateMutability !== "view"
    )
  }, [parsedABI])

  useEffect(() => {
    if (abiFunctions?.length === 1) {
      setAllowedFunctions(abiFunctions)
    }
  }, [abiFunctions])

  const functionSignatures = useMemo(() => {
    if (!allowedFunctions.length) return []
    const formattedFunctions = allowedFunctions.map((func) => {
      // DEV: we remove any outputs and change the statemutability to `nonpayable`, this ensures they are not output in the signature
      const trimmedFunction: AbiFunction = {
        type: func.type,
        name: func.name,
        inputs: func.inputs,
        outputs: [],
        stateMutability: "nonpayable",
      }

      const signature = formatAbiItem(trimmedFunction)

      // DEV: this will only replace the first instance of the word "function "
      const trimmedSignature = signature.replace("function ", "")

      return trimmedSignature
    })
    return formattedFunctions
  }, [allowedFunctions])

  const formValidation: boolean = useMemo(() => {
    return Boolean(
      name && isAddress(contractAddress) && allowedFunctions.length && networkId
    )
  }, [name, contractAddress, allowedFunctions, networkId])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setName(value)
    debouncedHandleValidation()
  }
  const handleContractAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target
    setContractAddress(value)
    debouncedHandleValidation()
  }

  const handleValidation = () => {
    setNameErrorMessage("")
    setContractAddressErrorMessage("")

    if (!name) {
      setNameErrorMessage("Please enter a name for your contract.")
    } else if (!contractAddress) {
      setContractAddressErrorMessage("Please enter a contract address")
    } else if (!isAddress(contractAddress)) {
      setContractAddressErrorMessage("Please enter a valid contract address")
    }
  }
  const debouncedHandleValidation = useDebouncedCallback(
    () => handleValidation(),
    300
  )

  const resetFields = () => {
    setName("")
    setContractAddress("")
    setContractABI("")
    setAllowedFunctions([])
    setNameErrorMessage("")
    setContractAddressErrorMessage("")
  }

  const handleRequest = () => {
    if (sessionToken && networkId) {
      mutate({
        method: "POST",
        sessionToken,
        endpointPath: "/admin/contract/authorizeWithFunctionSignatures",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          address: contractAddress,
          chainId: networkId,
          functionSignatures: functionSignatures,
          projectId: projectId,
        }),
      })
    }
  }

  useEffect(() => {
    let _statusText = ""
    if (isError) {
      if (error.status === 409) {
        _statusText = "Contract already exists"
      } else if (error.status === 403) {
        _statusText = InsufficientPermissionsText
      }
    }
    if (isSuccess) {
      setTimeout(() => {
        closeModal()
        reset()
        resetFields()
      }, 1000)
    }
    setContractAddressErrorMessage(_statusText)
  }, [isError, error, isSuccess, contractAddress, closeModal, reset])

  const [hasSubmitted, setHasSubmitted] = useState(false)

  const onSuccess = () => {
    setHasSubmitted(true)
  }

  const handleCloseClick = () => {
    closeModal()
    setHasSubmitted(false)
  }

  return (
    <>
      <Modal
        show={show}
        closeModal={() => {
          closeModal()
          setHasSubmitted(false)
          resetFields()
        }}
        outsideOnClick={true}
        overflowYScroll={true}
      >
        {hasSubmitted ? (
          <AppreciationContent handleCloseClick={handleCloseClick} />
        ) : (
          <div className="flex flex-col justify-center items-left bg-gray-8 my-4">
            {isFreePlan && <ContactUsToUpgrade onSuccess={onSuccess} />}
            <p className="font-sans font-medium text-2xl text-gray-1 mb-7">
              Add contract
            </p>

            {networkId && (
              <div className="flex flex-col justify-center items-left mb-7">
                <NetworkDropdown
                  currentNetwork={networkId}
                  setCurrentNetwork={setNetworkId}
                  placeholder="Select preliminary network"
                  above={false}
                  disabled={isFreePlan}
                />
              </div>
            )}

            <div className="flex flex-col justify-center items-left mb-7">
              <p className="font-sans font-medium text-white text-sm mb-2 bg-dark">
                Name
              </p>
              <Input
                className="bg-white/[0.01] disabled:cursor-not-allowed"
                placeholder="My Contract XYZ"
                value={name}
                onChange={(e) => handleNameChange(e)}
                disabled={isFreePlan}
              />
              {nameErrorMessage && (
                <p className="font-sans font-medium text-red text-sm mt-2">
                  {nameErrorMessage}
                </p>
              )}
            </div>
            <div className="flex flex-col justify-center items-left mb-7">
              <p className="font-sans font-medium text-white text-sm mb-2 bg-dark">
                Contract Address
              </p>
              <Input
                className="bg-white/[0.01] disabled:cursor-not-allowed"
                placeholder="0x…"
                value={contractAddress}
                onChange={(e) => handleContractAddressChange(e)}
                disabled={isFreePlan || !networkId}
              />
              {contractAddressErrorMessage && (
                <p className="font-sans font-medium text-red text-sm mt-2">
                  {contractAddressErrorMessage}
                </p>
              )}
            </div>
            <div className="flex flex-col justify-center items-left mb-7">
              <p className="font-sans font-medium text-white text-sm mb-2 bg-dark flex space-x-4">
                <span>Contract ABI</span>{" "}
                {parsedABI && <Check className="h-4 text-success" />}
              </p>

              <textarea
                rows={3}
                className={cn(
                  "border bg-gray-8 outline-none border-gray-7 outline-offset-0 ring-0 focus:border-blue-neptune rounded-lg px-4 py-2 min-h-[100px] font-mono text-sm disabled:cursor-not-allowed",
                  !parsedABI &&
                    contractABI.length > 0 &&
                    "border-red focus:border-red",
                  parsedABI &&
                    contractABI.length > 0 &&
                    "border-success focus:border-success"
                )}
                placeholder="Paste the contract ABI here"
                onChange={(e) => {
                  setContractABI(e.target.value)
                  setAllowedFunctions([])
                }}
                value={contractABI}
                disabled={isFreePlan || !networkId}
              />
              {!parsedABI && contractABI.length > 0 && (
                <p className="text-red mt-3">Error parsing ABI</p>
              )}
            </div>
            <div className="flex flex-col justify-center items-left mb-7">
              <p className="font-sans font-medium text-white text-sm mb-2 bg-dark">
                Allowed Functions for Programmatic Transactions
              </p>
              <Listbox
                value={allowedFunctions}
                onChange={setAllowedFunctions}
                multiple
                disabled={!abiFunctions || !abiFunctions.length || isFreePlan}
                by={"name"}
              >
                {({ open }) => (
                  <>
                    <div className="relative mt-2">
                      <Listbox.Button
                        className={cn(
                          !allowedFunctions && "text-gray-4",
                          "flex gap-4 border bg-gray-8 outline-none border-gray-7 rounded-lg px-4 py-4 w-full text-left disabled:cursor-not-allowed"
                        )}
                      >
                        <span
                          className={cn(
                            "block truncate",
                            !allowedFunctions.length && "text-gray-4"
                          )}
                        >
                          {!contractABI.length
                            ? "Paste ABI to select functions"
                            : !allowedFunctions.length
                            ? "Select functions"
                            : allowedFunctions
                                .map((allowedFunction) => allowedFunction.name)
                                .join(", ")}
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          className={
                            "bottom-full absolute z-10 w-full bg-gray-6 text-white border border-gray-7 rounded-lg overflow-scroll max-h-96"
                          }
                        >
                          {abiFunctions?.map((option, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) =>
                                cn(
                                  active ? "bg-white/10" : "",
                                  "flex gap-4 cursor-default select-none py-2 pl-3 pr-9 max-h-38 rounded-lg"
                                )
                              }
                              value={option}
                            >
                              {({ selected }) => (
                                <div className="flex items-center justify-between">
                                  <span
                                    className={cn(
                                      "pr-4",
                                      selected ? "visible" : "invisible"
                                    )}
                                  >
                                    <Check
                                      className="h-3 w-3"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  <span className="truncate">
                                    {option.name}
                                  </span>
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>

            {isLoading ? (
              <div className="flex w-full align-middle justify-center">
                <span className="mr-4">Adding contract</span>
                <Spinner className="h-6 w-6 text-blue-neptune" />
              </div>
            ) : isSuccess ? (
              <div className="flex align-middle justify-center">
                <span className="mr-4 text-green">Contract added</span>
                <SuccessCheckMark className="h-6 w-6 text-green" />
              </div>
            ) : (
              <button
                className="text-black font-sans disabled:bg-opacity-60 disabled:cursor-not-allowed font-medium bg-white rounded-lg px-8 py-3.5"
                value=""
                onClick={handleRequest}
                disabled={!formValidation}
              >
                Add contract to project
              </button>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}
