import useGetOrganization from "@/hooks/useGetOrganization"

export default function useFreePlan() {
  const { data } = useGetOrganization()
  return data?.organization?.tier === "free"
}
