import { Hex, createPublicClient, http, parseAbi } from "viem"
import { getNetwork, getNetworkRPC } from "./network"

export interface SimulateTransaction {
  chainId: number
  fromAddress: Hex
  toAddress: Hex
  functionSignature: string
  args: any
  dataSuffix: Hex
  value: string
}

export const SIMULATION_SUCCESS = "Simulation successful"
export const SIMULATION_ERROR = "Error simulating transaction"

const decodeErrorAttempt = async (error: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.openchain.xyz/signature-database/v1/lookup?function=${error}`
    )
    const result = (await response.json()).result.function[error][0].name
    return `Decoded error: ${result}`
  } catch (e) {
    return `Unknown encoded error: ${error}`
  }
}

export async function simulateTransaction({
  chainId,
  fromAddress,
  toAddress,
  functionSignature,
  args,
  dataSuffix,
}: SimulateTransaction) {
  const networkConfig = getNetwork(chainId)
  const rpcUrl = getNetworkRPC(chainId)

  if (!networkConfig || !rpcUrl) throw new Error("Invalid Network ID provided")

  const client = createPublicClient({
    chain: networkConfig,
    transport: http(rpcUrl, { batch: true }),
  })

  const abi = [`function ${functionSignature} returns ()`]
  try {
    await client.simulateContract({
      address: toAddress,
      abi: parseAbi(abi),
      functionName: functionSignature.split("(")[0],
      args: args,
      account: fromAddress,
      dataSuffix: dataSuffix,
    })
    return SIMULATION_SUCCESS
  } catch (e) {
    if (!(e instanceof Error)) return SIMULATION_ERROR

    if (e.toString().includes("ContractFunctionExecutionError")) {
      return e.message.split("Contract Call:")[0].trim()
    }
    if (e.toString().includes("AbiErrorSignatureNotFoundError")) {
      const errorCode = e.message
        .split(`Encoded error signature "`)[1]
        .split(`"`)[0]

      return await decodeErrorAttempt(errorCode)
    }

    return SIMULATION_ERROR
  }
}
