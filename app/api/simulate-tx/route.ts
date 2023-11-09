import { Hex, createPublicClient, http, parseAbi } from "viem"
import { z } from "zod"

import { getNetwork } from "@/utils/network"
import { getNetworkRPC } from "@/utils/getNetworkRPC"

const schema = z.object({
  chainId: z.number(),
  fromAddress: z.string().startsWith("0x"),
  toAddress: z.string().startsWith("0x"),
  functionSignature: z.string(),
  args: z.any(),
  dataSuffix: z.string(),
  value: z.string(),
})

const SIMULATION_SUCCESS = "Simulation successful"
const SIMULATION_ERROR = "Error simulating transaction"

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

export async function POST(req: Request) {
  const body = await req.json()
  const res = schema.safeParse(body)

  if (!res.success) {
    return new Response(null, { status: 400 })
  }

  const {
    chainId,
    fromAddress,
    toAddress,
    functionSignature,
    args,
    dataSuffix,
  } = res.data

  const networkConfig = getNetwork(chainId)
  const rpcUrl = getNetworkRPC(chainId)

  if (!networkConfig)
    return new Response("Invalid Network ID provided", { status: 400 })

  const client = createPublicClient({
    chain: networkConfig,
    transport: http(rpcUrl, { batch: true }),
  })

  const abi = [`function ${functionSignature} returns ()`]
  try {
    await client.simulateContract({
      address: toAddress as Hex,
      abi: parseAbi(abi),
      functionName: functionSignature.split("(")[0],
      args: args,
      account: fromAddress as Hex,
      dataSuffix: dataSuffix as Hex,
    })
    return Response.json(
      { success: true, message: SIMULATION_SUCCESS },
      { status: 200 }
    )
  } catch (e) {
    if (!(e instanceof Error))
      return Response.json({ success: false, message: SIMULATION_ERROR })

    if (e.toString().includes("ContractFunctionExecutionError")) {
      const message = e.message.split("Contract Call:")[0].trim()
      return Response.json({
        success: false,
        message: message,
      })
    }
    if (e.toString().includes("AbiErrorSignatureNotFoundError")) {
      const errorCode = e.message
        .split(`Encoded error signature "`)[1]
        .split(`"`)[0]

      const message = await decodeErrorAttempt(errorCode)
      return Response.json({
        success: false,
        message: message,
      })
    }

    return Response.json({ success: false, message: SIMULATION_ERROR })
  }
}
