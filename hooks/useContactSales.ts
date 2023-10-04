import { useMutation } from "@tanstack/react-query"

import { SalesApiParams } from "@/app/api/sales/route"

export default function useContactSales() {
  return useMutation<Response, Error, SalesApiParams>(async (args) => {
    const { email, referrer } = args

    return await fetch("/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        referrer,
      }),
    })
  })
}
