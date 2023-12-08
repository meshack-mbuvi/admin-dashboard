export interface GatewayFetchArgs extends RequestInit {
  endpointPath: `/${string}`
  sessionToken?: string
}

export interface ResponseError extends Error {
  status?: number
}

export interface JsonAwaitableResponse<T> extends Response {
  json: () => Promise<T>
}

export interface AuthCode {
  authCode: string;
}
export interface SessionToken {
  sessionToken: string;
}


export default async function gatewayFetch(args: GatewayFetchArgs) {
  const { endpointPath, sessionToken, method, ...otherProps } = args

  const headers =  new Headers({
    Authorization: `Bearer Stytch ${sessionToken}`,
    ...otherProps.headers,
  })

  if (method === "POST") {
    headers.set("Content-Type", "application/json")
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpointPath}`, {
    ...otherProps,
    method,
    headers,
  })

  if (!res.ok) {
    const error: ResponseError = new Error(`Failed to fetch ${endpointPath}`)
    error.status = res.status
    throw error
  }

  return res
}
