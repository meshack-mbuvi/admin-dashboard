import Ethereum from "@/components/icons/Ethereum"
import Polygon from "@/components/icons/Polygon"

export const getNetworkIcon = (networkId: number, className?: string) => {
  switch (networkId) {
    // Ethereum Mainnet
    case 1:
      return <Ethereum className={className} />
    // Polygon Mainnet
    case 137:
    // Polygon Mumbai
    case 80001:
      return <Polygon className={className} />
    default:
      return null
  }
}
