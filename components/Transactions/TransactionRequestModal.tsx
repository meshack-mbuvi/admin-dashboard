import { Hex as HexType } from "viem"
import { useParams } from "next/navigation"
import clsx from "clsx"

import Modal from "@/components/Modal"
import Spinner from "../icons/Spinner"
import Hex from "../Shared/Hex"
import CopyToClipboard from "../CopyToClipboard"
import DateTimestamp from "../Shared/Datestamp"

import useGetProjectWallets from "@/hooks/useGetProjectWallets"
import useTransactionSimulation from "@/hooks/useTransactionSimulation"
import { RequestsDataType } from "@/hooks/useGetRequests"
import { NetworkId } from "@/utils/network"
import { isObject } from "@/utils/isObject"
import getFirstOrString from "@/utils/getFirstOrString"
import StructArg from "./atoms/StructArg"
import ArrayArg from "./atoms/ArrayArg"

interface TransactionRequestModalProps {
  showModal: boolean
  onCloseModal: () => void
  request: RequestsDataType | null
}

export default function TransactionRequestModal(
  props: TransactionRequestModalProps
) {
  const { showModal, onCloseModal, request } = props
  const {
    contractAddress,
    functionSignature,
    value,
    chainId,
    data: calldata,
    decodedData: functionArgs,
  } = request || {}
  const { projectId } = useParams()
  const { data: wallets, isLoading } = useGetProjectWallets({
    projectId: getFirstOrString(projectId),
  })
  const functionArgKeys = Object.keys(functionArgs || {})

  const { data: simulationResult } = useTransactionSimulation(
    {
      chainId: chainId as NetworkId,
      fromAddress: wallets?.[0].walletAddress as HexType,
      toAddress: contractAddress as HexType,
      functionSignature: functionSignature as string,
      // Arguments are returned from the server as an object with names or indices as keys
      args: functionArgKeys.map((key) => functionArgs?.[key]),
      // Syndicate appended data (aka "syn"+uuid)
      dataSuffix: `0x${calldata?.substring(calldata.length - 70)}`,
      value: value as string,
    },
    Boolean(!isLoading && wallets && functionArgs)
  )

  const isSuccess = simulationResult?.success

  return (
    <Modal
      show={showModal}
      closeModal={onCloseModal}
      outsideOnClick={true}
      overflowYScroll
    >
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

          {functionArgs && functionArgKeys.length > 0 && (
            <div className="py-4 flex flex-col">
              <span className="text-gray-3 font-semibold text-base py-1">
                Inputs
              </span>

              <span className="py-1 text-sm font-mono">
                {functionArgKeys.map((name, index) => {
                  const value = functionArgs[name]
                  const key = `${name}-${index}`
                  if (isObject(value)) {
                    return (
                      <div
                        className="flex overflow-hidden break-words"
                        key={key}
                      >
                        <div>{name}: </div>
                        <StructArg struct={value} />
                      </div>
                    )
                  }

                  if (Array.isArray(value)) {
                    return (
                      <div
                        className="flex overflow-hidden break-words"
                        key={key}
                      >
                        <div>{name}: </div>
                        <ArrayArg array={value} />
                      </div>
                    )
                  }

                  return (
                    <p key={key} className="overflow-hidden break-words">
                      {name}: {value.toString() || "error parsing input"}
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
                Simulation Result
              </span>
              <span
                className={clsx(
                  "py-1 text-sm font-mono",
                  isSuccess ? "text-green" : "text-red"
                )}
              >
                {simulationResult?.message}
                {isSuccess && (
                  <>
                    {" "}
                    as of{" "}
                    <DateTimestamp date={new Date().toJSON() ?? ""} showTime />
                  </>
                )}
              </span>
              {isSuccess && (
                <span className="text-sm text-gray-3 mt-3">
                  We simulate the transaction based on the current blockchain
                  state, this means the transaction may have initially failed.
                </span>
              )}
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
