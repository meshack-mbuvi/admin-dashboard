import {
  goerli,
  mainnet,
  polygon,
  Chain,
  polygonMumbai,
  polygonZkEvmTestnet,
} from "viem/chains"

export const networks = {
  1: mainnet,
  5: goerli,
  137: polygon,
  1442: polygonZkEvmTestnet,
  80001: polygonMumbai,
} as const

export type NetworkId = keyof typeof networks

export const isKnownNetwork = (
  networkId: NetworkId | number
): networkId is NetworkId => networkId in networks

export const getNetwork = (networkId: NetworkId | number): Chain | null => {
  if (isKnownNetwork(networkId)) return networks[networkId]

  return null
}

export function getNetworkRPC(networkId: NetworkId | number) {
  switch (networkId) {
    case 1:
      return process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_URL

    case 5:
      return process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_URL

    case 137:
      return process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_URL

    case 1442:
      return process.env.NEXT_PUBLIC_ALCHEMY_ZKEVM_TESTNET_URL

    case 80001:
      return process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_URL

    default:
      return
  }
}
