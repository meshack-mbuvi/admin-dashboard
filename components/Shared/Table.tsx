import type { HeaderGroup, Row, Table } from "@tanstack/react-table"
import { flexRender } from "@tanstack/react-table"
import clsx from "clsx"

interface TableProps<T> {
  tableConfig: Table<T>
  isLoading?: boolean
}

export default function Table<T>({ tableConfig, isLoading }: TableProps<T>) {
  return (
    <div className={clsx("w-full overflow-x-auto", isLoading && "opacity-70")}>
      <table className="w-full" align="left">
        <thead>
          {tableConfig.getHeaderGroups().map((headerGroup: HeaderGroup<T>) => (
            <tr key={headerGroup.id} className="text-gray-3 h-14 bg-black">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-left font-semibold text-sm">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-7">
          {tableConfig.getRowModel().rows.map((row: Row<T>) => (
            <tr key={row.id} className="h-14">
              {row.getVisibleCells().map((cell: any) => (
                <td key={cell.id} className="whitespace-nowrap pr-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
