import Ethereum from "@/components/icons/Ethereum"
import Polygon from "@/components/icons/Polygon"

export const getNetworkIcon = (networkId: number, className?: string) => {
  switch (networkId) {
    case 1:
      return <Ethereum className={className} />

    case 137:
      return <Polygon className={className} />

    default:
      return null
  }
}
