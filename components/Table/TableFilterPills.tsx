import { ColumnFilter, RowData, Table } from "@tanstack/react-table"

import Close from "../icons/Close"

interface TableFilterPillsProps<T> {
    tableConfig: Table<T>;
    titles?: {id?: Record<string, string>, value?: Record<string, string>};
}

export default function TableFilterPills<T extends RowData>(props: TableFilterPillsProps<T>) {
    const { tableConfig, titles } = props
    const filters = tableConfig.getState().columnFilters
    const onClick = (id: string, value: unknown) => {
        const toFilter = filters.find(item => item.id === id)
        if (Array.isArray(toFilter?.value)) {
            const otherFilters = filters.filter(item => item.id !== id)
            const newFilters = toFilter!.value.filter(item => item !== value)
            if (newFilters.length === 0) {
                tableConfig.setColumnFilters(otherFilters)
            } else {
                tableConfig.setColumnFilters([...otherFilters, {id, value: newFilters}])
            }
        } else {
            tableConfig.setColumnFilters(filters.filter(item => item.id !== id))
        }
    }
    return <>
        {filters.length > 0 && <div className="flex items-center gap-4 w-full mb-6 flex-wrap">
            {filters.map((filter, index) => {
                if (Array.isArray(filter.value)) {
                    return filter.value.map(value => <FilterButton 
                        onClick={() => onClick(filter.id, value)} 
                        key={`${filter.id}-${index}-${value}`} 
                        filter={{id: filter.id, value }} 
                        titles={titles}
                    />)
                }
                return <FilterButton 
                    onClick={() => onClick(filter.id, filter.value)} 
                    key={`${filter.id}-${index}`} 
                    filter={filter} 
                    titles={titles}
                />
            })}
        </div>}
    </>
}

interface FilterButtonProps {
    filter: ColumnFilter;
    titles?: TableFilterPillsProps<null>["titles"]
    onClick?: () => void
}

function FilterButton(props: FilterButtonProps) {
    const { filter, titles, onClick } = props
    const title = titles && titles.id?.[filter.id as string] || filter.id
    const value = titles && titles.value?.[filter.value as string] || filter.value as string
    return <div className="inline-flex gap-2 items-center bg-blue-neptune/[.4] rounded-full px-3 py-1.5 text-sm">
        <div>Filtered by {title} = {value}</div>
        <button className="text-gray-4 w-3" onClick={onClick}><Close /></button>
    </div>
}
