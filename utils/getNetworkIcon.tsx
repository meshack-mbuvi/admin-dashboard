import Ethereum from "@/components/icons/Ethereum"
import Polygon from "@/components/icons/Polygon"
import Base from "@/components/icons/Base"

export const getNetworkIcon = (networkId: number, className?: string) => {
  switch (networkId) {
    case 1: // Ethereum Mainnet
    case 5: // Goerli
      return <Ethereum className={className} />

    case 137: // Polygon Mainnet
    case 1442: // Polygon zkEVM Testnet
    case 80001: // Polygon Mumbai
      return <Polygon className={className} />

    case 8453: // Base Mainnet
    case 84531: //Base Goerli
      return <Base className={className} />

    default:
      return null
  }
}
