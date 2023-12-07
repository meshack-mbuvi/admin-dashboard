import { Updater } from "@tanstack/react-table"

import { StatusEnum, getStatusLabel } from "./Status"
import Popover from "@/components/Popover"
import Menu from "@/components/icons/Menu"
import { cn } from "@/utils/cn"
import Checkbox from "@/components/Checkbox"

const FILTER_ALL = "ALL"

interface TxStatusFilterProps {
  setFilter: (updater: Updater<Array<StatusEnum>>) => void
  filters: Array<StatusEnum>
}

const allFilters = Object.values(StatusEnum)

export default function TxStatusFilter(props: TxStatusFilterProps) {
  const { filters, setFilter } = props
  const onFilterValueChange = (status: StatusEnum | typeof FILTER_ALL) => {
    if (status === FILTER_ALL) {
      // toggle off all filters
      if (filters.length === allFilters.length) {
        setFilter([])
      } else {
        setFilter(allFilters)
      }
    } else {
      if (filters.includes(status)) {
        setFilter(filters.filter((item) => item !== status))
      } else {
        setFilter([...filters, status])
      }
    }
  }
  const getIsSelected = (status: StatusEnum | typeof FILTER_ALL) => {
    return (
      (status === FILTER_ALL && filters.length === allFilters.length) ||
      filters.includes(status as StatusEnum)
    )
  }
  return (
    <Popover button={<FilterPopoverButton isFiltered={filters.length > 0} />}>
      <div className="flex flex-col space-y-1">
        {allFilters.map((status, index) => (
          <Checkbox
            key={`checkbox-${status}-${index}`}
            className="hover:bg-gray-7 px-3 py-2"
            onChange={() => onFilterValueChange(status)}
            checked={getIsSelected(status)}
            label={getStatusLabel(status)}
          />
        ))}
        <Checkbox
          className="hover:bg-gray-7 px-3 py-2"
          onChange={() => onFilterValueChange(FILTER_ALL)}
          checked={getIsSelected(FILTER_ALL)}
          label="Show All"
        />
      </div>
    </Popover>
  )
}

interface FilterPopoverButtonProps {
  isFiltered: boolean
}

const FilterPopoverButton = (props: FilterPopoverButtonProps) => {
  const { isFiltered } = props
  return (
    <Popover.Button
      className={cn("mr-2 px-2 py-1 rounded-full text-gra", {
        "bg-blue-neptune/[0.4] hover:bg-blue-neptune/[0.3]": isFiltered,
        "hover:bg-gray-7 active:bg-gray-7": !isFiltered,
      })}
    >
      <Menu className="w-3 h-3" />
    </Popover.Button>
  )
}
