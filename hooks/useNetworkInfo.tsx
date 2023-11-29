import { useMemo } from "react"

import NetworkIcon from "@/components/NetworkIcon"
import { getNetwork } from "@/utils/network"

export function useNetworkInfo(networkId: number) {
  const networkInfo = useMemo(() => {
    const network = getNetwork(networkId)
    const networkIcon = (
      <NetworkIcon networkId={networkId} className="w-5 h-5" />
    )
    return { networkIcon, network }
  }, [networkId])
  return networkInfo
}
