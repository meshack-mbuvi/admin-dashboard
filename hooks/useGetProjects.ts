import { useQuery } from "@tanstack/react-query"

interface UseGetProjectsArgs {
  sessionTokens: string | undefined;
}

export default function useGetProjects(args: UseGetProjectsArgs) {
  const { sessionTokens } = args

  return useQuery(
    ["get-projects"],
    async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/projects`, {
          headers: new Headers({
           'Authorization': 'Bearer ' + sessionTokens,
           credentials: 'include'
          })
        })
  
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}, ${res.statusText}`);
        }
  
        const data = await res.json();
        return data;
      } catch (err) {
        console.error(err); 
        throw err;
      }
    }
  );
}
