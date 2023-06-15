import Input from "@/components/Input"
import Text from "@/components/Text"
import useGetProjectById from "@/hooks/useGetProjectById"
import { getNetwork } from "@/utils/getNetwork"
import { getNetworkIcon } from "@/utils/getNetworkIcon"
import { useParams } from "next/navigation"
import Section from "../Section"

export default function General() {
  const { projectId } = useParams()
  const { data } = useGetProjectById({
    projectId,
  })

  const network = data?.tokens?.length
    ? getNetwork(data?.tokens[0]?.chainId)
    : null

  return (
    <div>
      <div className="flex flex-col space-y-10 font-sans w-full">
        <Section className="p-10">
          <Text className="font-medium text-2xl pb-7">Name</Text>
          <div className="flex flex-col">
            <Text className="pb-3">Project name</Text>
            <Input
              className="w-1/3 border-gray-6 bg-white bg-opacity-[0.01]"
              value={data?.name ?? ""}
            />
          </div>
        </Section>
        {network && (
          <Section className="p-10">
            <Text className="font-medium text-2xl pb-1">Network</Text>
            <div className="flex flex-col">
              <p className="font-small text-gray-4 text-sm pb-6">
                This can’t be changed once the project is created.
              </p>
              <div className="flex flex-row pb-3">
                <span className="flex pr-2">
                  {getNetworkIcon(network.id, "w-4")}
                </span>
                <Text>{network.name}</Text>
              </div>
            </div>
          </Section>
        )}
      </div>
    </div>
  )
}
