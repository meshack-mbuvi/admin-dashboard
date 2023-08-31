import { useMemo } from "react"
import { Hex as HexType, decodeFunctionData, parseAbi } from "viem"
import { useParams } from "next/navigation"
import clsx from "clsx"

import Modal from "@/components/Modal"
import { SIMULATION_SUCCESS } from "@/utils/simulateTransaction"
import useGetProjectWallets from "@/hooks/useGetProjectWallets"
import Spinner from "../icons/Spinner"
import Hex from "../Shared/Hex"
import { NetworkId } from "@/utils/getNetwork"
import CopyToClipboard from "../CopyToClipboard"
import useTransactionSimulation from "@/hooks/useTransactionSimulation"

interface TransactionRequestModalProps {
  show: boolean
  closeModal: () => void
  chainId: number
  contractAddress: string
  functionSignature: string
  calldata: string
  value: string
}
export default function TransactionRequestModal({
  show,
  closeModal,
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
    if (!functionSignature || !calldata) return undefined

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
      chainId,
      fromAddress: wallets ? (wallets[0].walletAddress as HexType) : "0x",
      toAddress: contractAddress as HexType,
      functionSignature,
      args: functionArgs,
      // Syndicate appended data (aka "syn"+uuid)
      dataSuffix: `0x${calldata.substring(calldata.length - 70)}`,
      value,
    },
    !isLoading && !!wallets && !!functionArgs
  )

  return (
    <Modal show={show} closeModal={closeModal} outsideOnClick={true}>
      <div>
        <div className={"text-2xl font-medium mb-5"}>Transaction Request</div>
        <div className="divide-y divide-gray-6">
          <div className="font-mono text-sm py-4 flex flex-col">
            <span className="text-gray-3 font-semibold text-sm py-1">
              Contract Address:
            </span>
            <Hex
              hexType="address"
              hexValue={contractAddress}
              chainId={chainId as NetworkId}
              truncate={false}
            />
          </div>
          {functionSignature && (
            <div className="font-mono text-sm py-4 flex flex-col">
              <span className="text-gray-3 font-semibold text-sm py-1">
                Function Signature:
              </span>
              <span className="py-1">{functionSignature}</span>
            </div>
          )}
          {functionArgs && functionArgs.length > 0 && (
            <div className="font-mono text-sm py-4 flex flex-col">
              <span className="text-gray-3 font-semibold text-sm py-1">
                Inputs:
              </span>
              <span className="py-1">
                {functionArgs.map((arg, i) => (
                  <p key={i}>
                    {i}: {arg.toString()}
                  </p>
                ))}
              </span>
            </div>
          )}
          <div className="font-mono text-sm py-4 break-words flex flex-col">
            <span className="text-gray-3 font-semibold text-sm py-1">
              Calldata:
            </span>
            <span className="group">
              <span className="py-1">{calldata}</span>
              <CopyToClipboard
                text={calldata}
                className="invisible group-hover:visible"
              />
            </span>
          </div>
          {/* TODO: Add value when we allow users to send value with requests */}
          {/* <div className="font-mono text-sm py-4 flex flex-col">
            <span className="text-gray-3 font-semibold text-sm py-1">Value:</span>
            <span className="py-1">{value}</span>
          </div> */}
          {simulationResult ? (
            <div className="font-mono text-sm py-4 break-words flex flex-col">
              <span className="text-gray-3 font-semibold text-sm py-1">
                Failure Reason:
              </span>
              <span
                className={clsx(
                  "py-1",
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
