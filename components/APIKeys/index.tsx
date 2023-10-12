"use client"

import clsx from "clsx"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

import Verify2FAModal from "@/components/2fa/VerifyModal"
import No2FAModal from "@/components/2fa/no2FAModal"
import Button, { LightButtonStyles } from "@/components/Buttons"
import CopyToClipboard from "@/components/CopyToClipboard"
import Loading from "@/components/Loading"
import UpgradeRequiredModal from "@/components/Shared/UpgradeRequiredModal"
import Text from "@/components/Text"
import Add from "@/components/icons/Add"
import Trash from "@/components/icons/Trash"

import useAuthToken from "@/hooks/useAuthToken"
import useCreateApiKey from "@/hooks/useCreateApiKey"
import useDeleteApiKey from "@/hooks/useDeleteApiKey"
import useFreePlan from "@/hooks/useFreePlan"
import useGetProjectApiKeys from "@/hooks/useGetApiKeys"
import useGetUser from "@/hooks/useGetUser"
import { formatDate } from "@/utils/formatDate"
import { GatewayFetchArgs, ResponseError } from "@/utils/gatewayFetch"
import getFirstOrString from "@/utils/getFirstOrString"
import PremiumPill from "../Shared/PremiumPill"

export default function APIKeys() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showNo2FAModal, setShowNo2FAModal] = useState<boolean>(false)
  const { projectId } = useParams()

  const projectIdString = getFirstOrString(projectId)
  const { data, isLoading } = useGetProjectApiKeys({
    projectId: projectIdString,
  })
  const { data: user } = useGetUser()
  const sessionToken = useAuthToken()
  const createMutation = useCreateApiKey(projectIdString)
  const deleteMutation = useDeleteApiKey(projectIdString)
  const [showLimitedAccessModal, setShowLimitedAccessModal] = useState(false)

  const isFreePlan = useFreePlan()
  const [pendingRequest, setPendingRequest] = useState<string>(
    "create" || "delete"
  )
  const [pendingRequestParams, setPendingRequestParams] =
    useState<GatewayFetchArgs>()

  const authCodeError: boolean = useMemo(() => {
    const error =
      (deleteMutation.error as ResponseError) ||
      (createMutation.error as ResponseError)

    if (!error) return false

    const status: number | undefined = error?.status || error?.status
    if (status === 403) {
      return true
    }
    return false
  }, [deleteMutation.error, createMutation.error])

  const statusMessage: string = useMemo(() => {
    if (deleteMutation.isError) {
      return "Key not Deleted, something went wrong with your request."
    }
    if (deleteMutation.isSuccess) {
      return "Key Deleted!"
    }
    if (createMutation.isError) {
      return "Key not Created, something went wrong with your request."
    }
    if (createMutation.isSuccess) {
      return "API Key Created!"
    }
    return ""
  }, [
    deleteMutation.isError,
    deleteMutation.isSuccess,
    createMutation.isError,
    createMutation.isSuccess,
  ])

  const handleCreateAccessKey = () => {
    if (isFreePlan) return setShowLimitedAccessModal(true)

    if (!user?.is2FaEnabled) return setShowNo2FAModal(true)
    if (sessionToken) {
      setPendingRequest("create")
      setPendingRequestParams({
        method: "POST",
        sessionToken,
        endpointPath: `/admin/accessKey`,
        body: JSON.stringify({
          projectId: projectId,
          roleTitle: "admin",
        }),
      })
      setShowModal(true)
    }
  }

  const handleDeleteAccessKey = (keyId: string) => {
    if (isFreePlan) return setShowLimitedAccessModal(true)

    if (!user?.is2FaEnabled) return setShowNo2FAModal(true)
    const confirm = window.confirm("Are you sure you want to delete")

    if (confirm && sessionToken) {
      setPendingRequest("delete")
      setPendingRequestParams({
        sessionToken,
        method: "DELETE",
        endpointPath: `/admin/accessKey/${keyId}`,
      })
      setShowModal(true)
    }
  }

  const complete2FARequest = (authCode: string) => {
    if (pendingRequest == "create") {
      const params = {
        ...pendingRequestParams,
        headers: { "x-2fa-code": authCode },
      }
      createMutation.mutate(params as GatewayFetchArgs)
    }

    if (pendingRequest == "delete") {
      const params = {
        ...pendingRequestParams,
        headers: { "x-2fa-code": authCode },
      }
      deleteMutation.mutate(params as GatewayFetchArgs)
    }
  }

  const sortedData = data?.sort((a, b) => {
    return (
      new Date(b.AccessKey.createdAt).getTime() -
      new Date(a.AccessKey.createdAt).getTime()
    )
  })

  return (
    <div>
      <div className="flex flex-col p-10 border border-gray-8 bg-gray-9 rounded-2lg mb-10 mr-10">
        <div className="flex justify-between">
          <Text className="font-medium text-2xl pb-5">Secret keys</Text>
          <div className="flex space-x-7">
            {isFreePlan && <PremiumPill />}

            <Button
              className={clsx(LightButtonStyles, "flex items-center")}
              onClick={handleCreateAccessKey}
            >
              <Add className="h-4 w-4 mr-4" />
              Create a new key
            </Button>
          </div>
        </div>
        <p className="font-small text-gray-3 text-sm pb-7">
          Secret keys are used for API endpoint authentication.
        </p>
        <div className="pb-5 overflow-x-auto">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div className="flex gap-x-8 py-4" key={i}>
                <Loading className="w-1/4 h-4" />
                <Loading className=" w-1/4 h-4" />
              </div>
            ))
          ) : sortedData && sortedData.length ? (
            <div className="grid-cols-3 pb-5 hidden lg:grid">
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
          {sortedData &&
            sortedData.map(({ AccessKey }) => {
              return (
                <div
                  className="flex lg:grid grid-cols-3 pb-5"
                  key={AccessKey?.id}
                >
                  <div className="col-span-2 lg:grid grid-cols-2 gap-x-8 items-center">
                    <BlurredView>
                      <div className="flex space-x-4 justify-between">
                        <span className=""></span>
                        <Text className="font-mono grow">{AccessKey?.key}</Text>
                        <CopyToClipboard text={AccessKey?.key} />
                      </div>
                    </BlurredView>

                    <Text className="flex font-mono flex-shrink-0 whitespace-nowrap">
                      {formatDate(AccessKey?.createdAt)}
                    </Text>
                  </div>
                  <div
                    className="flex justify-end ml-auto lg:mr-16 flex-row cursor-pointer lg:items-center items-baseline hover:opacity-90 mt-auto lg:mt-0"
                    onClick={() => handleDeleteAccessKey(AccessKey?.id)}
                  >
                    <Trash className="w-3.5 h-4 text-red" />
                    <Text className="text-red pl-2 hidden md:block">
                      Delete
                    </Text>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      <Verify2FAModal
        show={showModal}
        closeModal={() => setShowModal(false)}
        onAuthCode={complete2FARequest}
        error={
          (deleteMutation.isError || createMutation.isError) && !authCodeError
        }
        authCodeError={authCodeError}
        success={deleteMutation.isSuccess || createMutation.isSuccess}
        loading={deleteMutation.isLoading || createMutation.isLoading}
        reset={() => {
          deleteMutation.reset()
          createMutation.reset()
        }}
        statusMessage={statusMessage}
      />
      <No2FAModal
        show={showNo2FAModal}
        closeModal={() => setShowNo2FAModal(false)}
      />

      <UpgradeRequiredModal
        show={showLimitedAccessModal}
        handleClose={() => setShowLimitedAccessModal(false)}
      />
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
