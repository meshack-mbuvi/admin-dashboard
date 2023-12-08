"use client"
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import Input from "@/components/inputs/Input"
import Loading from "@/components/Loading"
import Section from "@/components/Section"
import Text from "@/components/Text"
import ResourceID from "@/components/Shared/ResourceID"

import useAuthToken from "@/hooks/useAuthToken"
import useGetProjectById from "@/hooks/useGetProjectById"
import useUpdateProjectNameMutation from "@/hooks/useUpdateProjectNameMutation"

import getFirstOrString from "@/utils/getFirstOrString"

export default function GeneralSettings() {
  const { projectId } = useParams()
  const sessionToken = useAuthToken()
  const projectIdString = getFirstOrString(projectId)

  const [saved, setSaved] = useState(false)
  const [showError, setShowError] = useState(false)
  const debounced = useDebouncedCallback((value) => {
    handleUpdateProjectName(value)
  }, 300)

  const updateProjectNameMutation = useUpdateProjectNameMutation({
    projectId: projectIdString,
    onSuccess: () => {
      setSaved(true)
    },
  })

  // DEV: hides the saved copy after 2 seconds
  useEffect(() => {
    if (saved) {
      setTimeout(() => {
        setSaved(false)
      }, 2000)
    }
  }, [saved])

  const { data, isLoading } = useGetProjectById({
    projectId: projectIdString,
  })

  const handleUpdateProjectName = (e: ChangeEvent<HTMLInputElement>) => {
    const _projectName = e.target.value.trim()
    if (!_projectName) {
      setShowError(true)
      return
    }

    setShowError(false)

    if (sessionToken && _projectName) {
      updateProjectNameMutation.mutate({
        name: _projectName,
        sessionToken
      })
    }
  }

  return (
    <div>
      <div className="flex flex-col space-y-10 font-sans w-full">
        <Section className="p-10">
          <Text className="font-medium text-2xl pb-7">Details</Text>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col mb-8">
              <Text className="font-small text-gray-3 text-sm pb-3">
                Project name
              </Text>
              {isLoading ? (
                <Loading className="h-14 max-w-xs" />
              ) : (
                <div className="flex">
                  <Input
                    className="w-1/3 border-gray-6 bg-white bg-opacity-[0.01]"
                    defaultValue={data?.name ?? ""}
                    onChange={(e) => debounced(e)}
                  />
                  {saved && (
                    <p className="text-success text-sm ml-4 self-end">Saved!</p>
                  )}

                  {showError && (
                    <p className="text-red text-sm ml-4 self-end">
                      Project name cannot be empty!
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <Text className="font-small text-gray-3 text-sm pb-3">
                Project ID
              </Text>
              <ResourceID
                id={projectIdString}
                fullView={true}
                copyIcon={true}
                context="project"
              />
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
