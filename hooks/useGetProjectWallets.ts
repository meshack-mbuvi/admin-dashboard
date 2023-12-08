import gatewayFetch from "@/utils/gatewayFetch"
import { UseQueryResult, useQuery } from "@tanstack/react-query"

import useAuthToken from "./useAuthToken"
import { NetworkId } from "@/utils/network"
import { DateTime, Nullable } from "@/types/utils"

interface UseGetProjectWalletsArgs {
  projectId: string
  withOnchainData?: boolean
}

export type Wallet = {
  chainId: NetworkId
  createdAt: DateTime
  isActive: boolean
  nonce: number
  projectId: string
  updatedAt: DateTime
  walletAddress: string
  walletId: string
  txCount: number
  balance: Nullable<string>
}

export type WalletNoData = Omit<Wallet, "txCount">

export function useGetProjectWallets(
  args: UseGetProjectWalletsArgs & { withOnchainData: true }
): UseQueryResult<Wallet[], unknown>
export function useGetProjectWallets(
  args: UseGetProjectWalletsArgs & { withOnchainData: false }
): UseQueryResult<WalletNoData[], unknown>
export function useGetProjectWallets(
  args: UseGetProjectWalletsArgs
): UseQueryResult<Wallet[] | WalletNoData[], unknown>

export default function useGetProjectWallets(args: UseGetProjectWalletsArgs) {
  const { projectId, withOnchainData = false } = args
  const sessionToken = useAuthToken()

  const searchParams = {
    ...(withOnchainData && { withData: "true" }),
  }
  const searchQuery = new URLSearchParams(searchParams)

  return useQuery(
    ["get-project-wallets", projectId, withOnchainData, sessionToken],
    async () => {
      const res = await gatewayFetch({
        endpointPath: `/wallet/project/${projectId}/wallets?${searchQuery.toString()}`,
        sessionToken,
      })

      const data = (await res.json()) as Wallet[] | WalletNoData[]

      return data
    },
    { enabled: !!sessionToken, retry: 6 }
  )
}
