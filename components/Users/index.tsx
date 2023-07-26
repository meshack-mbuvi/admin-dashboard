import Loading from "@/components/Loading"
import RemoveIcon from "@/components/icons/Remove"
import useAuthToken from "@/hooks/useAuthToken"
import useDeleteUserById from "@/hooks/useDeleteUser"
import useGetUser from "@/hooks/useGetUser"
import useGetUsers, { UserDataType } from "@/hooks/useGetUsers"
import { GatewayFetchArgs } from "@/utils/gatewayFetch"
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import Verify2FAModal from "../2fa/VerifyModal"
import No2FAModal from "../2fa/no2FAModal"
import Button from "../Buttons"
import Table from "../Shared/Table"
import Text from "../Text"
import { ColumnHeader } from "./atoms/columnHeader"

const columnHelper = createColumnHelper<UserDataType>()

export default function Users() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showNo2FAModal, setShowNo2FAModal] = useState<boolean>(false)
  const sessionToken = useAuthToken()
  const deleteMutation = useDeleteUserById()
  const { data: user } = useGetUser()
  const [pendingRequestParams, setPendingRequestParams] =
    useState<GatewayFetchArgs>()

  const complete2FARequest = (authCode: string) => {
    const params = {
      ...pendingRequestParams,
      headers: { "x-2fa-code": authCode },
    }
    deleteMutation.mutate(params as GatewayFetchArgs)
  }
  const { data, isFetching } = useGetUsers()

  const handleDeleteUser = (id: any) => {
    setPendingRequestParams({
      method: "DELETE",
      sessionToken,
      endpointPath: `/admin/user/${id}`,
    })

    if (!user?.is2FAEnabled) return setShowNo2FAModal(true)

    const confirm = window.confirm("Are you sure you want to delete this user?")
    if (sessionToken && confirm) {
      setShowModal(true)
    }
  }

  const columns = [
    columnHelper.accessor("name", {
      header: () => <ColumnHeader>Name</ColumnHeader>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor("emailAddress", {
      header: () => <ColumnHeader>Email</ColumnHeader>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor("role", {
      header: () => <ColumnHeader>Role</ColumnHeader>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor("status", {
      header: () => <ColumnHeader>Status</ColumnHeader>,
      cell: (info) => <Text className="capitalize">{info.getValue()}</Text>,
    }),

    columnHelper.accessor("id", {
      header: () => <></>,
      cell: (info) => (
        <Button
          className="flex items-center text-gray-4 text-sm"
          onClick={() => handleDeleteUser(info.row.original.id)}
        >
          <RemoveIcon className="w-4 h-4 mr-2" /> Remove
        </Button>
      ),
    }),
  ]

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div>
      {isFetching ? (
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
          <Table tableConfig={table} isLoading={isFetching} />
        </div>
      )}

      <Verify2FAModal
        show={showModal}
        closeModal={() => setShowModal(false)}
        onAuthCode={complete2FARequest}
        error={deleteMutation.isError}
        success={deleteMutation.isSuccess}
        loading={deleteMutation.isLoading}
        reset={() => {
          deleteMutation.reset()
        }}
      />
      <No2FAModal
        show={showNo2FAModal}
        closeModal={() => setShowNo2FAModal(false)}
      />
    </div>
  )
}
