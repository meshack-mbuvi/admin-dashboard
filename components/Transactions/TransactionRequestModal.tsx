import { useMemo } from "react"
import { Hex as HexType, decodeFunctionData, parseAbi } from "viem"
import { useParams } from "next/navigation"
import clsx from "clsx"

import Modal from "@/components/Modal"
import StructArg from "./atoms/StructArg"
import Spinner from "../icons/Spinner"
import Hex from "../Shared/Hex"
import CopyToClipboard from "../CopyToClipboard"
import useGetProjectWallets from "@/hooks/useGetProjectWallets"
import useTransactionSimulation from "@/hooks/useTransactionSimulation"
import { NetworkId } from "@/utils/getNetwork"
import { SIMULATION_SUCCESS } from "@/utils/simulateTransaction"
import { isObject } from "@/utils/isObject"
import ArrayArg from "./atoms/ArrayArg"

interface TransactionRequestModalProps {
  showModal: boolean
  onCloseModal: () => void
  chainId?: number
  contractAddress?: string
  functionSignature?: string
  calldata?: string
  value?: string
}

export default function TransactionRequestModal({
  showModal,
  onCloseModal,
  chainId,
  contractAddress,
  functionSignature,
  calldata,
  value,
}: TransactionRequestModalProps) {
  const { projectId } = useParams()
  const { data: wallets, isLoading } = useGetProjectWallets({
    projectId,
  })

  const functionArgs = useMemo(() => {
    if (!functionSignature || !calldata) return

    const cleanData = calldata.substring(0, calldata.length - 70)
    const abi = [`function ${functionSignature} returns ()`]
    const { args } = decodeFunctionData({
      abi: parseAbi(abi),
      data: cleanData as HexType,
    })

    return args || []
  }, [functionSignature, calldata])

  const { data: simulationResult } = useTransactionSimulation(
    {
      chainId: chainId as NetworkId,
      fromAddress: wallets?.[0].walletAddress as HexType,
      toAddress: contractAddress as HexType,
      functionSignature: functionSignature as string,
      args: functionArgs,
      // Syndicate appended data (aka "syn"+uuid)
      dataSuffix: `0x${calldata?.substring(calldata.length - 70)}`,
      value: value as string,
    },
    Boolean(!isLoading && wallets && functionArgs)
  )

  return (
    <Modal show={showModal} closeModal={onCloseModal} outsideOnClick={true}>
      <div>
        <div className="text-2xl font-medium mb-5">Transaction Request</div>
        <div className="divide-y divide-gray-6">
          {contractAddress && (
            <div className="py-4 flex flex-col">
              <span className="text-gray-3 text-base font-semibold py-1">
                Contract Address
              </span>
              <Hex
                hexType="address"
                hexValue={contractAddress}
                chainId={chainId as NetworkId}
                truncate={false}
                className="text-sm"
              />
            </div>
          )}

          {functionSignature && (
            <div className="py-4 flex flex-col">
              <span className="text-gray-3 font-semibold text-base py-1">
                Function Signature
              </span>
              <span className="py-1 text-sm font-mono">
                {functionSignature}
              </span>
            </div>
          )}

          {functionArgs && functionArgs.length > 0 && (
            <div className="py-4 flex flex-col">
              <span className="text-gray-3 font-semibold text-base py-1">
                Inputs
              </span>

              <span className="py-1 text-sm font-mono">
                {functionArgs.map((arg, i) => {
                  if (isObject(arg)) {
                    return (
                      <div className="flex" key={i}>
                        <div>{i}: </div>
                        <StructArg struct={arg} />
                      </div>
                    )
                  }

                  if (Array.isArray(arg)) {
                    return (
                      <div className="flex" key={i}>
                        <div>{i}: </div>
                        <ArrayArg array={arg} />
                      </div>
                    )
                  }

                  return (
                    <p key={i}>
                      {i}: {arg?.toString() || "error parsing input"}
                    </p>
                  )
                })}
              </span>
            </div>
          )}

          {calldata && (
            <div className="py-4 break-words flex flex-col">
              <span className="text-gray-3 font-semibold text-base py-1">
                Calldata
              </span>

              <span className="py-1 font-mono text-sm group">
                {calldata}
                <CopyToClipboard
                  text={calldata}
                  className="invisible group-hover:visible"
                />
              </span>
            </div>
          )}
          {/* TODO: Add value when we allow users to send value with requests */}
          {/* <div className="py-4 flex flex-col">
            <span className="text-gray-3 font-semibold text-base py-1">Value</span>
            <span className="py-1 font-mono text-sm">{value}</span>
          </div> */}
          {simulationResult ? (
            <div className="py-4 break-words flex flex-col">
              <span className="text-gray-3 font-semibold text-base py-1">
                Failure Reason
              </span>
              <span
                className={clsx(
                  "py-1 text-sm font-mono",
                  simulationResult === SIMULATION_SUCCESS
                    ? "text-green"
                    : "text-red"
                )}
              >
                {simulationResult}
              </span>
            </div>
          ) : (
            // We need wallets and functionArgs to simulate the transaction
            !!wallets &&
            !!functionArgs && (
              <div className="py-4 flex">
                <Spinner className="w-10 animate-spin p-1" />
                <span className="p-1">
                  Attempting transaction simulation...
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </Modal>
  )
}
