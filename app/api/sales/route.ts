import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  referrer: z.string(),
})

export type SalesApiParams = z.infer<typeof schema>

export async function POST(request: Request) {
  const body = await request.json()
  const response = schema.safeParse(body)

  if (!response.success) {
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
        email: response.data.email,
        sales: true,
        referrer: response.data.referrer,
      }),
    }
  )

  const data = await res.json()

  if (data.status !== "success") {
    return new Response(null, { status: 500 })
  }

  return new Response(null, { status: 200 })
}
