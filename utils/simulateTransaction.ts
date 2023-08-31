import { goerli, mainnet, polygon, polygonMumbai } from "viem/chains"
import { Hex, createPublicClient, http, parseAbi } from "viem"

const getConfig = (networkId: string) => {
  switch (networkId) {
    case "1":
      return {
        chain: mainnet,
        rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_URL,
      }

    case "5":
      return {
        chain: goerli,
        rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_URL,
      }

    case "137":
      return {
        chain: polygon,
        rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_URL,
      }

    case "80001":
      return {
        chain: polygonMumbai,
        rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_URL,
      }
  }
}

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
  const config = getConfig(chainId.toString())

  if (!config) throw new Error("Invalid Network ID provided")

  const client = createPublicClient({
    chain: config.chain,
    transport: http(config.rpcUrl, { batch: true }),
  })

  const abi = [`function ${functionSignature} returns ()`]
  try {
    const res = await client.simulateContract({
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
