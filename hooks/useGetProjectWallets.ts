import gatewayFetch from "@/utils/gatewayFetch"
import { useQuery } from "@tanstack/react-query"
import useAuthToken from "./useAuthToken"

interface UseGetProjectWalletsArgs {
  projectId: string
}

export type Wallets = {
  chainId: number
  createdAt: string
  isActive: boolean
  nonce: number
  organizationId: string
  projectId: string
  updatedAt: string
  walletAddress: string
  walletId: string
  txCount: number
}

export default function useGetProjectWallets(args: UseGetProjectWalletsArgs) {
  const { projectId } = args
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-project-wallets", projectId],
    async () => {
      const res = await gatewayFetch({
        endpointPath: `/wallet/project/${projectId}/wallets?withData=true`,
        sessionToken,
      })

      const data = (await res.json()) as Wallets[]

      return data
    },
    { enabled: !!sessionToken }
  )
}
