import { goerli, mainnet, polygon, Chain } from "@wagmi/chains"

export const networks = {
  1: mainnet,
  5: goerli,
  137: polygon,
} as const

export const getNetwork = (networkId: keyof typeof networks): Chain => {
  return networks[networkId]
}
