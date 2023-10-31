import { useMemo } from "react"

import { getNetworkIcon } from "@/utils/getNetworkIcon"
import { getNetwork } from "@/utils/network"

export function useNetworkInfo(networkId: number) {
  const networkInfo = useMemo(() => {
    const network = getNetwork(networkId)
    const networkIcon = getNetworkIcon(networkId, "w-5 h-5")
    return { networkIcon, network }
  }, [networkId])
  return networkInfo
}
