import { NextResponse } from "next/server"
import { createPublicClient, http } from "viem"
import { goerli, mainnet, polygon, polygonMumbai } from "viem/chains"

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
        rpcUrl:
        process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_URL,
      }
  }
}

export async function GET(
  _: Request,
  { params }: { params: { blockNumbers: string; networkId: string } }
) {
  const blockNumbers = params.blockNumbers.split(",")

  const config = getConfig(params.networkId)

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
