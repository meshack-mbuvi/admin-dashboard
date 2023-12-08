import { useMutation, useQueryClient } from "@tanstack/react-query"

import gatewayFetch, {
  JsonAwaitableResponse,
  ResponseError,
} from "@/utils/gatewayFetch"
import { DateTime, Nullable } from "@/types/utils";
import { SessionToken } from "@/utils/gatewayFetch";
import { NetworkId } from "@/utils/network"


interface CreateNewContractParams extends SessionToken {
  name: string;
  address: string;
  chainId: number;
  functionSignatures: string[];
  projectId: string;
}

export interface Contract {
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  deletedAt: Nullable<DateTime>;
  chainId: NetworkId;
  address: string;
  name: string;
  expiresAt: Nullable<DateTime>;
  functionSignatures: FunctionSignature[];
  projectId: string;
  claimedByOrganizationId: Nullable<string>;
}

interface FunctionSignature {
  id: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  deletedAt: Nullable<DateTime>;
  signature: string;
  functionAbi: FunctionAbi;
  hashedSignature: string;
  payable: boolean;
  contractId: string;
}

interface FunctionAbi {
  name: string;
  type: string;
  inputs: object[];
  stateMutability: string;
}

export default function useCreateContract() {
  const queryClient = useQueryClient()
  return useMutation<JsonAwaitableResponse<Contract>, ResponseError, CreateNewContractParams>(({
    sessionToken,
    ...contract
  }) => gatewayFetch({
    method: "POST",
    endpointPath: "/admin/contract/authorizeWithFunctionSignatures",
    body: JSON.stringify(contract),
    sessionToken
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-project-by-id"],
      })
    },
  })
}
