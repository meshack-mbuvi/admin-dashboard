import gatewayFetch from "@/utils/gatewayFetch"
import { useQuery } from "@tanstack/react-query"
import useAuthToken from "./useAuthToken"

interface UseGetProjectWalletsArgs {
  projectId: string
}

type Wallets = {
  chainId: number
  createdAt: string
  isActive: boolean
  nonce: number
  organizationId: string
  projectId: string
  updatedAt: string
  walletAddress: string
  walletId: string
}

export default function useGetProjectWallets(args: UseGetProjectWalletsArgs) {
  const { projectId } = args
  const sessionToken = useAuthToken()

  return useQuery(
    ["get-project-wallets", projectId],
    async () => {
      const data = await gatewayFetch<Wallets[]>({
        endpointPath: `/wallet/project/${projectId}/wallets`,
        sessionToken,
      })

      return data
    },
    { enabled: !!sessionToken }
  )
}
