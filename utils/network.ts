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
