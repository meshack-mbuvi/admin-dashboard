import type {
  FiltersColumn,
  HeaderGroup,
  Row,
  Table,
} from "@tanstack/react-table"
import { flexRender } from "@tanstack/react-table"
import { cn } from "@/utils/cn"

// DEV: custom filters are not supported in TanStack table v8
// so we add support here for a meta property on the column definition to pass in a custom filter component
// https://github.com/TanStack/table/discussions/4018
declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends unknown, TValue> {
    filterComponent: (
      setFilter: FiltersColumn<TData>["setFilterValue"],
      filterValue: unknown
    ) => any
  }
}

interface TableProps<T> {
  tableConfig: Table<T>
  isLoading?: boolean
  noDataMessage?: string
}

export default function Table<T>(props: TableProps<T>) {
  const { tableConfig, isLoading, noDataMessage } = props
  return (
    <div className={cn("w-full overflow-x-auto", isLoading && "opacity-70")}>
      <table className="w-full table-fixed" align="left">
        <thead>
          {tableConfig.getHeaderGroups().map((headerGroup: HeaderGroup<T>) => (
            <tr key={headerGroup.id} className="text-gray-3 h-14">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className="text-left font-semibold text-sm"
                >
                  <span
                    className={cn(
                      "w-full",
                      header.column.getCanFilter() &&
                        "inline-flex justify-between"
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanFilter() && (
                      <>
                        {header.column.columnDef?.meta?.filterComponent &&
                          header.column.columnDef?.meta?.filterComponent(
                            header.column.setFilterValue,
                            header.column.getFilterValue()
                          )}
                      </>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-7">
          {tableConfig.getRowModel().rows.map((row: Row<T>) => (
            <tr key={row.id} className="h-14">
              {row.getVisibleCells().map((cell: any) => (
                <td
                  key={cell.id}
                  className="pr-4 overflow-x-hidden text-ellipsis"
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {tableConfig.getRowModel().rows.length === 0 && (
        <div className="text-center w-full text-gray-4 mt-36">
          {noDataMessage || "None found"}
        </div>
      )}
    </div>
  )
}
