import { useQuery } from "@tanstack/react-query"

import gatewayFetch from "@/utils/gatewayFetch"
import useAuthToken from "./useAuthToken"

interface UseGetProjectMetadataArgs {
  page: number;
  limit: number;
  projectId: string;
}

export interface TokenMetadata {
  createdAt: string;
  updatedAt: string;
  chainId: number;
  tokenAddress: string;
  tokenId: string;
  metadataId: string;
}

type GetTokenMetadataResponse = {
  metadata: TokenMetadata[];
  total: number;
}

export default function useGetTokenMetadata(args: UseGetProjectMetadataArgs) {
  const { projectId, page, limit } = args
  const sessionToken = useAuthToken()
  return useQuery(
    ["get-contract-metadata", projectId, page, limit],
    async () => {
      const res = await gatewayFetch({
        endpointPath: `/token-metadata/${projectId}?page=${page}&limit=${limit}`,
        sessionToken,
      })
      const data = (await res.json()) as GetTokenMetadataResponse
      return data
    },
    { enabled: !!sessionToken }
  )
}
