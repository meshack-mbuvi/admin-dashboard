import { goerli, mainnet, polygon, Chain } from "@wagmi/chains"

export const networks = {
  1: mainnet,
  5: goerli,
  137: polygon,
} as const

export type NetworkId = keyof typeof networks

export const getNetwork = (networkId: NetworkId): Chain => {
  return networks[networkId]
}
