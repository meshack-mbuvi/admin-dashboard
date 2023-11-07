import "server-only"
import { NetworkId } from "./network"

export function getNetworkRPC(networkId: NetworkId | number) {
  switch (networkId) {
    case 1:
      return process.env.ALCHEMY_MAINNET_URL

    case 5:
      return process.env.ALCHEMY_GOERLI_URL

    case 137:
      return process.env.ALCHEMY_POLYGON_URL

    case 1442:
      return process.env.ALCHEMY_ZKEVM_TESTNET_URL

    case 80001:
      return process.env.ALCHEMY_MUMBAI_URL

    default:
      return
  }
}
