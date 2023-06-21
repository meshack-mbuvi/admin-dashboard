"use client"

import { useParams } from "next/navigation"

import Input from "@/components/Input"
import Section from "@/components/Section"
import Text from "@/components/Text"

import useAuthToken from "@/hooks/useAuthToken"
import useGetProjectById from "@/hooks/useGetProjectById"
import useUpdateProjectNameMutation from "@/hooks/useUpdateProjectNameMutation"
import { useState } from "react"

export default function General() {
  const { projectId } = useParams()
  const sessionToken = useAuthToken()

  const [updatedProjectName, setUpdatedProjectName] = useState("")

  const updateProjectNameMutation = useUpdateProjectNameMutation(projectId)

  useGetProjectById(
    {
      projectId,
    },
    {
      onSuccess: (data) => {
        setUpdatedProjectName(data.name)
      },
    }
  )

  const handleUpdateProjectName = () => {
    if (sessionToken && updatedProjectName) {
      updateProjectNameMutation.mutate({
        method: "POST",
        sessionToken,
        endpointPath: `/admin/project/${projectId}/updateName`,
        body: JSON.stringify({
          name: updatedProjectName,
        }),
      })
    }
  }

  return (
    <div>
      <div className="flex flex-col space-y-10 font-sans w-full">
        <Section className="p-10">
          <Text className="font-medium text-2xl pb-7">Name</Text>
          <div className="flex flex-col">
            <Text className="pb-3">Project name</Text>
            <Input
              className="w-1/3 border-gray-6 bg-white bg-opacity-[0.01]"
              value={updatedProjectName}
              onChange={(e) => setUpdatedProjectName(e.target.value)}
              onBlur={handleUpdateProjectName}
            />
          </div>
        </Section>
      </div>
    </div>
  )
}
