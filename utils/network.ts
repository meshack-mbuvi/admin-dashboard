import {
  goerli,
  mainnet,
  polygon,
  Chain,
  polygonMumbai,
  polygonZkEvmTestnet,
  base,
  baseGoerli,
} from "viem/chains"

export const networks = {
  // Ethereum L1
  [mainnet.id]: mainnet,
  [goerli.id]: goerli,
  // Polygon L2
  [polygon.id]: polygon,
  [polygonZkEvmTestnet.id]: polygonZkEvmTestnet,
  [polygonMumbai.id]: polygonMumbai,
  // Base L2
  [base.id]: base,
  [baseGoerli.id]: baseGoerli,
} as const

export type NetworkId = keyof typeof networks

export const isKnownNetwork = (
  networkId: NetworkId | number
): networkId is NetworkId => networkId in networks

export const getNetwork = (networkId: NetworkId | number): Chain | null => {
  if (isKnownNetwork(networkId)) return networks[networkId]

  return null
}
