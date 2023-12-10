import {
  goerli,
  mainnet,
  polygon,
  Chain,
  polygonMumbai,
  polygonZkEvmTestnet,
  base,
  baseGoerli,
  optimism,
  optimismGoerli,
  sepolia,
} from "viem/chains"

export const networks = {
  // Ethereum L1
  [mainnet.id]: mainnet,
  [goerli.id]: goerli,
  [sepolia.id]: sepolia,
  // Polygon L2
  [polygon.id]: polygon,
  [polygonZkEvmTestnet.id]: polygonZkEvmTestnet,
  [polygonMumbai.id]: polygonMumbai,
  // Base L2
  [base.id]: base,
  [baseGoerli.id]: baseGoerli,
  // Optimism L2
  [optimism.id]: optimism,
  [optimismGoerli.id]: optimismGoerli,
} as const

export const testnetNetworks = [
  goerli.id,
  sepolia.id,
  polygonZkEvmTestnet.id,
  polygonMumbai.id,
  baseGoerli.id,
  optimismGoerli.id,
]

export type NetworkId = keyof typeof networks
export type TestnetNetworkID = (typeof testnetNetworks)[number]

export const isKnownNetwork = (
  networkId: NetworkId | number
): networkId is NetworkId => networkId in networks

export const getNetwork = (networkId: NetworkId | number): Chain | null => {
  if (isKnownNetwork(networkId)) return networks[networkId]

  return null
}

export const isTestnetNetwork = (
  networkId: any
): networkId is TestnetNetworkID => {
  return testnetNetworks.includes(networkId)
}
