import { NextResponse } from "next/server"
import { createPublicClient, http } from "viem"
import { goerli, mainnet, polygon, polygonMumbai } from "viem/chains"

import { NetworkId } from "@/utils/getNetwork"

const getConfig = (networkId: NetworkId) => {
  switch (networkId) {
    case 1:
      return {
        chain: mainnet,
        rpcUrl: "",
      }

    case 5:
      return {
        chain: goerli,
        transport: http("", { batch: true }),
      }

    case 137:
      return {
        chain: polygon,
        transport: http("", { batch: true }),
      }

    case 80001:
      return {
        chain: polygonMumbai,
        transport: http(
          "https://polygon-mumbai.g.alchemy.com/v2/zm77930PML8GJvZ6MP2_XyI_82XrfOBq",
          { batch: true }
        ),
      }
  }
}

export async function GET(
  _: Request,
  { params }: { params: { blockNumbers: string; networkId: NetworkId } }
) {
  const blockNumbers = params.blockNumbers.split(",")

  const config = getConfig(params.networkId)

  const client = createPublicClient({
    chain: config.chain,
    transport: http(config.rpcUrl, { batch: true }),
  })

  const resultsArray = await Promise.all(
    blockNumbers.map((bn) => {
      return client.getBlock({ blockNumber: BigInt(bn) })
    })
  )

  const data = resultsArray.map((result) => {
    return {
      block: result.number?.toString(),
      timestamp: result.timestamp.toString(),
    }
  })

  return NextResponse.json({ data })
}
