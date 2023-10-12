import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useMemo, useState } from "react"

import Verify2FAModal from "@/components/2fa/VerifyModal"
import No2FAModal from "@/components/2fa/no2FAModal"
import Button from "@/components/Buttons"
import Loading from "@/components/Loading"
import Text from "@/components/Text"
import RemoveIcon from "@/components/icons/Remove"
import ResourceID from "@/components/Shared/ResourceID"
import EmptyState from "../Shared/Empty"
import Table from "../Table/Table"
import { ColumnHeader } from "./atoms/columnHeader"

import { GatewayFetchArgs, ResponseError } from "@/utils/gatewayFetch"

import useIsTestUser from "@/hooks/useIsTestUser"
import useIsViewerUser from "@/hooks/useIsViewerUser"
import useGetUser, { UserDataType } from "@/hooks/useGetUser"
import useGetUsers from "@/hooks/useGetUsers"
import useAuthToken from "@/hooks/useAuthToken"
import useDeleteUserById from "@/hooks/useDeleteUser"

const columnHelper = createColumnHelper<UserDataType>()

export default function Users() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showNo2FAModal, setShowNo2FAModal] = useState<boolean>(false)

  const sessionToken = useAuthToken()
  const deleteMutation = useDeleteUserById()
  const { data: user } = useGetUser()
  const isTestUser = useIsTestUser()
  const isViewerUser = useIsViewerUser()
  const [pendingRequestParams, setPendingRequestParams] =
    useState<GatewayFetchArgs>()

  const authCodeError: boolean = useMemo(() => {
    const error = deleteMutation.error as ResponseError
    if (!error) return false
    if (error.status === 403) {
      return true
    }
    return false
  }, [deleteMutation.error])

  const statusMessage: string = useMemo(() => {
    if (deleteMutation.isError) {
      return "User not removed, something went wrong with your request."
    }
    if (deleteMutation.isSuccess) {
      return "User Removed!"
    }
    return ""
  }, [deleteMutation.isError, deleteMutation.isSuccess])

  const complete2FARequest = (authCode: string) => {
    const params = {
      ...pendingRequestParams,
      headers: { "x-2fa-code": authCode },
    }
    deleteMutation.mutate(params as GatewayFetchArgs)
  }
  const { data, isFetching, isLoading } = useGetUsers()

  const handleDeleteUser = (id: any) => {
    setPendingRequestParams({
      method: "DELETE",
      sessionToken,
      endpointPath: `/admin/user/${id}`,
    })

    if (!user?.is2FaEnabled) return setShowNo2FAModal(true)

    const confirm = window.confirm("Are you sure you want to delete this user?")
    if (sessionToken && confirm) {
      setShowModal(true)
    }
  }

  const columns = [
    columnHelper.accessor("name", {
      size: 250,
      header: () => <ColumnHeader>Name</ColumnHeader>,
      cell: (info) => (
        <div className="flex justify-between space-x-3 pr-6 lg:pr-10 xl:pr-24">
          <Text>{info.getValue()}</Text>
          <ResourceID id={info.row.original.id} />
        </div>
      ),
    }),
    columnHelper.accessor("emailAddress", {
      header: () => <ColumnHeader>Email</ColumnHeader>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor("role", {
      header: () => <ColumnHeader>Role</ColumnHeader>,
      cell: (info) => <Text className="capitalize">{info.getValue()}</Text>,
    }),
    columnHelper.accessor("status", {
      header: () => <ColumnHeader>Status</ColumnHeader>,
      cell: (info) => <Text className="capitalize">{info.getValue()}</Text>,
    }),

    columnHelper.accessor("id", {
      header: () => <></>,
      cell: (info) => {
        const canRemove =
          (!isTestUser || !isViewerUser) && info.row.original.id !== user?.id

        if (!canRemove) return null

        return (
          <Button
            className="flex items-center text-red text-sm "
            onClick={() => handleDeleteUser(info.row.original.id)}
          >
            <RemoveIcon className="w-4 h-4 mr-2" /> Remove
          </Button>
        )
      },
    }),
  ]

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div>
      {isLoading ? (
        [...Array(6)].map((_, i) => (
          <div className="flex gap-10 py-4" key={i}>
            <Loading className="w-1/5 h-4" />
            <Loading className="w-1/5 h-4" />
            <Loading className="w-1/5 h-4" />
            <Loading className="w-1/5 h-4" />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center">
          {data && data.length > 0 ? (
            <Table tableConfig={table} isLoading={isFetching} />
          ) : (
            <EmptyState
              heading="No users yet"
              description={
                <span>When users are added they will appear here</span>
              }
            />
          )}
        </div>
      )}

      <Verify2FAModal
        show={showModal}
        closeModal={() => setShowModal(false)}
        onAuthCode={complete2FARequest}
        error={deleteMutation.isError && !authCodeError}
        authCodeError={authCodeError}
        success={deleteMutation.isSuccess}
        loading={deleteMutation.isLoading}
        reset={() => {
          deleteMutation.reset()
        }}
        statusMessage={statusMessage}
      />
      <No2FAModal
        show={showNo2FAModal}
        closeModal={() => setShowNo2FAModal(false)}
      />
    </div>
  )
}
