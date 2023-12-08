import { useMutation } from "@tanstack/react-query"

import gatewayFetch, {
  ResponseError,
} from "@/utils/gatewayFetch"

export interface CreateOrganizationParams {
  organizationName: string;
  emailAddress: string;
  userName: string
}

export default function useCreateOrganization() {
  return useMutation<Response, ResponseError, CreateOrganizationParams>((organization) => gatewayFetch({
    method: "POST",
    endpointPath: "/public/createOrganization",
    body: JSON.stringify(organization),
  }))
}
