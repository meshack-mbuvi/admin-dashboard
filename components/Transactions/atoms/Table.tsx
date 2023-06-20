import { flexRender } from "@tanstack/react-table"
import type { HeaderGroup, Row, Table } from "@tanstack/react-table"

import { TransactionDataType } from "@/hooks/useGetTransactions"
import { RequestDataType } from "@/hooks/useGetRequests"
interface TableProps {
  tableConfig: Table<TransactionDataType> | Table<RequestDataType>
}

export default function Table({ tableConfig }: TableProps) {
  return (
    <div className="w-full overflow-x-scroll">
      <table className="w-full" align="left">
        <thead>
          {tableConfig
            .getHeaderGroups()
            .map(
              (
                headerGroup:
                  | HeaderGroup<TransactionDataType>
                  | HeaderGroup<RequestDataType>
              ) => (
                <tr
                  key={headerGroup.id}
                  className="text-gray-3 h-[58px] bg-black"
                >
                  {headerGroup.headers.map((header: any) => (
                    <th
                      key={header.id}
                      className="text-left font-semibold text-sm"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              )
            )}
        </thead>
        <tbody className="divide-y divide-gray-7">
          {tableConfig
            .getRowModel()
            .rows.map(
              (row: Row<TransactionDataType> | Row<RequestDataType>) => (
                <tr key={row.id} className="h-[58px]">
                  {row.getVisibleCells().map((cell: any) => (
                    <td key={cell.id} className="whitespace-nowrap pr-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  )
}
