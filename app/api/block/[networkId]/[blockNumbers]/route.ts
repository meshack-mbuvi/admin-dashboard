import { NextResponse } from "next/server"
import { createPublicClient, http } from "viem"
import { goerli, mainnet, polygon, polygonMumbai } from "viem/chains"

const getConfig = (networkId: string) => {
  switch (networkId) {
    case "1":
      return {
        chain: mainnet,
        rpcUrl: "",
      }

    case "5":
      return {
        chain: goerli,
        rpcUrl: "",
      }

    case "137":
      return {
        chain: polygon,
        rpcUrl: "",
      }

    case "80001":
      return {
        chain: polygonMumbai,
        rpcUrl:
          "https://polygon-mumbai.g.alchemy.com/v2/zm77930PML8GJvZ6MP2_XyI_82XrfOBq",
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
