"use client"

import { useParams } from "next/navigation"
import { useState } from "react"

import Button from "@/components/Buttons"
import CopyToClipboard from "@/components/CopyToClipboard"
import Loading from "@/components/Loading"
import Text from "@/components/Text"
import RightArrow from "@/components/icons/RightArrow"
import Trash from "@/components/icons/Trash"

import useAuthToken from "@/hooks/useAuthToken"
import useCreateApiKey from "@/hooks/useCreateApiKey"
import useDeleteApiKey from "@/hooks/useDeleteApiKey"
import useGetProjectApiKeys from "@/hooks/useGetApiKeys"
import { formatDate } from "@/utils/formatDate"

export default function APIKeys() {
  const { projectId } = useParams()
  const { data, isLoading } = useGetProjectApiKeys({
    projectId,
  })
  const sessionToken = useAuthToken()
  const createMutation = useCreateApiKey(projectId)
  const deleteMutation = useDeleteApiKey(projectId)

  const handleCreateAccessKey = () => {
    if (sessionToken) {
      createMutation.mutate({
        method: "POST",
        sessionToken,
        endpointPath: `/admin/accessKey`,
        body: JSON.stringify({
          projectId: projectId,
          roleTitle: "admin",
        }),
      })
    }
  }

  const handleDeleteAccessKey = (keyId: string) => {
    const confirm = window.confirm("Are you sure you want to delete")
    if (confirm && sessionToken) {
      deleteMutation.mutate({
        sessionToken,
        method: "DELETE",
        endpointPath: `/admin/accessKey/${keyId}`,
      })
    }
  }

  return (
    <div>
      <div className="flex flex-col p-10 border-1 bg-gray-8 rounded-lg mb-10 mr-10">
        <Text className="font-medium text-2xl pb-5">Secret keys</Text>
        <p className="font-small text-gray-3 text-sm pb-7">
          Secret keys are used for API endpoint authentication.
        </p>
        <div className="flex flex-col pb-5">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div className="flex gap-x-8 py-4" key={i}>
                <Loading className="w-1/4 h-4" />
                <Loading className=" w-1/4 h-4" />
              </div>
            ))
          ) : data && data.length ? (
            <div className="grid grid-cols-3 pb-5">
              <div className="col-span-2 grid grid-cols-2 gap-x-8">
                <Text className="font-small text-gray-3 text-sm pb-3">Key</Text>
                <Text className="font-small text-gray-3 text-sm pb-3">
                  Created
                </Text>
              </div>
              <div /> {/* Empty div for spacing */}
            </div>
          ) : (
            <p className="text-lg pb-5">
              There are currently no API keys for this project
            </p>
          )}
          {data &&
            data.map(({ AccessKey }) => {
              return (
                <div className="grid grid-cols-3 pb-5" key={AccessKey?.id}>
                  <div className="col-span-2 grid grid-cols-2 gap-x-8 items-center">
                    <BlurredView>
                      <div className="flex">
                        <Text className="font-mono">{AccessKey?.key}</Text>
                        <CopyToClipboard
                          text={AccessKey?.key}
                          className="ml-auto"
                        />
                      </div>
                    </BlurredView>

                    <Text className="flex font-mono flex-shrink-0">
                      {formatDate(AccessKey?.createdAt)}
                    </Text>
                  </div>
                  <div
                    className="flex justify-end mr-16 flex-row cursor-pointer items-center hover:opacity-90"
                    onClick={() => handleDeleteAccessKey(AccessKey?.id)}
                  >
                    <Trash className="w-3.5 h-4 text-red" />
                    <Text className="text-red pl-2">Delete</Text>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="flex flex-row text-blue-1 items-center">
          <Button
            className="font-normal text-normal pr-1"
            onClick={handleCreateAccessKey}
          >
            Create a new key
          </Button>
          <RightArrow className="w-3 h-3" />
        </div>
      </div>
    </div>
  )
}

interface BlurredViewProps {
  children: React.ReactNode
}

const BlurredView = (props: BlurredViewProps) => {
  const { children } = props

  const [isBlurred, setIsBlurred] = useState<boolean>(true)

  return (
    <div
      className="relative cursor-pointer border-2 rounded-lg border-gray-7 mb-1 text-center py-1.5 px-2"
      onClick={() => setIsBlurred(false)}
    >
      {isBlurred ? (
        <>
          <p className="opacity-50 filter blur-sm overflow-hidden text-ellipsis whitespace-nowrap">
            Im a fake test key gkdkdfdsfsfsd
          </p>
          <div
            className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center opacity-100 text-sm font-mono"
            onClick={() => setIsBlurred(false)}
          >
            CLICK TO REVEAL
          </div>
        </>
      ) : (
        children
      )}
    </div>
  )
}
