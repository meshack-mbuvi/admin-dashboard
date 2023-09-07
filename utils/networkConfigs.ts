import {
  goerli,
  mainnet,
  polygon,
  polygonMumbai,
  polygonZkEvmTestnet,
} from "viem/chains"

export function getNetworkConfig(networkId: string) {
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

    case "1442":
      return {
        chain: polygonZkEvmTestnet,
        rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_ZKEVM_TESTNET_URL,
      }

    case "80001":
      return {
        chain: polygonMumbai,
        rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_URL,
      }
  }
}
