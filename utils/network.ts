import { goerli, mainnet, polygon } from "@wagmi/chains"
/**
 * @type {import("@wagmi/chains").Chain}
 * returns the chain object for the given chainId
 */
export const chains: {
  [chainId: number]: import("@wagmi/chains").Chain
} = Object.freeze({
  1: mainnet,
  5: goerli,
  137: polygon,
})
