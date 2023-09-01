import { Hex, createPublicClient, http, parseAbi } from "viem"
import { getNetworkConfig } from "./networkConfigs"

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

export async function simulateTransaction({
  chainId,
  fromAddress,
  toAddress,
  functionSignature,
  args,
  dataSuffix,
}: SimulateTransaction) {
  const networkConfig = getNetworkConfig(chainId.toString())

  if (!networkConfig) throw new Error("Invalid Network ID provided")

  const client = createPublicClient({
    chain: networkConfig.chain,
    transport: http(networkConfig.rpcUrl, { batch: true }),
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
    if ((e as Error).message.includes("reverted with the following reason")) {
      return (e as Error).message.split("Contract Call:")[0].trim()
    }

    return SIMULATION_ERROR
  }
}
