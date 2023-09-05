import { NextResponse } from "next/server"
import { createPublicClient, http } from "viem"

import { getNetworkConfig } from "@/utils/networkConfigs"

export async function GET(
  _: Request,
  { params }: { params: { blockNumbers: string; networkId: string } }
) {
  const blockNumbers = params.blockNumbers.split(",")

  const config = getNetworkConfig(params.networkId)

  if (!config)
    return NextResponse.json(
      { error: "Invalid Network ID provided" },
      { status: 400 }
    )

  const client = createPublicClient({
    chain: config.chain,
    transport: http(config.rpcUrl, { batch: true }),
  })

  const data = await Promise.all(
    blockNumbers.map(async (bn) => {
      const blockData = await client.getBlock({ blockNumber: BigInt(bn) })
      return {
        block: blockData.number?.toString(),
        timestamp: blockData.timestamp.toString(),
      }
    })
  )

  return NextResponse.json({ data })
}
