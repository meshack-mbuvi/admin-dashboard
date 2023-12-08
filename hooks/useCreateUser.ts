import { useMutation, useQueryClient } from "@tanstack/react-query"

import { SessionToken } from "@/utils/gatewayFetch";
import gatewayFetch, {
  ResponseError,
} from "@/utils/gatewayFetch"

export interface CreateUserParams extends SessionToken {
  name: string;
  email: string;
}

export default function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation<Response, ResponseError, CreateUserParams>(({ sessionToken, ...user }) => gatewayFetch({
    method: "POST",
    endpointPath: "/admin/user",
    body: JSON.stringify({
      ...user,
      roleTitle: "admin"
    }),
    sessionToken
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      })
    },
  })
}
