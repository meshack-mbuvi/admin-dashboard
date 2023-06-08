import { useQuery } from "@tanstack/react-query"

interface UseGetProjectsArgs {
  enabled: boolean
}

export default function useGetProjects(args: UseGetProjectsArgs) {
  const { enabled } = args

  return useQuery(
    ["get-projects"],
    async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/projects`, {
        credentials: "include"
      })


      console.log("useGetProjects res: ", res)
      if (res.ok) {
        const data = await res.json()
        return data
      }

      throw Error("query error")
    },
    { enabled }
  )
}
