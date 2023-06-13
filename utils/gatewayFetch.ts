interface GatewayFetchArgs extends RequestInit {
  endpointPath: `/${string}`
  sessionToken?: string
}

export default async function gatewayFetch<ResponseData>(
  args: GatewayFetchArgs
) {
  const { endpointPath, sessionToken, ...rest } = args
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpointPath}`, {
    ...rest,
    headers: new Headers({
      Authorization: `Session ${sessionToken}`,
      "Content-Type": "application/json",
    }),
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpointPath}`)
  }

  return res.json() as ResponseData
}
