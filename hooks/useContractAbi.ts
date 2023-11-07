import { useQuery } from "@tanstack/react-query"

export const networks: { [x: number]: string } = {
  5: "goerli",
  137: "polygon",
  1442: "polygonZkEvmTestnet",
  80001: "polygonMumbai",
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
        networkId === 1 || !networkId ? "" : `?network=${networks[networkId]}`
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
