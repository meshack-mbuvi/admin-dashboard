import "server-only"
import { NetworkId, networks } from "./network"

export function getNetworkRPC(networkId: NetworkId | number) {
  switch (networkId) {
    case networks[1].id:
      return process.env.ALCHEMY_MAINNET_URL

    case networks[11155111].id:
      return process.env.ALCHEMY_SEPOLIA_URL

    case networks[137].id:
      return process.env.ALCHEMY_POLYGON_URL

    case networks[1442].id:
      return process.env.ALCHEMY_ZKEVM_TESTNET_URL

    case networks[80001].id:
      return process.env.ALCHEMY_MUMBAI_URL

    case networks[8453].id:
      return process.env.ALCHEMY_BASE_MAINNET_URL

    case networks[84531].id:
      return process.env.ALCHEMY_BASE_GOERLI_URL

    case networks[10].id:
      return process.env.ALCHEMY_OPTIMISM_MAINNET_URL

    case networks[420].id:
      return process.env.ALCHEMY_OPTIMISM_GOERLI_URL

    default:
      return
  }
}
