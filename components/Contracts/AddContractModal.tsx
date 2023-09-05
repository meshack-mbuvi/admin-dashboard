import clsx from "clsx"
import { AbiFunction, AbiParameter } from "abitype"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState, Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { useDebouncedCallback } from "use-debounce"
import { isAddress } from "viem"

import Modal from "@/components/Modal"
import Check from "@/components/icons/Check"
import Input from "@/components/inputs/Input"
import { Spinner } from "@/components/Spinner"
import NetworkDropdown from "@/components/inputs/NetworkDropdown"
import SuccessCheckMark from "@/components/icons/successCheckMark"
import ExternalLink from "@/components/Shared/ExternalLink"
import useCreateContract from "@/hooks/useCreateContract"
import useAuthToken from "@/hooks/useAuthToken"

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

const formatAbiParams = (abiParams: readonly AbiParameter[]): string => {
  const params = abiParams
    .map((i) => {
      if (i.type.includes("tuple")) {
        // @ts-ignore
        return `${formatAbiParams(i.components)}${i.type.split("tuple")[1]}`
      }
      return `${i.type}${i.name ? " " + i.name : ""}`
    })
    .join(", ")
  return `(${params})`
}

export default function AddContractModal(props: AddContractModalProps) {
  const { show, closeModal } = props
  const [name, setName] = useState<string>("")
  const [contractAddress, setContractAddress] = useState<string>("")
  const [contractABI, setContractABI] = useState<string>("")
  const [allowedFunctions, setAllowedFunctions] = useState<AbiFunction[]>([])
  const [networkId, setNetworkId] = useState<number>(0)
  const [nameErrorMessage, setNameErrorMessage] = useState<string>("")
  const [contractAddressErrorMessage, setContractAddressErrorMessage] =
    useState<string>("")

  const { isError, isSuccess, mutate, error, reset, isLoading } =
    useCreateContract()
  const sessionToken = useAuthToken()
  const { projectId } = useParams()

  const parsedABI = useMemo(() => {
    return parseABI(contractABI)
  }, [contractABI])

  const abiFunctions = useMemo(() => {
    return parsedABI?.filter(
      (a) => a.type === "function" && a.stateMutability !== "view"
    )
  }, [parsedABI])

  const functionSignatures = useMemo(() => {
    if (!allowedFunctions.length) return []
    const formattedFunctions = allowedFunctions.map(
      (allowedFunction) =>
        `${allowedFunction.name}${formatAbiParams(allowedFunction.inputs)}`
    )
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

  const handleRequest = () => {
    if (sessionToken) {
      mutate({
        method: "POST",
        sessionToken,
        endpointPath: "/admin/contract/createWithFunctionSignatures",
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
    if (isError && error.status === 409) {
      _statusText = "Contract already exists"
    }
    if (isSuccess) {
      setTimeout(() => {
        closeModal()
        reset()
      }, 1000)
    }
    setContractAddressErrorMessage(_statusText)
  }, [isError, error, isSuccess, contractAddress, closeModal, reset])

  return (
    <Modal
      show={show}
      closeModal={closeModal}
      outsideOnClick={true}
      overflowYScroll={true}
    >
      <div className="flex flex-col justify-center items-left bg-gray-8 my-4">
        <p className="font-sans font-medium text-2xl text-gray-1 mb-7">
          Add contract
        </p>
        <div className="flex flex-col justify-center items-left mb-7">
          <p className="font-sans font-medium text-white text-sm mb-2 bg-dark">
            Name
          </p>
          <Input
            className="bg-white/[0.01]"
            placeholder="My Contract XYZ"
            value={name}
            onChange={(e) => handleNameChange(e)}
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
            className="bg-white/[0.01]"
            placeholder="0x...."
            value={contractAddress}
            onChange={(e) => handleContractAddressChange(e)}
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
            className={clsx(
              "border bg-gray-8 outline-none border-gray-7 outline-offset-0 ring-0 focus:border-blue-neptune rounded-lg px-4 py-2 min-h-[100px] font-mono text-sm",
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
            disabled={!abiFunctions || !abiFunctions.length}
            by={"name"}
          >
            {({ open }) => (
              <>
                <div className="relative mt-2">
                  <Listbox.Button
                    className={clsx(
                      !allowedFunctions && "text-gray-4",
                      "flex gap-4 border bg-gray-8 outline-none border-gray-7 rounded-lg px-4 py-4 w-full text-left"
                    )}
                  >
                    <span
                      className={clsx(
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
                            clsx(
                              active ? "bg-white/10" : "",
                              "flex gap-4 cursor-default select-none py-2 pl-3 pr-9 max-h-38 rounded-lg"
                            )
                          }
                          value={option}
                        >
                          {({ selected }) => (
                            <div className="flex items-center justify-between">
                              <span
                                className={clsx(
                                  "pr-4",
                                  selected ? "visible" : "invisible"
                                )}
                              >
                                <Check className="h-3 w-3" aria-hidden="true" />
                              </span>
                              <span className="truncate">{option.name}</span>
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

        <div className="flex flex-col justify-center items-left mb-7">
          <NetworkDropdown
            currentNetwork={networkId}
            setCurrentNetwork={setNetworkId}
            placeholder="Select preliminary network"
            above={true}
          />
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

        <ExternalLink
          href="https://docs.syndicate.io"
          linkText="View Guide"
          className="mx-auto mt-6 text-yellow-secondary"
        />
      </div>
    </Modal>
  )
}
