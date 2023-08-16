"use client"
import clsx from "clsx"
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import Input from "@/components/Input"
import Loading from "@/components/Loading"
import Section from "@/components/Section"
import Text from "@/components/Text"

import useAuthToken from "@/hooks/useAuthToken"
import useGetProjectById from "@/hooks/useGetProjectById"
import useUpdateProjectNameMutation from "@/hooks/useUpdateProjectNameMutation"
import CopyToClipboard from "@/components/CopyToClipboard"

export default function General() {
  const { projectId } = useParams()
  const sessionToken = useAuthToken()

  const [hoveredProjectId, setHoveredProjectId] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showError, setShowError] = useState(false)
  const debounced = useDebouncedCallback((value) => {
    handleUpdateProjectName(value)
  }, 300)

  const updateProjectNameMutation = useUpdateProjectNameMutation({
    projectId,
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
    projectId,
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
        method: "POST",
        sessionToken,
        endpointPath: `/admin/project/${projectId}/updateName`,
        body: JSON.stringify({
          name: _projectName,
        }),
      })
    }
  }

  return (
    <div>
      <div className="flex flex-col space-y-10 font-sans w-full">
        <Section className="p-10">
          <Text className="font-medium text-2xl pb-7">Details</Text>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <Text className="pb-3">Project name</Text>
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
              <Text className="pb-3">Project ID</Text>
              <div
                className="inline-flex items-center max-w-fit" 
                onMouseLeave={() => setHoveredProjectId(false)} 
                onMouseEnter={() => setHoveredProjectId(true)}
              >
                <span>{projectId}</span>
                <CopyToClipboard
                  text={projectId}
                  className={clsx({"hidden": !hoveredProjectId, "inline-block": hoveredProjectId}, "ml-4")}
                />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
