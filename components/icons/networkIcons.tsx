import Ethereum from "./Ethereum"
import Polygon from "./Polygon"

export const getNetworkIcon = (
  networkId = 1,
  className = "",
  currentColor = ""
) => {
  const ethereumCurrentColor = currentColor ? currentColor : "#627EEA"
  switch (networkId) {
    case 1:
      return (
        <Ethereum className={className} currentColor={ethereumCurrentColor} />
      )

    case 137:
      const _currentColor = currentColor ? currentColor : "#8247E5"
      return <Polygon className={className} currentColor={_currentColor} />

    default:
      return (
        <Ethereum className={className} currentColor={ethereumCurrentColor} />
      )
  }
}
