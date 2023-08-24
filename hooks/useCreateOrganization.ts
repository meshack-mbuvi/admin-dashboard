import gatewayFetch, {
  GatewayFetchArgs,
  ResponseError,
} from "@/utils/gatewayFetch"
import { useMutation } from "@tanstack/react-query"

export default function useCreateOrganization() {
  return useMutation<Response, ResponseError, GatewayFetchArgs>(gatewayFetch)
}
