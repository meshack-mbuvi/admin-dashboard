import { useParams } from "next/navigation"

import Input from "@/components/Input"
import Text from "@/components/Text"
import Section from "@/components/Section"

import useGetProjectById from "@/hooks/useGetProjectById"

export default function General() {
  const { projectId } = useParams()
  const { data } = useGetProjectById({
    projectId,
  })

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
              readOnly
            />
          </div>
        </Section>
      </div>
    </div>
  )
}
