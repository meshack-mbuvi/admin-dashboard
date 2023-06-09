import { useQuery } from "@tanstack/react-query"

interface UseGetProjectsArgs {
  sessionToken: string | undefined;
}

export default function useGetProjects(args: UseGetProjectsArgs) {
  const { sessionToken } = args

  return useQuery(
    ["get-projects"],
    async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/organization/projects`, {
          headers: new Headers({
           'Authorization': 'Session ' + sessionToken
          })
        })

        // Wallet manager request works! Leave here for now, successful request
        /* const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wallet/project/df397af4-0a91-4b9f-bdb6-06c5b86e6ee6/wallets`, {
          headers: new Headers({
           'Authorization': 'Session ' + sessionToken
          })
        }) */

        console.log("res: ", res)
        console.log("res body: ", res.body)
  
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
