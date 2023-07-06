import Loading from "@/components/Loading"
import useGetUsers, { UserDataType } from "@/hooks/useGetUsers"
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Table from "../Shared/Table"
import Text from "../Text"
import { ColumnHeader } from "./atoms/columnHeader"
import DeleteUser from "./atoms/deleteUser"

const columnHelper = createColumnHelper<UserDataType>()

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

  columnHelper.accessor("stytchId", {
    header: () => <></>,
    cell: (info) => <DeleteUser stytchId={info.row.original.stytchId} />,
  }),
]

export default function Users() {
  const { data, isFetching } = useGetUsers()

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
    </div>
  )
}
