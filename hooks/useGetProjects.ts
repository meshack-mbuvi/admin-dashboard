import { useQuery } from "@tanstack/react-query"
import { MemberSession } from "stytch/types/lib/b2b/shared_b2b"

interface UseGetProjectsArgs {
  session: MemberSession | null
  enabled: boolean
}

export default function useGetProjects(args: UseGetProjectsArgs) {
  const { session, enabled } = args

  return useQuery(
    ["get-projects"],
    async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/projects`,
        {
          headers: {
            authorization: `Bearer ${session}`,
          },
        }
      )

      if (res.ok) {
        const data = await res.json()
      }

      throw Error()
    },
    { enabled }
  )
}
