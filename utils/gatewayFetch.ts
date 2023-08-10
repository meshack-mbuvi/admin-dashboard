export interface GatewayFetchArgs extends RequestInit {
  endpointPath: `/${string}`
  sessionToken?: string
}

export interface ResponseError extends Error {
  status?: number
}

export default async function gatewayFetch(args: GatewayFetchArgs) {
  const { endpointPath, sessionToken, ...otherProps } = args

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpointPath}`, {
    ...otherProps,
    headers: new Headers({
      Authorization: `Bearer Stytch ${sessionToken}`,
      ...otherProps.headers,
    }),
  })

  if (!res.ok) {
    const error: ResponseError = new Error(`Failed to fetch ${endpointPath}`)
    error.status = res.status
    throw error
  }

  return res
}
