import { networks } from "@/utils/network"
import { useQuery } from "@tanstack/react-query"

const networkQueryStrings: { [x: number]: string } = {
  [networks[11155111].id]: "sepolia",
  [networks[137].id]: "polygon",
  [networks[1442].id]: "polygonZkEvmTestnet",
  [networks[80001].id]: "polygonMumbai",
  [networks[8453].id]: "base",
  [networks[84531].id]: "baseGoerli",
  [networks[10].id]: "optimism",
  [networks[420].id]: "optimismGoerli",
}

export default function useContractABI(
  contractAddress: string,
  networkId: number | null
) {
  return useQuery(
    ["get-contract-abi", contractAddress, networkId],
    async () => {
      if (!contractAddress) return
      const baseurl = `https://abidata.net/${contractAddress}${
        networkId === 1 || !networkId
          ? ""
          : `?network=${networkQueryStrings[networkId]}`
      }`
      const response = await fetch(baseurl)
      const json = await response.json()

      if (!json.ok) throw new Error(json.error)

      return json.abi
    },
    {
      enabled: !!contractAddress && !!networkId,
      retry: 0,
    }
  )
}
