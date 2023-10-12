import gatewayFetch from "@/utils/gatewayFetch"
import { useQuery } from "@tanstack/react-query"
import useAuthToken from "./useAuthToken"

interface UseGetProjectWalletsArgs {
  projectId: string
  withBalanceData?: boolean
}

export type Wallets = {
  chainId: number
  createdAt: string
  isActive: boolean
  nonce: number
  projectId: string
  updatedAt: string
  walletAddress: string
  walletId: string
  txCount: number
}

export default function useGetProjectWallets(args: UseGetProjectWalletsArgs) {
  const { projectId, withBalanceData } = args
  const sessionToken = useAuthToken()

  const searchParams = {
    ...(withBalanceData && { withData: "true" }),
  }
  const searchQuery = new URLSearchParams(searchParams)

  return useQuery(
    ["get-project-wallets", projectId, withBalanceData],
    async () => {
      const res = await gatewayFetch({
        endpointPath: `/wallet/project/${projectId}/wallets?${searchQuery.toString()}`,
        sessionToken,
      })

      const data = (await res.json()) as Wallets[]

      return data
    },
    { enabled: !!sessionToken }
  )
}
