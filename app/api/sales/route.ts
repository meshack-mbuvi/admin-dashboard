const verifyEndpoint =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"

export async function POST(request: Request) {
  const { token, company, email, name, referrer, flag } = await request.json()

  const verifyRes = await fetch(verifyEndpoint, {
    method: "POST",
    body: `secret=${encodeURIComponent(
      process.env.TURNSTILE_SECRET as string
    )}&response=${encodeURIComponent(token)}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })

  const verifyData = await verifyRes.json()

  if (!verifyData.success) {
    return new Response(null, { status: 400 })
  }

  const res = await fetch(
    "https://hooks.zapier.com/hooks/catch/10683366/3if2hva/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company,
        email,
        name,
        sales: true,
        referrer,
      }),
    }
  )

  const data = await res.json()

  if (data.status !== "success") {
    return new Response(null, { status: 500 })
  }

  return new Response(null, { status: 200 })
}
