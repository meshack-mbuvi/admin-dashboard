import Button from "@/components/Buttons"
import Text from "@/components/Text"
import Trash from "@/components/icons/Trash"
import useAuthToken from "@/hooks/useAuthToken"
import useDeleteApiKey from "@/hooks/useDeleteApiKey"
import useGetProjectApiKeys from "@/hooks/useGetApiKeys"
import { formatDate } from "@/utils/formatDate"
import clsx from "clsx"
import { useParams } from "next/navigation"
import { useState } from "react"
import RightArrow from "../icons/RightArrow"

const APIKeys: React.FC = () => {
  const [isBlurred, setIsBlurred] = useState<boolean>(true)
  const { projectId } = useParams()
  const { data } = useGetProjectApiKeys({
    projectId,
  })
  const sessionToken = useAuthToken()
  const deleteMutation = useDeleteApiKey(projectId)

  const BlurredView = () => {
    return (
      <div
        className="relative cursor-pointer border-2 rounded-lg border-gray-7 mb-1 items-center"
        onClick={() => setIsBlurred(false)}
      >
        <p
          className={clsx(
            "font-normal text-normal py-1.5",
            isBlurred ? "opacity-50 filter blur-md" : "opacity-100"
          )}
        >
          pk_test_QmMWqQ6TJ0t6qTkAtIJP1fhv
        </p>
        <div
          className={`absolute top-2 left-20 opacity-100 text-sm pl-2`}
          onClick={() => setIsBlurred(false)}
        >
          CLICK TO REVEAL
        </div>
      </div>
    )
  }

  const handleDeleteAccessKey = (keyId: string) => {
    const confirm = window.confirm("Are you sure you want to delete")
    if (confirm && sessionToken) {
      deleteMutation.mutate({
        sessionToken,
        endpointPath: `/admin/accessKey/${keyId}`,
      })
    }
  }

  return (
    <div>
      <div className="flex font-sans flex-col h-full w-full">
        <div className="flex flex-col p-10 border-1 bg-gray-8 rounded-lg mb-10 mr-10">
          <Text className="font-medium text-2xl pb-5">Secret keys</Text>
          <p className="font-small text-gray-3 text-sm pb-7">
            Secret keys are used for API endpoint authentication.
          </p>
          <div className="flex flex-col pb-5">
            {data && data.length ? (
              <div className="flex flex-row justify-between pb-5">
                <Text className="font-small text-gray-3 text-sm pb-3">Key</Text>
                <Text className="font-small text-gray-3 text-sm pb-3 pl-7">
                  Created
                </Text>
                <div /> {/* Empty div for spacing */}
              </div>
            ) : (
              <p className="text-lg pb-5">
                There are currently no API keys for this project
              </p>
            )}
            {data &&
              data.map(({ AccesKey }, index) => {
                return (
                  <div
                    className="flex flex-row justify-between pb-5 items-center"
                    key={index}
                  >
                    <p>{isBlurred ? <BlurredView /> : AccesKey?.key}</p>
                    <p>{formatDate(AccesKey?.createdAt)}</p>
                    <div
                      className="flex flex-row cursor-pointer items-center hover:opacity-90"
                      onClick={() => handleDeleteAccessKey(AccesKey?.id)}
                    >
                      <Trash className="w-3.5 h-4 text-red" />
                      <p className="text-red pl-2">Delete</p>
                    </div>
                  </div>
                )
              })}
          </div>
          <div className="flex flex-row text-blue-1 items-center">
            <Button
              className="font-normal text-normal pr-1"
              //   onClick={createKey}
            >
              Create a new key
            </Button>
            <RightArrow className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default APIKeys
